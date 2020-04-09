<template>
    <el-dialog
        :custom-class="$style.nameDialog"
        title="保存"
        :visible.sync="dialogVisible"
        :modal="false"
        @close="onCancel"
        :append-to-body="true"
    >
        <el-input v-model="name" :disabled="!!dataSource.name" placeholder="请输入名称"></el-input>
        <el-input v-model="remarks" placeholder="请输入备注信息" style="margin-top: 10px"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="saveData">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "NameDialog",
    data() {
        return {
            name: "",
            remarks: "",
            dialogVisible: false
        };
    },
    watch: {
        "dataSource.name"(val) {
            this.name = val;
        },
        "dataSource.remarks"(val) {
            this.remarks = val;
        },
        visible(val) {
            this.dialogVisible = val;
        }
    },
    props: {
        onSaveData: {
            type: Function,
            default: () => {}
        },
        visible: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        dataSource: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    methods: {
        saveData() {
            if (!this.name) {
                this.$message({
                    message: "请输入名称",
                    type: "error"
                });
                return;
            }
            this.onSaveData({ name: this.name, remarks: this.remarks });
        }
    },
    mounted() {
        this.name = this.dataSource.name || "";
        this.remarks = this.dataSource.remarks || "";
    }
};
</script>

<style module lang="scss">
.nameDialog {
    :global {
        .el-input,
        .el-input__inner {
            height: 32px !important;
            line-height: 32px !important;
        }
    }
}
</style>
