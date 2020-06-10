<template>
    <el-form :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div class="clearfix">
            <div class="flr">
                <span @click="onClickEdit()" class="edit-btn m-l-5">新建压溃管</span>
                <Diy
                    placeholder="新建压溃管"
                    title="压溃管曲线定义"
                    :type="5"
                    :showCharts="true"
                    :saveData="saveNewData"
                    :dataSource="editDataSource"
                    :visible="editVisible"
                    :onCancel="onCancelEdit"
                    :showToggleBtn="false"
                />
            </div>
            <div :class="$style.contentLi" class="fll">
                <div :class="$style.mainWrap" class="clearfix">
                    <div :class="$style.title" class="fll">请选择压溃管型号</div>
                    <el-select v-model="mainYKG" placeholder="请选择" class="m-l-5 fll">
                        <el-option
                            v-for="item in ykgMainList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div :class="$style.rightList">
                    <el-checkbox v-model="formData.ykg1Checked" :class="$style.checkbox"></el-checkbox>
                    <label>压溃管1</label>
                    <el-select v-model="formData.ykg1" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in ykgList"
                            :key="item.id"
                            :label="item.tcsdName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <span
                        v-if="!!formData.ykg1"
                        @click="onClickEdit(formData.ykg1)"
                        class="edit-btn m-l-5"
                    >编辑</span>
                </div>
                <div :class="$style.rightList">
                    <el-checkbox v-model="formData.ykg2Checked" :class="$style.checkbox"></el-checkbox>
                    <label>压溃管2</label>
                    <el-select v-model="formData.ykg2" placeholder="请选择" class="m-l-5">
                        <el-option
                            v-for="item in ykgList"
                            :key="item.id"
                            :label="item.tcsdName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <span
                        v-if="!!formData.ykg2"
                        @click="onClickEdit(formData.ykg2)"
                        class="edit-btn m-l-5"
                    >编辑</span>
                </div>
                <div :class="$style.rightList">
                    <label>备注</label>
                    <el-input v-model="remarks" />
                </div>
            </div>
        </div>

        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="resetData">清空</el-button>
        </div>

        <!-- <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveData"
            :onCancel="()=>nameDialogVisible = false"
            :dataSource="formData"
        />-->
        <NameDialog2
            :visible="nameDialog2Visible"
            :onSaveData="saveCurveData"
            :onCancel="()=>nameDialog2Visible = false"
        />
    </el-form>
</template>

<script>
// import NameDialog from "../BufferCurve/NameDialog";
import { argConfig, model } from "api";
import { getUserIdAndType } from "utils/util";

import NameDialog2 from "components/NameDialog";

import Diy from "./Diy";

export default {
    name: "YKGTemp",
    components: {
        // NameDialog,
        Diy,
        NameDialog2
    },
    data() {
        return {
            editDataSource: {},
            editVisible: false,

            // 当前的缓冲器型号
            ykgMainList: [],
            mainYKG: "",
            ykgList: [],
            curYKGType: "",
            formData: {
                ykg1: "",
                ykg1Checked: false,
                ykg2: "",
                ykg2Checked: false
            },

            // isDiy: false,

            // nameDialogVisible: false,
            nameDialog2Visible: false,
            remarks: ""
        };
    },
    props: {},
    computed: {},
    watch: {
        async mainYKG(val) {
            if (!val) return;
            const res = await argConfig.getYKGTempView({ id: val });
            if (!res || res.code !== "200") return;

            const [ykg1, ykg2] = res.data || [];
            if (ykg1 && ykg1.id) {
                this.formData.ykg1 = ykg1.id;
                this.formData.ykg1Checked = true;
            } else {
                this.formData.ykg1 = "";
                this.formData.ykg1Checked = false;
            }
            if (ykg2 && ykg2.id) {
                this.formData.ykg2 = ykg2.id;
                this.formData.ykg2Checked = true;
            } else {
                this.formData.ykg2 = "";
                this.formData.ykg2Checked = false;
            }
        },
        "formData.ykg1"(val) {
            if (val) this.formData.ykg1Checked = true;
        },
        "formData.ykg2"(val) {
            if (val) this.formData.ykg2Checked = true;
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
            const { userId, roleCode } = getUserIdAndType();

            model
                .tractionList({ userId, roleCode: roleCode, type: 5 })
                .then(res => {
                    if (!res) return;
                    this.ykgList = res.data;
                });

            // // TODO type 根据用户身份确定，管理员：1(公用)，普通用户：2(私有)
            argConfig
                .getYKGTempList({ userId, roleCode: roleCode })
                .then(res => {
                    if (!res) return;
                    this.ykgMainList = res.data;
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
            const { userId, userTypeCode, roleCode } = getUserIdAndType();
            const { ykg1, ykg1Checked, ykg2, ykg2Checked } = this.formData;

            let params = {
                userId,
                type: userTypeCode,
                roleCode: roleCode,
                ...args
            };

            if (ykg1Checked) params.ykg1TcsdId = ykg1;
            if (ykg2Checked) params.ykg2TcsdId = ykg2;

            if (!this.curYKGType) {
                delete params.id;
            }

            for (let i in params) {
                if (!params[i]) delete params[i];
            }

            argConfig.saveYKGTemp(params).then(res => {
                if (!res) return;
                this.nameDialog2Visible = false;

                // 保存成功后，刷新select数据
                this.getYKGTempList();

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        save() {
            if (!this.remarks) return this.$message.error("请输入备注");
            this.nameDialog2Visible = true;
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
            // console.log(datas);
            // this.nameDialog2Visible = true;
            // this.cacheCurveData = datas;
            this.getYKGTempList();
        },

        saveCurveData(name) {
            // console.log({ ...this.cacheCurveData.datas, name });
            // this.nameDialog2Visible = false;
            this.saveData({ name });
            // this.$message.info("操作成功");
            // this.getYKGTempList();
        },

        onClickEdit(id) {
            if (!id) {
                this.editDataSource = {};
                this.editVisible = true;
                return;
            }

            const curDatas = this.ykgList.find(item => item.id === id);
            let tcsdData = curDatas.tcsdData;
            if (tcsdData) tcsdData = JSON.parse(tcsdData);
            this.editVisible = true;
            this.editDataSource = {
                ...curDatas,
                tcsdId: curDatas.id,
                tcsdData: tcsdData || []
            };
        },
        onCancelEdit() {
            this.editVisible = false;
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
        margin-right: 20px;
    }

    .mainWrap {
        margin-bottom: 14px;
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
        .el-input {
            width: 230px;
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
