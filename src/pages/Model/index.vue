<template>
    <div :class="$style.root">
        <div :class="$style.left">
            <div class="leftCont">
                <Tree />
            </div>
        </div>
        <div :class="$style.right" ref="rightWrap">
            <div :class="$style.rightContWrap">
                <div :class="$style.btnWrap">
                    <el-button class="btn-xl" @click="getModelsList">打开模型</el-button>
                    <el-button class="btn-xl" @click="newModel">新建模型</el-button>
                    <el-button class="btn-xl" @click="saveModelBefore">保存模型</el-button>
                    <el-button class="btn-xl" @click="saveModelAsBefore">模型另存</el-button>
                    <el-button class="btn-xl" @click="delModel">删除模型</el-button>
                </div>
                <div class="rightCont">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <el-dialog title="请选择要编辑的模型树" :visible.sync="dialogVisible" :append-to-body="true">
            <ul :class="$style.modelsContent" class="clearfix" v-if="modelsList.length > 0">
                <!-- <li
                    class="fll cursor-p"
                    v-for="item in modelsList"
                    :key="item.id"
                    @click="onSelectModel(item)"
                >{{item.name}}</li>-->

                <el-tag
                    class="cursor-p"
                    v-for="item in modelsList"
                    :key="item.id"
                    closable
                    @close="onCloseTag(item)"
                    @click="onSelectModel(item)"
                >{{item.name}}</el-tag>
            </ul>
            <dir v-else class="noData">暂无数据</dir>
        </el-dialog>

        <el-dialog :visible.sync="saveDialogVisible" width="30%">
            <span>是否包含计算结果？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onClickSaveDialogCb(false)">否</el-button>
                <el-button type="primary" @click="onClickSaveDialogCb(true)">是</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MODEL_TREE_TYPE, GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import { model } from "api";
import { getUserIdAndType } from "utils/util";
import msgCenter from "utils/msgCenter";

import Tree from "./Tree";

const verifyModelName = value => {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/;
    return reg.test(value);
};

export default {
    name: "Model",
    data() {
        return {
            dialogVisible: false,
            modelsList: [],

            saveDialogVisible: false
        };
    },
    components: {
        Tree
    },
    props: {},
    computed: {
        ...mapGetters("models", ["getTreeNodeByType"]),
        ...mapState("models", ["curModelId"]),

        curTreeNodeId() {
            return this.$route.query.id;
        }
    },
    watch: {
        curTreeNodeId() {
            this.$refs.rightWrap.scrollTop = 0;
        }
    },
    methods: {
        ...mapActions("models", [
            "saveModelTreeData",
            "setCurModelId",
            "setCurTreeNodeId",
            "clearAllDataModels"
        ]),

        // 选择要打开的模型树
        onSelectModel(item) {
            this.getModelTreeData(item.id);
        },

        // 请求模型树列表
        getModelsList() {
            const { userId, roleCode } = getUserIdAndType();

            model.getModels({ userId, roleCode }).then(res => {
                if (!res) return;
                let { data = [] } = res;
                this.modelsList = data;
                this.dialogVisible = true;
            });
        },

        // 新建模型
        newModel() {
            this.setModelName({
                success: name => {
                    // this.createModel(name);
                    this.createSuccessCb(name);
                }
            });
        },

        /**
         * 设置模型名称
         */
        setModelName: function({ success }) {
            const { userId, roleCode } = getUserIdAndType();

            this.$prompt("请输入模型名称", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: this.validatorModelname
            })
                .then(({ value }) => {
                    // console.log(value)
                    model
                        .createModel({ userId, roleCode: roleCode, name: value })
                        .then(res => {
                            if (!res) return;
                            this.getModelTreeData(res.data.id);
                            this.$message("操作成功");
                        });
                })
                .catch(e => {});
        },

        /**
         * 校验模型名称
         */
        validatorModelname: function(value) {
            if (!value) return "请输入名称";
            if (!verifyModelName(value)) {
                return "名称为只能包含汉字、数字、字母、_、-";
            }
            if (value.indexOf("_") === -1) {
                return '名称中必须包含"_"';
            }
            return true;
        },

        /**
         * 获取模型树的数据
         */
        getModelTreeData(id) {
            model.getModelTree({ id }).then(res => {
                if (!res) return;

                this.saveModelTreeData(res.data || []);
                this.setCurModelId(id);

                this.dialogVisible = false;

                this.createSuccessCb();
            });
        },

        // 创建或打开成功回调
        createSuccessCb() {
            let obj = this.getTreeNodeByType(MODEL_TREE_TYPE.basic)[0];
            if (!obj) return;

            let { id, type } = obj;
            this.setCurTreeNodeId(id);

            this.$router.push({
                path: `/page/model/edit`,
                query: { type, id }
            });
        },

        // 模型另存为
        saveModelAs(params = {}) {
            // 是否包含计算结果，后端暂不支持
            // let { includeCalculate } = params;
            const { userId, roleCode } = getUserIdAndType();
            setTimeout(() => {
                this.$prompt("请输入模型名称", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    inputValidator: this.validatorModelname
                })
                    .then(({ value }) => {
                        model
                            .saveModelAs({
                                userId,
                                roleCode: roleCode,
                                name: value,
                                id: this.curModelId
                            })
                            .then(res => {
                                if (!res) return;
                                this.getModelTreeData(res.data.id);
                                this.$message("操作成功");
                            });
                    })
                    .catch(e => {});
            }, 300);
        },

        onClickSaveDialogCb(bool) {
            this.saveDialogVisible = false;
            if (this.saveType === 1) {
                // 保存
                return this.saveModel({ includeCalculate: bool });
            } else if (this.saveType === 2) {
                // 另存为
                return this.saveModelAs({ includeCalculate: bool });
            }
        },

        // 模型另存为
        saveModelAsBefore() {
            if (!this.curModelId) return this.$message("请先选择模型");
            // this.$confirm("是否包含计算结果？", "模型另存为", {
            //     confirmButtonText: "是",
            //     cancelButtonText: "否",
            //     type: "info"
            // })
            //     .then(() => {
            //         // this.$message("模型另存为，含计算结果");
            //         this.saveModelAs({ includeCalculate: true });
            //     })
            //     .catch(() => {
            //         // this.$message("模型另存为，不含计算结果");
            //         this.saveModelAs({ includeCalculate: false });
            //     });
            this.saveDialogVisible = true;
            this.saveType = 2;
        },

        // 保存当前模型
        saveModelBefore() {
            if (!this.curModelId) {
                return this.$message("没有打开任何模型");
            }

            // 保存模型 无需询问“是否包含计算结果？”
            // this.saveDialogVisible = true;
            // this.saveType = 1;

            this.saveModel();
        },

        saveModel(bool) {
            msgCenter.publish(GLOBAL_MSG_CENTER_TOKEN.auto_save, {
                success: () => {},
                error: () => {
                    // this.$message("数据保存失败");
                }
            });
        },

        // 删除当前模型
        delModel() {
            this.onCloseTag({ id: this.curModelId });
        },

        // 删除tag
        onCloseTag(item) {
            const { userId, roleCode } = getUserIdAndType();
            if (!item.id) {
                this.$message("模型id不存在");
                return;
            }
            model.delModal({ id: item.id, userId, roleCode: roleCode }).then(res => {
                if (!res || res.code !== "200") return;
                this.$message(`删除成功`);

                const delIdx = this.modelsList.findIndex(
                    list => list.id === item.id
                );
                this.modelsList.splice(delIdx, 1);

                if (item.id === this.curModelId) {
                    this.clearAllDataModels();
                }
            });
        }
    },
    mounted() {
        if (!this.curModelId) return;
        this.createSuccessCb();
    }
};
</script>

<style module lang="scss">
$left-width: 222px;
.root {
    width: 100%;
    height: 100%;

    position: relative;
    .left {
        vertical-align: top;
        width: $left-width;
        height: 100%;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
        background-color: #fff;
        :global {
            .leftCont {
                width: 100%;
                height: 100%;
                overflow: auto;
                padding-bottom: 20px;
            }
        }
    }
    .right {
        height: 100%;
        padding: 20px;
        overflow: auto;
        position: absolute;
        top: 0;
        left: $left-width;
        right: 0;
        bottom: 0;
        .rightContWrap {
            min-width: 758px;
        }
        .btnWrap {
            margin-bottom: 20px;
        }
    }
}

.modelsContent {
    max-height: 300px;
    overflow: auto;
    li {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        cursor: pointer;
    }
    :global {
        .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
            background-color: transparent;
        }
    }
}
</style>
