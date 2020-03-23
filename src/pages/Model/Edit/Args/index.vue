<template>
    <div :class="$style.root">
        <div :class="$style.info" v-if="showInfoCard">
            <div :class="$style.saveTableDataBtn" class="clearfix" v-if="showSaveTableBtn">
                <div class="btn-default flr" @click="saveTableData">保存数据</div>
            </div>
            <div class="clearfix" v-if="tableData.length > 0">
                <div
                    class="fll"
                    :class="$style.tableWrap"
                    v-for="(item,idx) in tableData"
                    :key="idx"
                >
                    <div :class="$style.title">{{item.name}}</div>
                    <div :class="$style.desc">车辆质量</div>
                    <el-table :data="item.columns" border size="medium">
                        <el-table-column
                            v-for="(col) in item.columns[0]"
                            :key="col.id"
                            :label="col.carNum"
                            width="100"
                        >
                            <el-input-number
                                :controls="false"
                                v-model="col.m"
                                :min="0"
                                @change="vehicleArgChange"
                            ></el-input-number>
                        </el-table-column>
                    </el-table>
                    <div :class="$style.speed">
                        车辆速度(km/h)：
                        <el-input-number
                            :class="$style.speedInp"
                            :controls="false"
                            v-model="item.v"
                            @change="vehicleArgChange"
                        />
                    </div>
                </div>
            </div>
            <div :class="$style.connectWrap" v-if="descList.length > 0">
                <div :class="$style.title">车间连接系统</div>
                <div :class="$style.desc" class="clearfix" v-for="item in descList" :key="item.id">
                    <span class="fll">{{item.coupname}}</span>
                    <div :class="$style.cont">
                        <span v-for="(desc, idx) in item.descArr" :key="idx">{{desc}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.legend" class="clearfix" v-if="chartList.length > 0">
            <div v-for="(item, idx) in chartList" :key="idx" :class="$style.legendBox" class="fll">
                <div :class="$style.carListWrap">
                    <CarList :list="item[1]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { model } from "api";
import msgCenter from "utils/msgCenter";
import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import CarList from "./CarList";
import { TEMP_FIELD_DICT } from "./constants";

export default {
    name: "Args",
    components: {
        // CarBody
        CarList
    },
    data() {
        return {
            tableData: [],
            descList: [],
            chartList: [],

            showSaveTableBtn: false
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"]),
        showInfoCard() {
            return this.tableData.length > 0 || this.descList.length > 0;
        }
    },

    methods: {
        vehicleArgChange() {
            this.showSaveTableBtn = true;
        },

        // 保存编辑后的数据
        saveTableData() {
            let { tableData, curModelId } = this;

            // TODO 测试
            // curModelId = "1158299331507040256";

            let params = { modelId: curModelId, ves: [], cas: [] };

            tableData.map(item => {
                params.ves.push({ row: item.row, v: item.v });
                let columns = item.columns[0];
                columns.map(cols => {
                    params.cas.push({
                        row: item.row,
                        cal: cols.cal,
                        m: cols.m
                    });
                });
            });

            model.saveAllCarDatas(params).then(res => {
                if (!res) return;
                this.$message.success("操作成功");
                this.showSaveTableBtn = false;
            });
        },

        // 刷新后端计算数据
        refreshTemp(cb) {
            let modelId = this.curModelId;

            model.compAllcouptypeTemp({ modelId }).then(res => {
                if (!res) return;
                typeof cb === "function" && cb(modelId);
            });
        },

        getPageData(modelId) {
            modelId = modelId || this.curModelId;
            Promise.all([
                model.getAllCarDatas({ modelId }), // 表格数据
                model.getAllCoupTypeList({ modelId }), // 图形数据
                model.getAllcouptypeTemp({ modelId }) // 文案数据
            ]).then(result => {
                this.handleCarTableData(result[0]);
                this.handleChartData(result[1]);
                this.handleOfficialData(result[2]);
            });
        },

        // 处理table数据
        handleCarTableData(res) {
            if (!res) return;
            let { ve1 = {}, ve2 = {}, caList = [] } = res.data || {};

            let result = [
                { ...ve1, name: "第1列", row: "1", columns: [[]] },
                { ...ve2, name: "第2列", row: "2", columns: [[]] }
            ];
            caList.map(item => {
                if (!item.m) item.m = 0;
                if (item.row === "1") {
                    result[0].columns[0].push(item);
                } else if (item.row === "2") {
                    result[1].columns[0].push(item);
                }
            });

            result[0].columns[0].sort((a, b) => a.cal - b.cal);
            result[1].columns[0].sort((a, b) => a.cal - b.cal);
            this.tableData = result;
        },

        // 处理图形数据
        handleChartData(res) {
            if (!res) return;
            let data = res.data || [];
            let obj = {};

            for (let i = 0; i < data.length; i++) {
                let curItem = data[i];

                let arr = curItem.carNum.split("-");
                let row = arr[0]; // 第几列
                let cal = arr[1]; // 第几辆

                if (!obj[row]) {
                    obj[row] = [];
                } else {
                    // 判断是否已经存储过该车辆
                    let cur = obj[row].find(li => li.carNum === curItem.carNum);
                    if (cur) continue;
                }

                // 前端面信息
                curItem.front =
                    data.find(
                        li =>
                            li.carNum === curItem.carNum && li.faceType === "1"
                    ) || {};
                // 后端面信息
                curItem.back =
                    data.find(
                        li =>
                            li.carNum === curItem.carNum && li.faceType === "2"
                    ) || {};

                obj[row].push({
                    row,
                    cal,
                    ...curItem
                });
            }

            for (let i in obj) {
                obj[i].sort((a, b) => a.cal - b.cal);
            }

            this.chartList = Object.entries(obj);
        },

        // 处理文案数据
        handleOfficialData(res) {
            if (!res) return;
            let data = res.data || [];

            // data.sort((a, b) => a.coupname - b.coupname);
            data.map(item => {
                let arr = [];
                for (let i in TEMP_FIELD_DICT) {
                    if (item[i]) {
                        let str = TEMP_FIELD_DICT[i].name + ": ";
                        if (TEMP_FIELD_DICT[i].dict) {
                            str += TEMP_FIELD_DICT[i].dict[item[i]];
                        } else {
                            str += item[i];
                        }
                        arr.push(str);
                    }
                }
                item.descArr = arr;
            });

            this.descList = data;
        },

        initData() {
            this.refreshTemp(this.getPageData);
        }
    },

    mounted() {
        this.initData();
        this.subToken = msgCenter.subscribe(
            GLOBAL_MSG_CENTER_TOKEN.auto_save,
            (topic, data) => {
                data.success();
            }
        );
    },
    beforeDestroy() {
        msgCenter.unsubscribe(this.subToken);
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .info {
        max-height: 350px;
        overflow: auto;
        padding: 30px;
        background: #fff;
        border-radius: $raduis_1;
        margin-bottom: 20px;
        position: relative;

        .title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 20px;
        }

        .saveTableDataBtn {
            margin-bottom: 10px;
        }
    }
    .tableWrap {
        width: 50%;
        padding-right: 10px;
        &:last-child {
            padding-right: 0;
            padding-left: 10px;
        }

        .desc {
            margin-bottom: 10px;
        }
        .speed {
            margin: 20px 0;

            .speedInp {
                width: 100px;
                :global {
                    .el-input__inner {
                        border: none !important;
                    }
                }
            }
        }
    }

    .connectWrap {
        margin: 20px 0;
        .desc {
            font-size: 12px;
            text-align: justify;
            line-height: 2em;
            margin-bottom: 5px;
            .cont {
                margin-left: 20px;
                text-align: justify;
                margin-bottom: 15px;
                span {
                    display: inline-block;
                    padding: 0 10px;
                }
            }
        }
    }

    .legend {
        height: 350px;
        .legendBox {
            width: 50%;
            height: 100%;
            overflow: auto;

            .carListWrap {
                min-height: 100%;
                padding: 20px;
                background-color: #fff;
                border-radius: $radius_1;
                margin-right: 10px;
            }

            &:last-child {
                .carListWrap {
                    margin-right: 0;
                    margin-left: 10px;
                }
            }
        }
    }
    :global {
        .el-table {
            .cell {
                height: 40px;
                line-height: 40px;
            }
        }
    }
}
</style>

