<template>
    <el-form :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div class="clearfix">
            <div class="flr">
                <Diy
                    ref="diy11"
                    placeholder="新建压溃管"
                    title="压溃管曲线定义"
                    eleKey="diy1"
                    eleParentType="front"
                    field="diy1"
                    :type="2"
                    :showCharts="true"
                    :saveData="saveNewData"
                />
            </div>
            <div :class="$style.contentLi" class="fll">
                <div :class="$style.title">请选择压溃管型号</div>
                <div :class="$style.rightList">
                    <el-checkbox v-model="formData.ykg1Checked" :class="$style.checkbox"></el-checkbox>
                    <label>压溃管1</label>
                    <el-select v-model="formData.ykg1" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in ykgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div :class="$style.rightList">
                    <el-checkbox v-model="formData.ykg2Checked" :class="$style.checkbox"></el-checkbox>
                    <label>压溃管2</label>
                    <el-select v-model="formData.ykg2" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in ykgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>

        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="resetData">清空</el-button>
        </div>

        <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveData"
            :onCancel="()=>nameDialogVisible = false"
            :dataSource="formData"
        />
        <NameDialog2
            :visible="nameDialog2Visible"
            :onSaveData="saveCurveData"
            :onCancel="()=>nameDialog2Visible = false"
        />
    </el-form>
</template>

<script>
import NameDialog from "../BufferCurve/NameDialog";
import { argConfig } from "api";
import { getUserIdAndType } from "utils/util";

import NameDialog2 from "components/NameDialog";

import Diy from "./Diy";

export default {
    name: "YKGTemp",
    components: {
        NameDialog,
        Diy,
        NameDialog2
    },
    data() {
        return {
            // 当前的缓冲器型号
            ykgList: [],
            curYKGType: "",
            formData: {
                ykg1: "",
                ykg1Checked: false,
                ykg2: "",
                ykg2Checked: false
            },

            // isDiy: false,

            nameDialogVisible: false,
            nameDialog2Visible: false
        };
    },
    props: {},
    computed: {},
    watch: {
        "formData.fYkg1"(val) {
            if (val) this.formData.fYkg1Checked = true;
        },
        "formData.fYkg2"(val) {
            if (val) this.formData.fYkg2Checked = true;
        },
        curYKGType() {
            let list = this.ykgList || [];
            let curKey = this.curYKGType;
            if (!curKey) return;
            this.formData = list.find(item => item.id === curKey);
        }
    },
    methods: {
        // 获取压溃管模版列表
        getYKGTempList() {
            const { userId, userTypeCode } = getUserIdAndType();

            // TODO type 根据用户身份确定，管理员：1(公用)，普通用户：2(私有)
            argConfig
                .getYKGTempList({ userId, type: userTypeCode })
                .then(res => {
                    if (!res) return;
                    this.ykgList = res.data;
                });
        },

        // 点击删除，删除选中项
        onClickDel() {
            if (!this.curYKGType) {
                this.$message({
                    message: "请先选择型号",
                    type: "error"
                });
                return;
            }
            argConfig.delYKGTemp({ id: this.curYKGType }).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据，并清空选项
                this.getYKGTempList();
                this.curYKGType = "";

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        //  保存数据
        saveData(args = {}) {
            const { userId, userTypeCode } = getUserIdAndType();

            let params = {
                ...this.formData,
                userId,
                type: userTypeCode,
                ...args
            };

            if (!this.curYKGType) {
                delete params.id;
            }

            for (let i in params) {
                if (!params[i]) delete params[i];
            }

            argConfig.saveYKGTemp(params).then(res => {
                if (!res) return;
                this.nameDialogVisible = false;

                // 保存成功后，刷新select数据
                this.getYKGTempList();

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },
        save() {
            this.nameDialogVisible = true;
        },
        resetData() {
            this.curYKGType = "";
            this.formData = {};
            // this.isDiy = false;
            this.nameDialogVisible = false;
        },

        /**
         * 保存新建的压溃管数据
         */
        saveNewData(datas) {
            this.nameDialog2Visible = true;
            this.cacheCurveData = datas;
        },

        saveCurveData(name) {
            console.log({ ...this.cacheCurveData.datas, name });
            this.nameDialog2Visible = false;
            this.$message.info("操作成功");
            this.getYKGTempList();
        }
    },
    mounted() {
        this.getYKGTempList();
    }
};
</script>

<style module lang="scss">
.root {
    .title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 30px;
    }

    label {
        font-size: 14px;
        margin-right: 20px;
    }

    .deleteBtn {
        display: inline-block;
        padding: 0 30px;
    }

    // .isDiy {
    //     margin-left: 20px;
    // }

    .formWrap {
        margin: 30px 0;
    }
    .row {
        font-size: 16px;
        font-weight: 500;
    }

    .footer {
        text-align: center;
        margin: 20px 0;
    }

    .nameDialog {
        :global {
            .el-input,
            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
        .el-form-item {
            margin-right: 30px;
        }
    }
}

.contentLi {
    width: 45%;
    .title {
        font-size: 14px;
        text-align: left;
    }

    .checkbox {
        margin-left: 0;
    }

    .rightList {
        margin-bottom: 20px;
    }
}
</style>
