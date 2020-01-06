<template>
    <el-dialog
        :custom-class="$style.nameDialog"
        title="请输入名称"
        :visible.sync="dialogVisible"
        :modal="false"
        @close="onCancel"
        :append-to-body="true"
    >
        <el-input v-model="name"></el-input>
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
            dialogVisible: false
        };
    },
    watch: {
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
            this.onSaveData(this.name);
        }
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
