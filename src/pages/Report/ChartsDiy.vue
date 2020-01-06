<template>
    <div>
        <div class="cursor-p hover-heighlight" @click.stop.prevent="showDrawer=true">
            <slot></slot>
        </div>
        <el-drawer
            ref="diyDrawer"
            custom-class="diyDrawer"
            title="自定义图表"
            :visible.sync="showDrawer"
            direction="rtl"
        >
            <div class="rampDrawContent">
                <div class="limitValue clearfix">
                    <div class="fll">
                        <label>最大值:</label>
                        <span>{{max || ''}}</span>
                    </div>
                    <div class="fll">
                        <label>最小值:</label>
                        <span>{{min || ''}}</span>
                    </div>
                </div>
                <el-table :data="tableDataSource" border max-height="250" size="mini">
                    <el-table-column
                        v-for="item in tableColumn"
                        :key="item.prop"
                        :prop="item.prop"
                        :label="item.label"
                        align="center"
                    ></el-table-column>
                </el-table>
                <div class="xAxisDiy">
                    <div>
                        <label>横轴参数名称</label>
                        <el-select v-model="xAxisKey">
                            <el-option
                                v-for="item in xList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </div>
                    <div>
                        <label>横轴单位</label>
                        <el-select v-model="xUnitKey">
                            <el-option
                                v-for="item in xUnit"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="drawerFooter">
                    <el-button
                        class="btn-xl"
                        type="primary"
                        style="margin-right:20px"
                        @click="$refs.diyDrawer.closeDrawer()"
                    >保存</el-button>
                    <el-button class="btn-xl" @click="showDrawer = false">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>

const xList = [{ key: "time", label: "时间" }];

const xUnit = [{ key: "s", label: "秒" }];

export default {
    name: "DiyDrawer",
    components: {},
    data() {
        return {
            showDrawer: false,
            tableColumn: [],
            tableDataSource: [],

            max: "",
            min: "",

            xList,
            xAxisKey: xList[0].key,

            xUnit,
            xUnitKey: xUnit[0].key
        };
    },
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {},
    watch: {
        dataSource() {
            const {
                name,
                xAxis,
                xAxisUnit,
                series,
                seriesUnit
            } = this.dataSource;

            const tableDatas = [];
            for (let i = 0; i < xAxis.length; i++) {
                tableDatas.push({
                    x: xAxis[i],
                    y: series[i]
                });
            }

            this.tableDataSource = tableDatas;
            this.tableColumn = [
                { prop: "x", label: xAxisUnit },
                { prop: "y", label: `${name}(${seriesUnit})` }
            ];

            const newSeries = [...series].sort((a, b) => a - b);
            this.max = newSeries[newSeries.length - 1] + "";
            this.min = newSeries[0] + "";
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
.diyDrawer {
    overflow: auto;
    :global {
        .el-drawer__header {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .rampDrawContent {
            padding: 0 20px 20px;

            .limitValue {
                font-size: 14px;
                line-height: 2em;
                margin-bottom: 10px;
                & > div {
                    margin-right: 40px;
                    &:last-child {
                        margin-right: 0;
                    }
                    label {
                        margin-right: 5px;
                    }
                }
            }

            .xAxisDiy {
                margin: 20px 0;
                & > div {
                    margin-bottom: 10px;
                    label {
                        display: inline-block;
                        width: 120px;
                    }
                }
            }

            .drawerFooter {
                margin-top: 20px;
                text-align: center;
            }
        }
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>


