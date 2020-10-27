<template>
    <div :class="$style.root" @contextmenu.prevent="onContextmenu" ref="root">
        <div :class="$style.closeBtn" class="cursor-p" @click="onClickClose">
            <img :src="closeIcon" alt />
        </div>
        <div :class="$style.title">
            <div :class="$style.carInfo">
                <span>{{ chartInfo.argVal }}</span>
            </div>
            <div :class="$style.argInfo" class="clearfix">
                <div>初始位置：{{ chartInfo.initialLocation || "" }}</div>
                <div>积分时长：{{ chartInfo.integralTimes || "" }}</div>
                <div>积分步长：{{ chartInfo.integralStep || "" }}</div>
            </div>
        </div>
        <div :class="$style.chartWrap">
            <Charts :options="chartsOptions" @datazoom="datazoomChange" />
            <!-- <Charts :options="chartsOptions" /> -->
        </div>
        <div
            v-show="contextmenuShow"
            :class="$style.contextmenu"
            ref="contextmenu"
            @contextmenu.prevent.stop="() => {}"
        >
            <ul>
                <Drawer :dataSource="chartsData">
                    <li @click="onClickContextMenu">自定义</li>
                </Drawer>
            </ul>
        </div>
        <div :class="$style.dragDom" ref="dragDom"></div>
    </div>
</template>

<script>
import { report } from "api";

import Charts from "components/Charts";
import DragResize from "lib/dragResize";
import { getUserIdAndType } from "utils/util";

import Img from "assets/icon";

import Drawer from "./ChartsDiy";

// import testData from "./testData";

const getXcfg = (xAxis, xAxisUnit) => {
    // const interval = parseInt(xAxis.length / 10);
    // const newX = [];
    // for (let i = 0; i < xAxis.length; i = i + interval) {
    //     newX.push(xAxis[i]);
    // }

    return {
        type: "category",
        name: xAxisUnit,
        splitNumber: 8,
        data: xAxis,
        axisLabel: {
            // interval: parseInt(xAxis.length / 10), // 代表显示所有x轴标签显示
            showMaxLabel: true,
        },
    };
};

const initChartsOptions = (params) => {
    const {
        name,
        xAxis,
        xAxisUnit,
        series,
        seriesUnit,
        dataZoomStart,
        dataZoomEnd,
    } = params;

    // console.log(params);

    // console.log(getXcfg(xAxis, xAxisUnit));

    return {
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: [name],
        },
        xAxis: getXcfg(xAxis, xAxisUnit),
        yAxis: {
            name: `${name}(${seriesUnit})`,
            type: "value",
            nameLocation: "end",
        },
        dataZoom: [
            {
                start: dataZoomStart,
                end: dataZoomEnd,
            },
            {
                type: "inside",
                start: dataZoomStart,
                end: dataZoomEnd,
            },
        ],
        series: [
            {
                name: name,
                type: "line",
                data: series,
                showSymbol: false,
                symbol: "circle", // 拐点样式
                symbolSize: 2, // 拐点大小
                // smooth: true
            },
        ],
    };
};

export default {
    name: "Chart",
    components: {
        Charts,
        Drawer,
    },
    data() {
        return {
            closeIcon: Img["close"],

            chartsOptions: {},
            contextmenuShow: false,
            currentPage: 1,
            chartsData: {
                seriesUnit: "",
                xAxis: [],
                series: [],
                name: "",
                xAxisUnit: "",
            },
        };
    },
    props: ["chartInfo"],
    methods: {
        hideContextmenu() {
            this.contextmenuShow = false;
        },
        onContextmenu(ev) {
            this.$refs.contextmenu.style.left = ev.zrX + 10 + "px";
            this.$refs.contextmenu.style.top = ev.zrY + 10 + "px";
            this.contextmenuShow = true;
        },
        onClickContextMenu() {
            // 点击完成后因此contextmenu
            this.hideContextmenu();
        },

        datazoomChange(params) {
            const { xAxis } = this._cacheChartsData;

            const len = xAxis.length;

            let start = params.start;
            let end = params.end;

            let startIdx = (len * start) / 100;
            let endIdx = (len * end) / 100;

            startIdx = parseInt(startIdx);
            endIdx = parseInt(endIdx);

            // start = xAxis[startIdx];
            // end = xAxis[endIdx];

            const newX = xAxis.slice(startIdx, endIdx);

            this.chartsOptions = initChartsOptions({
                ...this._cacheChartsData,
                xAxis: newX,
                dataZoomStart: params.start,
                dataZoomEnd: params.end,
            });
            // console.log(startIdx, endIdx);

            // const start = xAxis[0];
            // const end = xAxis[xAxis.length - 1];
            // const xAValue = end - start;

            // if (params.end === 100) {
            //     this.datazoom = {
            //         ...params,
            //         endValue: (xAValue * params.end) / 100,
            //         startValue: (xAValue * params.start) / 100
            //     };
            //     this.reloardChartData();
            // }
        },

        // // TODO 测试
        // getResultInfo(params = {}) {
        //     const res = testData;
        //     if (!res || res.code !== "200") return;

        //     if (!res.data || res.data.xAxis.length === 0) {
        //         this.noData = true;
        //     }

        //     const data = res.data || {};
        //     const { chartsData } = this;

        //     let {
        //         seriesUnit = "",
        //         xAxis = [],
        //         series = [],
        //         name = "",
        //         xAxisUnit = ""
        //     } = data;

        //     const newData = {
        //         name: chartsData.name || name,
        //         seriesUnit: chartsData.seriesUnit || seriesUnit,
        //         xAxisUnit: chartsData.nxAxisUnitame || xAxisUnit,
        //         xAxis: chartsData.xAxis.concat(xAxis),
        //         series: chartsData.series.concat(series)
        //     };

        //     this._cacheChartsData = { ...newData };

        //     this.chartsOptions = initChartsOptions({
        //         ...newData,
        //         dataZoomStart: 0,
        //         dataZoomEnd: 100
        //     });
        //     this.chartsData = newData;
        // },

        getResultInfo(params = {}) {
            const { curCalc } = this.$attrs;
            if (!curCalc) return;

            if (this.noData) return;
            const { modelId, ve, ca, code } = this.chartInfo;

            const pageSize = 1000;
            const currentPage = this.currentPage;

            const { userId } = getUserIdAndType();

            report
                .getResultInfo({
                    ve,
                    ca: ca || "",
                    code,
                    modelId,
                    currentPage,
                    pageSize,
                    recordId: curCalc,
                    userId,
                })
                .then((res) => {
                    if (!res || res.code !== "200") return;

                    if (!res.data || res.data.xAxis.length === 0) {
                        this.noData = true;
                    }

                    const data = res.data || {};
                    const { chartsData } = this;

                    let {
                        seriesUnit = "",
                        xAxis = [],
                        series = [],
                        name = "",
                        xAxisUnit = "",
                    } = data;

                    const newData = {
                        name: chartsData.name || name,
                        seriesUnit: chartsData.seriesUnit || seriesUnit,
                        xAxisUnit: chartsData.nxAxisUnitame || xAxisUnit,
                        xAxis: chartsData.xAxis.concat(xAxis),
                        series: chartsData.series.concat(series),
                    };

                    // const start = newData.xAxis[0];
                    // const end = newData.xAxis[newData.xAxis.length - 1];
                    // const xAValue = end - start;

                    // let dataZoomStart = 0;
                    // let dataZoomEnd = 30;
                    // if (this.datazoom) {
                    //     const { startValue, endValue } = this.datazoom;
                    //     dataZoomStart = (startValue / xAValue) * 100;
                    //     dataZoomEnd = (endValue / xAValue) * 100;
                    // }

                    this.chartsOptions = initChartsOptions({
                        ...newData,
                        dataZoomStart: 0,
                        dataZoomEnd: 100,
                    });
                    this.chartsData = newData;
                });
        },

        reloardChartData() {
            this.currentPage = this.currentPage + 1;
            this.getResultInfo();
        },

        // 关闭charts
        onClickClose() {
            this.$emit("onClose", this.chartInfo);
        },
    },
    created() {
        this.chartsOptions = {};
    },
    mounted() {
        DragResize.init({
            dragDom: this.$refs.dragDom,
            resizeDom: this.$refs.root,
        });
        document.body.addEventListener("click", this.hideContextmenu);

        this.getResultInfo();
    },
    beforeDestroy() {
        document.body.removeEventListener("click", this.hideContextmenu);
    },
};
</script>

<style module lang="scss">
.root {
    background-color: #fff;
    display: inline-block;
    width: 48%;
    margin: 10px;
    height: 350px;
    position: relative;
    padding: 12px;

    .closeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 14px;
        height: 14px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .contextmenu {
        position: absolute;
        z-index: 16777271;
        background-color: #fff;
        box-shadow: $box-shadow_1;
        line-height: 2em;
        font-size: 12px;
        cursor: pointer;
        li {
            width: 100px;
            text-align: center;
        }
    }

    .title {
        margin-bottom: 10px;
        .carInfo {
            font-size: 16px;
            text-align: center;
        }
        .argInfo {
            font-size: 14px;
            text-align: left;
            & > div {
                width: 33.3%;
                float: left;
            }
        }
    }

    .chartWrap {
        width: 100%;
        height: calc(100% - 50px);
    }

    .dragDom {
        // width: 10px;
        // height: 10px;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 999;
        cursor: move;

        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #999 #999 transparent;
    }
}
</style>
