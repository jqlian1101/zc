<template>
    <div :class="$style.root" class="clearfix">
        <div :class="$style.chartWrap" class="fll">
            <LineCharts :options="chartsOptions" />
        </div>
        <div :class="$style.rightWrap" class="flr">
            <div :class="$style.typeWrap" v-if="type">{{typeName}}</div>
            <!-- 曲线xy值表格 -->
            <div :class="$style.chartTableWrap">
                <EditTable
                    xUnit="m"
                    fxUnit="N"
                    :showSave="false"
                    :showOpen="false"
                    :dataSource="pointData"
                    :tableDataChange="charTableChange"
                    height="200"
                />
            </div>
            <!-- 曲线分段 -->
            <div :class="$style.subTableWrap">
                <el-table :data="pointAllotData" border size="mini" stripe>
                    <el-table-column prop="name" label="曲线分段" align="center" />
                    <el-table-column prop="value" label="点序号" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.value" :controls="false" :min="0"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div :class="$style.scaleWrap">
                <div style="margin-bottom: 10px">
                    <span>x比例：1:</span>
                    <el-input-number
                        :controls="false"
                        v-model="xProportion"
                        :min="0"
                        :class="$style.scaleInp"
                    />
                    <span>f(x)比例：1:</span>
                    <el-input-number
                        :controls="false"
                        v-model="fxProportion"
                        :min="0"
                        :class="$style.scaleInp"
                    />
                </div>
                <div>
                    <span>插值方法</span>
                    <el-select v-model="interpolationMethod" :class="$style.inter">
                        <el-option
                            v-for="item in interList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isNil } from "utils/util";
import EditTable from "components/EditTable";
import LineCharts from "components/Charts";

let chartsOptions = {
    color: ["#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0"],
    xAxis: {},
    yAxis: {},
    series: [
        // {
        //     data: [],
        //     type: "line"
        //     // smooth: true
        // }
    ]
};

const interList = [{ id: "line", name: "line" }];

// const defaultPointData = [
//     { name: "预加载", value: "", key: "preMount" },
//     { name: "开始加载", value: "", key: "beforeMount" },
//     { name: "加载", value: "", key: "mount" },
//     { name: "开始卸载", value: "", key: "beforeDestory" },
//     { name: "卸载", value: "", key: "destory" }
// ];
let defaultInterId = interList[0].id;

const getDefaultPointData = () => [
    { name: "预加载", value: "", key: "preMount" },
    { name: "开始加载", value: "", key: "beforeMount" },
    { name: "加载", value: "", key: "mount" },
    { name: "开始卸载", value: "", key: "beforeDestory" },
    { name: "卸载", value: "", key: "destory" }
];

export default {
    name: "BufferCurve",
    components: {
        LineCharts,
        EditTable
    },
    data() {
        let { dataSource } = this;
        const {
            pointAllotDataLs,
            pointDataLs,
            xProportionLs,
            fxProportionLs,
            interpolationMethodLs
        } = dataSource;

        return {
            // 曲线分段table
            // pointAllotData: pointAllotDataLs || defaultPointData,
            pointAllotData: pointAllotDataLs || getDefaultPointData(),

            pointData: pointDataLs || [],

            // 比例
            xProportion: xProportionLs || 1,
            fxProportion: fxProportionLs || 1,

            // 插值
            interList,
            interpolationMethod: interpolationMethodLs || defaultInterId,

            chartsOptions: { ...chartsOptions }
        };
    },
    props: {
        type: {
            type: Number
        },
        typeName: {
            type: String,
            default: ""
        },
        onTalbeDataChange: {
            type: Function,
            default: () => {}
        },
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        dataSource(newData) {
            const {
                pointAllotDataLs,
                pointDataLs,
                xProportionLs,
                fxProportionLs,
                interpolationMethodLs
            } = newData;

            this.pointAllotData = pointAllotDataLs || getDefaultPointData();

            this.pointData = pointDataLs || [];

            // 比例
            this.xProportion = xProportionLs || 1;
            this.fxProportion = fxProportionLs || 1;

            this.interpolationMethod = interpolationMethodLs || defaultInterId;
            this.charTableChange(this.pointData, this.pointAllotData);
        }
    },
    methods: {
        charTableChange(data, pointAllotData) {
            // console.log(data, pointAllotData);

            data = data || this.pointData;
            pointAllotData = pointAllotData || this.pointAllotData;

            const dataKV = {};
            data.map(item => {
                dataKV[String(item.number)] = item;
            });

            const relation = [];
            pointAllotData.map(item => {
                let value = item.value || "";
                let newVal = [];
                if (value) {
                    newVal = value.split(",");
                }
                relation.push({ ...item, value: newVal });
            });

            // console.log(dataKV, relation);

            this.chartsOptions.series = [];
            relation.map(item => {
                let seriesData = {
                    data: [],
                    type: "line"
                };
                item.value.map(key => {
                    let point = dataKV[key];

                    if (point && !isNil(point.x) && !isNil(point.f)) {
                        seriesData.data.push([point.x, point.f]);
                    }
                });

                this.chartsOptions.series.push(seriesData);
            });

            // let seriesData = [];
            // data.map(item => {
            //     if (!isNil(item.x) && !isNil(item.f)) {
            //         seriesData.push([item.x, item.f]);
            //     }
            // });
            // this.chartsOptions.series[0].data = seriesData;

            this.pointData = [...data];
        },
        saveData() {
            let {
                pointAllotData,
                pointData,
                xProportion,
                fxProportion,
                interpolationMethod
            } = this;

            let result = {
                pointAllotData: [...pointAllotData],
                pointData: [...pointData],
                xProportion,
                fxProportion,
                interpolationMethod
            };

            if (this.type) result.curveType = this.type;

            return result;
        }
    },
    mounted() {
        this.charTableChange(this.pointData, this.pointAllotData);
    }
};
</script>

<style module lang="scss">
.root {
    margin-bottom: 20px;
    .chartWrap {
        width: 46%;
        height: 450px;
    }

    .rightWrap {
        width: 46%;
    }
    .typeWrap {
        font-size: 16px;
        font-weight: 500;
        margin: 10px 0;
    }
    .subTableWrap {
        margin-top: 20px;
    }

    .scaleWrap {
        margin: 10px 0;
    }
    .scaleInp {
        width: 30px;
        margin-right: 20px;
    }

    .inter {
        width: 66px;
        height: 20px;
        margin-left: 10px;
    }

    :global {
        .el-input-number {
            margin-left: 10px;
        }
        .el-input-number.is-without-controls .el-input__inner {
            padding: 0 4px;
        }

        .el-input__icon {
            line-height: 30px;
        }
    }
}
</style>
