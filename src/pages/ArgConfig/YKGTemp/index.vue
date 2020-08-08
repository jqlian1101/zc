<template>
    <el-form :class="$style.root">
        <div :class="$style.title">压溃管自定义</div>
        <div class="clearfix">
            <div class="flr">
                <span @click="openModalVisible=true" class="edit-btn m-l-5">打开压溃管</span>
                <span @click="openCurveModalVisible = true" class="edit-btn m-l-5">查看曲线</span>
                <span @click="onClickEdit()" class="edit-btn m-l-5">新建压溃管曲线</span>
                <Diy
                    placeholder="新建压溃管曲线"
                    title="压溃管曲线定义"
                    :type="5"
                    :showCharts="true"
                    :saveData="saveNewData"
                    :dataSource="editDataSource"
                    :visible="editVisible"
                    :onCancel="onCancelEdit"
                    :showToggleBtn="false"
                    :onRefresh="onRefresh"
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
                    <div :class="$style.deleteBtn" class="cursor-p fll" @click="resetData">新建</div>
                    <div :class="$style.deleteBtn" class="cursor-p fll" @click="onClickDel">删除</div>
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

        <el-dialog
            title="请选择要查看的曲线"
            :visible.sync="openCurveModalVisible"
            :modal="false"
            :append-to-body="true"
        >
            <ul :class="$style.tractionList" class="clearfix">
                <el-tag
                    class="cursor-p"
                    v-for="item in ykgList"
                    :key="item.id"
                    @click="lookCurve(item.id)"
                >{{item.tcsdName}}</el-tag>
            </ul>
        </el-dialog>

        <el-dialog
            title="请选择要打开的压溃管"
            :visible.sync="openModalVisible"
            :modal="false"
            :append-to-body="true"
        >
            <ul :class="$style.tractionList" class="clearfix">
                <el-tag
                    class="cursor-p"
                    v-for="item in ykgMainList"
                    :key="item.id"
                    @click="onClickOpenItem(item)"
                >{{item.name}}</el-tag>
            </ul>
        </el-dialog>
        <NameDialog2
            :visible="nameDialog2Visible"
            :onSaveData="saveCurveData"
            :onCancel="()=>nameDialog2Visible = false"
        />
        <el-dialog
            title="请选择要打开的压溃管"
            :visible.sync="sureModalVisible"
            :modal="false"
            :append-to-body="true"
        >
            <span>当前压溃管已被使用，是否确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sureModalVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSureDelYKG">确 定</el-button>
            </span>
        </el-dialog>
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
            // curYKGType: "",
            formData: {
                ykg1: "",
                ykg1Checked: false,
                ykg2: "",
                ykg2Checked: false
            },

            // isDiy: false,

            // nameDialogVisible: false,
            nameDialog2Visible: false,

            openModalVisible: false,
            openCurveModalVisible: false,

            remarks: "",

            sureModalVisible: false
        };
    },
    props: {},
    computed: {},
    watch: {
        async mainYKG(val) {
            if (!val) return;

            const curLi = this.ykgMainList.find(item => item.id === val) || {};
            this.remarks = curLi.remarks;

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
        "formData.ykg1Checked"(val) {
            if (!val) this.formData.ykg1 = "";
        },
        "formData.ykg2Checked"(val) {
            if (!val) this.formData.ykg2 = "";
        }
        // curYKGType() {
        //     let list = this.ykgList || [];
        //     let curKey = this.curYKGType;
        //     if (!curKey) return;
        //     this.formData = list.find(item => item.id === curKey);
        // }
    },
    methods: {
        // 获取压溃管模版列表
        getYKGTempList(cb) {
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

                    typeof cb === "function" && cb();
                });
        },

        // 打开曲线
        onClickOpenItem(item) {
            this.mainYKG = item.id;
            this.openModalVisible = false;
        },

        // 点击删除，删除选中项
        async onClickDel() {
            const id = this.mainYKG;
            if (!id) {
                this.$message({
                    message: "请先选择要删除的压溃管",
                    type: "error"
                });
                return;
            }

            const res = await argConfig.delYkgTempBfSearch({ id });
            const data = res.data || {};
            const { num } = data;
            if (num && num > 0) {
                this.planDelTempId = id;
                this.sureModalVisible = true;
            } else {
                this.delYKGTempFn(id);
            }
        },

        onSureDelYKG() {
            this.delYKGTempFn(this.planDelTempId);
            this.planDelTempId = "";
            this.sureModalVisible = false;
        },

        delYKGTempFn(id) {
            argConfig.delYKGTemp({ id }).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据，并清空选项
                this.getYKGTempList();
                this.resetData();

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
                id: this.mainYKG,
                type: userTypeCode,
                roleCode: roleCode,
                remarks: this.remarks,
                ...args
            };

            if (params.id) {
                const cur = this.ykgMainList.find(
                    item => item.id === params.id
                );
                params.name = cur.name;
            }

            // if (ykg1Checked) params.ykg1TcsdId = ykg1;
            // if (ykg2Checked) params.ykg2TcsdId = ykg2;

            params.ykg1TcsdId = ykg1Checked ? ykg1 : "";
            params.ykg2TcsdId = ykg2Checked ? ykg2 : "";

            // if (!this.curYKGType) {
            //     delete params.id;
            // }

            // for (let i in params) {
            //     if (!params[i]) delete params[i];
            // }

            argConfig.saveYKGTemp(params).then(res => {
                if (!res) return;
                this.nameDialog2Visible = false;

                // 保存成功后，刷新select数据
                this.getYKGTempList();
                this.mainYKG = res.data.id;

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        save() {
            if (!this.remarks) return this.$message.error("请输入备注");
            if (!this.mainYKG) {
                this.nameDialog2Visible = true;
            } else {
                this.saveData();
            }
        },
        resetData() {
            this.curYKGType = "";
            this.mainYKG = "";
            this.formData = {
                ykg1: "",
                ykg1Checked: false,
                ykg2: "",
                ykg2Checked: false
            };
            this.nameDialogVisible = false;
        },

        /**
         * 保存新建的压溃管数据
         */
        saveNewData({ datas = {} }) {
            const { tcsdData, tcsdId } = datas;
            this.editVisible = false;
            const id = tcsdId || tcsdData.id;
            this.getYKGTempList(() => {
                if (!id) return;
                this.formData.ykg1 = id;
                this.formData.ykg2 = id;
                this.mainYKG = "";
                this.remarks = "";
            });
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
        },
        onRefresh() {
            this.getYKGTempList();
        },
        lookCurve(id) {
            this.openCurveModalVisible = false;
            this.onClickEdit(id);
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
        line-height: 28px;
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
    width: 600px;
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

.tractionList {
    max-height: 300px;
    overflow: auto;
    li {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 5px;
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
