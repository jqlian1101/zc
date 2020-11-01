<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <el-button
                v-if="showAdd"
                class="btn-mini"
                :class="{[$style.disabled]: disabled}"
                @click="tableAdd()"
            >+</el-button>
            <el-button
                v-if="showDel"
                class="btn-mini"
                :class="{[$style.disabled]: disabled}"
                @click="tableDel()"
            >-</el-button>
            <el-button
                v-if="showOpen"
                class="btn-mini"
                :class="{[$style.disabled]: disabled}"
                @click="onOpenCurve"
            >打开</el-button>
            <el-button
                v-if="showSave"
                class="btn-mini"
                :class="{[$style.disabled]: disabled}"
                @click="onSaveCurve"
            >保存</el-button>
        </div>
        <el-table
            :data="tableData"
            :height="height"
            border
            size="mini"
            style="width: 100%"
            ref="elTable"
        >
            <el-table-column prop="number" label="序号" align="center" />
            <el-table-column prop="x" :label="xLabel" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        :controls="false"
                        v-model="scope.row.x"
                        @change="dataChange"
                        @blur="onXBlur"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="f" :label="fxLabel" align="center">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.f"
                        :controls="false"
                        @change="dataChange"
                        @blur="onFBlur"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div class="clearfix">
                        <div
                            class="cursor-p edit-btn fll"
                            style="width: 49%"
                            @click="tableInsert(scope.$index, scope.row)"
                        >插入</div>
                        <div
                            class="cursor-p edit-btn flr"
                            style="width: 49%"
                            @click="tableDel(scope.$index, scope.row)"
                        >删除</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div :class="$style.chartWrap" v-if="showCharts">
            <LineCharts :options="chartsOptions" />
        </div>

        <el-dialog
            title="请选择曲线"
            :visible.sync="curveDialogVisible"
            :modal="false"
            :append-to-body="true"
        >
            <ul :class="$style.tractionList" class="clearfix">
                <!-- <li
                    class="fll cursor-p"
                    v-for="item in tractionList"
                    :key="item.id"
                    @click="onClickTractionLi(item)"
                >{{item.tcsdName}}</li>-->
                <el-tag
                    class="cursor-p"
                    v-for="item in tractionList"
                    :key="item.id"
                    closable
                    @close="onCloseTag(item)"
                    @click="onClickTractionLi(item)"
                >{{item.tcsdName}}</el-tag>
            </ul>
        </el-dialog>

        <NameDialog
            :visible="nameDialogVisible"
            :onSaveData="saveCurveName"
            :onCancel="()=>toggleDialog('nameDialogVisible',false)"
        />
    </div>
</template>

<script>
import NameDialog from "components/NameDialog";

import { getUserIdAndType, getObjFromStr, isNil } from "utils/util";
import { model } from "api";
import LineCharts from "components/Charts";

let chartsOptions = {
    xAxis: {
        // type: "category"
        // data: []
    },
    yAxis: {
        // type: "value"
    },
    series: [
        {
            data: [],
            type: "line"
            // smooth: true
        }
    ]
};

export default {
    name: "Table",
    data() {
        return {
            tableData: [...this.dataSource],
            tcsd: {},

            tractionList: [],

            curveDialogVisible: false,
            nameDialogVisible: false,

            chartsOptions: JSON.parse(JSON.stringify(chartsOptions))
        };
    },
    components: {
        NameDialog,
        LineCharts
    },
    props: {
        xUnit: { type: String },
        fxUnit: { type: String },
        type: {
            // 如不传，则打开和保存会调用props里到方法
            type: Number
        },
        dataSource: {
            // table所用数据，后续将 dataSource 和tcsdData 进行合并
            type: Array,
            default: () => {
                return [];
            }
        },
        tcsdData: {
            // 完整的数据，包含id等
            type: Object,
            default: () => {
                return {};
            }
        },
        parentParams: {
            type: Object,
            default: () => {
                return {};
            }
        },
        tableDataChange: {
            type: Function,
            default: () => {}
        },
        onXBlur: {
            type: Function,
            default: () => {}
        },
        onFBlur: {
            type: Function,
            default: () => {}
        },
        height: {
            type: String,
            default: "150"
        },
        showOpen: {
            type: Boolean,
            default: true
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        showDel: {
            type: Boolean,
            default: true
        },
        showSave: {
            type: Boolean,
            default: true
        },
        onOpen: {
            type: Function,
            default: () => {}
        },
        onSaveCb: {
            type: Function,
            default: () => {}
        },
        onOpenCurveCb: {
            type: Function,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showCharts: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        xLabel() {
            return this.xUnit ? `x (${this.xUnit})` : "x";
        },
        fxLabel() {
            return this.fxUnit ? `f(x) (${this.fxUnit})` : "f(x)";
        }
    },
    watch: {
        dataSource() {
            this.tableData = [...this.dataSource];
        },

        tcsdData() {
            this.tcsd = { ...this.tcsdData };
        }
    },
    methods: {
        initData() {
            this.tableData = [...this.dataSource];
            this.tcsd = { ...this.tcsdData };
            this.charTableChange();
        },

        clearData() {
            this.tableData = [];
            this.tcsd = {};
            this.charTableChange();
        },

        // 切换dialog状态
        toggleDialog(field, bool) {
            this[field] = bool;
        },

        onTableRowChange() {
            this.resetOrder();
            this.$nextTick(() => {
                this.$refs.elTable.bodyWrapper.scrollTop = this.$refs.elTable.bodyWrapper.scrollHeight;
            });
        },

        // 单元格里到值发生变化时回调
        dataChange() {
            this.tableDataChange(this.tableData);
            this.charTableChange();
        },

        // table中插入一行
        tableAdd(idx) {
            if (this.disabled) return;
            let { tableData } = this;

            if (idx !== 0 && !idx) {
                idx = tableData.length - 1;
            }

            tableData.splice(idx + 1, 0, {
                x: 0,
                f: 0
            });
            // tableData.push({
            //     x: 0,
            //     f: 0
            // });

            this.onTableRowChange();

            // this.tableData = tableData;
            this.tableDataChange(this.tableData);
            this.charTableChange();
        },

        tableInsert(index) {
            this.tableAdd(index);
        },

        // table中删除一行
        tableDel(index) {
            if (this.disabled) return;
            let { tableData } = this;
            if (index !== 0 && !index) {
                tableData.pop();
            } else {
                tableData.splice(index, 1);
            }

            this.onTableRowChange();
            // this.tableData = tableData;
            this.tableDataChange(this.tableData);
            this.charTableChange();
        },

        resetOrder() {
            this.tableData.map((item, idx) => {
                item.number = idx + 1;
            });
        },

        // 打开曲线
        onOpenCurve() {
            if (this.disabled) return;
            if (!this.type) {
                this.onOpen();
                return;
            }
            let type = this.type;
            const { userId } = getUserIdAndType();

            model.tractionList({ userId, type }).then(res => {
                if (!res) return;
                let { data = [] } = res;
                if (data.length === 0) {
                    this.$message("暂无可选择的数据");
                    return;
                }
                this.tractionList = data.filter(item => !!item.tcsdName);
                this.curveDialogVisible = true;
            });
        },

        // 删除曲线
        onCloseTag(item) {
            model.delTcsd({ id: item.id }).then(res => {
                if (!res || res.code !== "200") return;
                this.$message(`删除成功`);

                const delIdx = this.tractionList.findIndex(
                    list => list.id === item.id
                );
                this.tractionList.splice(delIdx, 1);
            });
        },

        // 点击打开后，展示列表，并点击list
        onClickTractionLi(item) {
            let { id } = item;
            model.tractionLiView({ id }).then(res => {
                if (!res) return;
                let { data = {} } = res;
                this.tcsd = data;

                const tcsdData = getObjFromStr(data.tcsdData) || [];

                this.tableData = tcsdData;
                this.curveDialogVisible = false;

                // 打开数据后，将id返回给父组件
                this.onSaveCb(res.data.id);
                this.onOpenCurveCb({ ...data, tcsdData });
                this.charTableChange();
            });
        },

        // 点击 table的保存，提示输入名称
        onSaveCurve(cb) {
            if (this.disabled) return;
            let params = this.getSaveDataParmas();

            // 由父组件进行保存业务处理
            if (this.onSave) {
                this.onSave(params);
                return;
            }

            // this.tcsd = params;

            if (params.id) {
                this.tractionLiSave(cb);
                return;
            }

            this.toggleDialog("nameDialogVisible", true);
        },

        getSaveDataParmas() {
            const { userId } = getUserIdAndType();

            return {
                tcsdName: "",
                ...this.tcsd,
                userId,
                tcsdData: this.tableData || [],
                type: this.type,
                ...this.parentParams
            };
        },

        saveCurveName(name) {
            this.tcsdName = name;
            this.tractionLiSave();
        },

        // 保存talbe对数据
        tractionLiSave(cb) {
            let params = this.getSaveDataParmas();

            if (this.tcsdName) {
                params.tcsdName = this.tcsdName;
            }

            // if (!params.tcsdName && params.tcsdData.length === 0) return;

            return model.tractionLiSave(params).then(res => {
                if (!res) return;
                this.nameDialogVisible = false;

                this.$message({
                    message: "操作成功",
                    type: "success"
                });

                this.tcsdId = res.data.id;

                // 保存数据后，将id返回给父组件
                this.onSaveCb(res.data.id);

                typeof cb === "function" && cb();
                return res;
            });
        },

        // 图表联动
        charTableChange() {
            let data = this.tableData;
            let seriesData = [];
            data.map(item => {
                if (!isNil(item.x) && !isNil(item.f)) {
                    seriesData.push([item.x, item.f]);
                }
            });

            this.chartsOptions.series[0].data = seriesData;
        }
    },
    mounted() {
        this.initData();
    }
};
</script>
<style module lang="scss">
.root {
    .btnGroup {
        margin-bottom: 10px;
        .disabled {
            background-color: #999 !important;
            color: #fff !important;
        }
    }

    .chartWrap {
        width: 100%;
        height: 300px;
    }

    :global {
        .el-input-number.is-without-controls .el-input__inner {
            padding: $input-pad-s;
        }
        .el-input__inner {
            padding: 0 5px;
        }
        .el-form-item__label,
        .el-checkbox__label {
            font-size: 12px;
            color: $label-color_1;
        }
        .el-form-item {
            margin-bottom: 4px;
        }

        .el-talbe {
            .cell {
                line-height: 20px;
            }
        }
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

