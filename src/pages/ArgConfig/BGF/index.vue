<template>
    <div :class="$style.root">
        <div :class="$style.title">本构法</div>
        <div :class="$style.curBuffer">
            <label>请选择</label>
            <el-select v-model="curBGFType" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in bgfList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </div>
        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
            <el-button class="btn-xl" @click="resetData">清空</el-button>
        </div>

        <!-- <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveData"
            :onCancel="()=>nameDialogVisible = false"
        />-->
    </div>
</template>

<script>
// import NameDialog from "components/NameDialog";
// import { argConfig } from "api";
// import { getUserIdAndType } from "utils/util";

// const { userId, userType } = getUserIdAndType();

export default {
    name: "YKGTemp",
    components: {
        // NameDialog
    },
    data() {
        return {
            bgfList: [
                { id: 1, name: "本构法1" },
                { id: 2, name: "本构法2" },
                { id: 3, name: "本构法3" },
                { id: 4, name: "本构法4" },
                { id: 5, name: "本构法5" },
                { id: 6, name: "本构法6" },
                { id: 7, name: "本构法7" },
                { id: 8, name: "本构法8" },
                { id: 9, name: "本构法9" },
                { id: 10, name: "本构法10" }
            ],
            curBGFType: ""
            // formData: {},

            // isDiy: false,

            // nameDialogVisible: false
        };
    },
    props: {},
    computed: {},
    watch: {
        // curYKGType() {
        //     let list = this.ykgList || [];
        //     let curKey = this.curYKGType;
        //     if (!curKey) return;
        //     this.formData = list.find(item => item.id === curKey);
        // }
    },
    methods: {
        // // 获取压溃管模版列表
        // getYKGTempList() {
        //     // TODO type 根据用户身份确定，管理员：1(公用)，普通用户：2(私有)
        //     argConfig.getYKGTempList({ userId, type: userType }).then(res => {
        //         if (!res) return;
        //         this.ykgList = res.data;
        //     });
        // },

        // 点击删除，删除选中项
        // onClickDel() {
        //     if (!this.curYKGType) {
        //         this.$message({
        //             message: "请先选择型号",
        //             type: "error"
        //         });
        //         return;
        //     }
        //     argConfig.delYKGTemp({ id: this.curYKGType }).then(res => {
        //         if (!res) return;

        //         // 保存成功后，刷新select数据，并清空选项
        //         this.getYKGTempList();
        //         this.curYKGType = "";

        //         this.$message({
        //             message: "操作成功",
        //             type: "success"
        //         });
        //     });
        // },

        //  保存数据
        // saveData(name) {
        //     let params = {
        //         ...this.formData,
        //         userId,
        //         type: userType,
        //         name
        //     };

        //     if (this.isDiy || !this.curYKGType) {
        //         delete params.id;
        //     }

        //     argConfig.saveYKGTemp(params).then(res => {
        //         if (!res) return;
        //         this.nameDialogVisible = false;

        //         // 保存成功后，刷新select数据
        //         this.getYKGTempList();

        //         this.$message({
        //             message: "操作成功",
        //             type: "success"
        //         });
        //     });
        // },
        save() {
            // if (this.isDiy || !this.curYKGType) {
            //     this.nameDialogVisible = true;
            //     return;
            // }
            // this.saveData(this.formData.name);
            this.$message.success("保存成功");
        },
        resetData() {
            this.curBGFType = "";
            // this.formData = {};
            // this.isDiy = false;
            // this.nameDialogVisible = false;
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
