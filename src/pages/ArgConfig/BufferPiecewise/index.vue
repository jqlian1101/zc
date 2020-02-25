<template>
    <div :class="$style.root">
        <div :class="$style.title">缓冲器型号设置-分段函数法</div>
        <div :class="$style.curBuffer">
            <label>请选择缓冲器型号</label>
            <el-select v-model="curTempId" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in bufferList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-checkbox v-model="isDiy" :class="$style.isDiy">自定义</el-checkbox>
            <div :class="$style.deleteBtn" class="cursor-p" @click="onClickDel">删除</div>
        </div>
        <!-- <div v-if="curTempId || isDiy"> -->
        <div>
            <div class="clearfix" :class="$style.content">
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩加载</div>
                    <Table ref="ysjzInfo" :dataSource="ysjzInfo" />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">拉伸加载</div>
                    <Table ref="lsjzInfo" :dataSource="lsjzInfo" />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">压缩卸载</div>
                    <Table ref="ysxzInfo" :dataSource="ysxzInfo" />
                </div>
                <div class="fll" :class="$style.tableWrap">
                    <div :class="$style.title">拉伸卸载</div>
                    <Table ref="lsxzInfo" :dataSource="lsxzInfo" />
                </div>
            </div>
            <div :class="$style.footer">
                <el-button class="btn-xl" type="primary" @click="onClickSaveData">保存</el-button>
                <el-button class="btn-xl" @click="cancel">取消</el-button>
            </div>
        </div>
        <NameDialog :visible="nameDialogVisible" :onSaveData="saveData" :onCancel="hideNameDialog" />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";
import { argConfig } from "api";
import { getUserIdAndType, getObjFromStr } from "utils/util";

import Table from "./Table";


const globalTypeList = [
    { type: "symmetry", name: "对称曲线" },
    { type: "unsymmetry", name: "非对称曲线" }
];

export default {
    name: "BufferPiecewise",
    components: {
        Table,
        NameDialog
    },
    data() {
        return {
            // 当前的缓冲器型号
            curTempId: "",
            bufferList: [],
            isDiy: false,

            // 是否是对称曲线
            globalTypeList,
            globalType: globalTypeList[0].type,

            nameDialogVisible: false,

            ysjzInfo: [], // 压缩加载
            lsjzInfo: [], // 拉伸加载
            ysxzInfo: [], // 压缩卸载
            lsxzInfo: [] // 拉伸卸载
        };
    },
    props: {},
    computed: {
        curBufferTemp() {
            let { curTempId, bufferList } = this;
            return bufferList.find(item => item.id === curTempId) || {};
        }
    },
    watch: {
        curTempId() {
            let curBufferData = this.curBufferTemp;
            let { ysjzInfo, lsjzInfo, ysxzInfo, lsxzInfo } = curBufferData;

            ysjzInfo && (this.ysjzInfo = getObjFromStr(ysjzInfo));
            lsjzInfo && (this.lsjzInfo = getObjFromStr(lsjzInfo));
            ysxzInfo && (this.ysxzInfo = getObjFromStr(ysxzInfo));
            lsxzInfo && (this.lsxzInfo = getObjFromStr(lsxzInfo));
        }
    },
    methods: {
        // 获取模版列表
        getCoupFdhsfTempList() {
            const { userId, userTypeCode } = getUserIdAndType();

            argConfig
                .getCoupFdhsfTempList({ userId, type: userTypeCode })
                .then(res => {
                    if (!res) return;
                    this.bufferList = res.data || [];
                });
        },

        // 保存模版数据
        saveCoupFdhsfTemp(params) {
            argConfig.saveCoupFdhsfTemp(params).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据，并清空选项
                this.getCoupFdhsfTempList();

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        // 点击删除，删除选中项
        onClickDel() {
            if (!this.curTempId) {
                this.$message({
                    message: "请先选择型号",
                    type: "error"
                });
                return;
            }
            argConfig.delCoupFdhsfTemp({ id: this.curTempId }).then(res => {
                if (!res) return;

                // 保存成功后，刷新select数据，并清空选项
                this.getCoupFdhsfTempList();
                this.curTempId = "";

                this.$message({
                    message: "操作成功",
                    type: "success"
                });
            });
        },

        onClickSaveData() {
            // 如果是自定义，则输入用户名；否则，覆盖已选数据
            if (this.isDiy) {
                this.nameDialogVisible = true;
                return;
            }

            this.saveData();
        },

        hideNameDialog() {
            this.nameDialogVisible = false;
        },

        saveData(name) {
            let ysjzInfo = this.$refs.ysjzInfo.saveData();
            let lsjzInfo = this.$refs.lsjzInfo.saveData();
            let ysxzInfo = this.$refs.ysxzInfo.saveData();
            let lsxzInfo = this.$refs.lsxzInfo.saveData();

            const { userId, userTypeCode } = getUserIdAndType();

            let params = {
                userId,
                type: userTypeCode,
                name,
                ysjzInfo,
                lsjzInfo,
                ysxzInfo,
                lsxzInfo
            };

            if (!this.isDiy && this.curTempId) {
                params.id = this.curTempId;
                params.name = this.curBufferTemp.name;
            }

            this.saveCoupFdhsfTemp(params);
            this.hideNameDialog();
        },
        cancel() {}
    },
    mounted() {
        this.getCoupFdhsfTempList();
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

    .content {
        .title {
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            margin-bottom: 10px;
        }
    }
    .tableWrap {
        width: 50%;
        padding: 10px;
    }

    .footer {
        text-align: center;
        margin: 20px;
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>
