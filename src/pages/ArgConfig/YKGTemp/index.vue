<template>
    <div :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div :class="$style.curBuffer">
            <label>请选择压溃管型号</label>
            <el-select v-model="curYKGType" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in ykgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-checkbox v-model="isDiy" :class="$style.isDiy">自定义</el-checkbox>

            <div :class="$style.deleteBtn" class="cursor-p" @click="onClickDel">删除</div>
        </div>
        <div class="clearfix" :class="$style.formWrap">
            <el-form ref="form" :inline="true" label-position="right" :model="formData">
                <el-row :class="$style.row">压溃管1</el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="行程">
                            <el-input-number :controls="false" v-model="formData.sYkg1" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作用力1">
                            <el-input-number :controls="false" v-model="formData.fYkg11" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作用力2">
                            <el-input-number :controls="false" v-model="formData.fYkg12" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :class="$style.row">压溃管2</el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="行程">
                            <el-input-number :controls="false" v-model="formData.sYkg2" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作用力1">
                            <el-input-number :controls="false" v-model="formData.fYkg21" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作用力2">
                            <el-input-number :controls="false" v-model="formData.fYkg22" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="resetData">清空</el-button>
        </div>

        <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveData"
            :onCancel="()=>nameDialogVisible = false"
        />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";
import { argConfig } from "api";
import { getUserIdAndType } from "utils/util";

const { userId, userType } = getUserIdAndType();

export default {
    name: "YKGTemp",
    components: {
        NameDialog
    },
    data() {
        return {
            // 当前的缓冲器型号
            ykgList: [],
            curYKGType: "",
            formData: {},

            isDiy: false,

            nameDialogVisible: false
        };
    },
    props: {},
    computed: {},
    watch: {
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
            // TODO type 根据用户身份确定，管理员：1(公用)，普通用户：2(私有)
            argConfig.getYKGTempList({ userId, type: userType }).then(res => {
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
        saveData(name) {
            let params = {
                ...this.formData,
                userId,
                type: userType,
                name
            };

            if (this.isDiy || !this.curYKGType) {
                delete params.id;
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
            if (this.isDiy || !this.curYKGType) {
                this.nameDialogVisible = true;
                return;
            }

            this.saveData(this.formData.name);
        },
        resetData() {
            this.curYKGType = "";
            this.formData = {};
            this.isDiy = false;
            this.nameDialogVisible = false;
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

    .isDiy {
        margin-left: 20px;
    }

    .formWrap {
        margin: 30px 0;
    }
    .row {
        font-size: 16px;
        font-weight: 500;
    }

    .footer {
        text-align: center;
        margin-bottom: 20px;
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
</style>
