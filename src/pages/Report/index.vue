<template>
    <div :class="$style.root">
        <div :class="$style.searchWrap">
            <div :class="$style.title">计算条件设置</div>
            <el-form ref="form" :model="searchForm" label-width="120px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="初始位置">
                            <el-input v-model="searchForm.initialLocation"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="积分条件">
                            <el-col :span="11">
                                <el-input v-model="searchForm.integralTimes" placeholder="积分时长"></el-input>
                            </el-col>
                            <el-col :class="$style.division" :span="2">～</el-col>
                            <el-col :span="11">
                                <el-input v-model="searchForm.integralStep" placeholder="积分步长"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="计算方式">
                            <el-select v-model="searchForm.compute" placeholder>
                                <el-option label="计算方法1" value="compute1"></el-option>
                                <el-option label="计算方法2" value="compute2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="列车1 速度">
                            <input-number-wrap suffix="km/h">
                                <el-input-number
                                    :controls="false"
                                    v-model="searchForm.v1"
                                    clearable
                                ></el-input-number>
                            </input-number-wrap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="列车2 速度">
                            <input-number-wrap suffix="km/h">
                                <el-input-number
                                    :controls="false"
                                    v-model="searchForm.v2"
                                    clearable
                                ></el-input-number>
                            </input-number-wrap>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :class="$style.subForm">
                    <span
                        :class="[$style.btn,$style.saveBtn]"
                        type="primary"
                        @click="getCalculateResults"
                    >计算</span>
                    <span
                        :class="[$style.btn,$style.saveBtn]"
                        type="primary"
                        @click="saveCalculate"
                    >保存计算结果</span>
                    <span
                        :class="[$style.btn,$style.saveBtn]"
                        type="primary"
                        @click="calcResultDialogVisible = true"
                    >打开计算结果</span>
                    <span :class="[$style.btn,$style.exportBtn]" @click="getReportExel">生成报告</span>
                    <!-- <a
                        v-if="allowCreateCharts"
                        :class="[$style.btn,$style.exportBtn]"
                        href="/api/resultrecord/exportReport"
                    >生成报告</a>
                    <a
                        v-else
                        :class="[$style.btn,$style.exportBtn]"
                        @click="$message('请先进行计算')"
                    >生成报告</a>-->
                </el-form-item>
            </el-form>
        </div>
        <div :class="[$style.chartFormWrap, 'clearfix']">
            <div class="fll">显示参数</div>
            <div class="fll">
                <Cascader @onChange="onArgsChange" :curCalc="curCalcId" />
            </div>
            <span :class="[$style.btn, $style.saveBtn]" @click="createChartsList">生成图表</span>
        </div>
        <div :class="$style.charts">
            <div :class="$style.chartsCont">
                <Chart
                    v-for="item in chartsData"
                    :key="item.chartKey"
                    :chartInfo="item"
                    :curCalc="curCalcId"
                    @onClose="onCloseCharts"
                />
            </div>
        </div>
        <div :class="$style.calculating" v-if="showCalculating">
            <div :class="$style.cont">
                <el-progress :percentage="calculatingPer"></el-progress>
                <p>计算中 ...</p>
            </div>
        </div>

        <el-dialog
            title="生成报告"
            :visible.sync="showDownReportModel"
            :append-to-body="true"
            :custom-class="$style.downReportDialog"
        >
            <el-form :model="reportTypeFrom" label-width="120px">
                <el-form-item label="选择报告模版">
                    <el-select v-model="reportTypeFrom.type" placeholder="选择报告模版">
                        <el-option
                            :key="item.type"
                            :label="item.name"
                            :value="item.type"
                            v-for="item in reportTempList"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择计算结果">
                    <el-select v-model="reportTypeFrom.recordId" placeholder="选择计算结果" multiple>
                        <el-option
                            v-for="item in calcResultList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDownReportModel = false">取 消</el-button>
                <el-button type="primary" @click="sureDownReport">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="请选择要打开的计算结果"
            :visible.sync="calcResultDialogVisible"
            :append-to-body="true"
        >
            <ul :class="$style.modelsContent" class="clearfix" v-if="calcResultList.length > 0">
                <el-tag
                    class="cursor-p"
                    v-for="item in calcResultList"
                    :key="item.id"
                    closable
                    @close="deleteRecordById(item)"
                    @click="openCalculate(item)"
                >{{item.name}}</el-tag>
            </ul>
            <dir v-else class="noData">暂无数据</dir>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { report } from "api";
import { getUserIdAndType } from "utils/util";

import Chart from "./Charts";

import Cascader from "./Cascader";

// const varifyArgs = [
//     { key: "initialLocation", msg: "请输入初始位置" },
//     { key: "integralTimes", msg: "请输入积分时长" },
//     { key: "integralStep", msg: "请输入积分步长" }
//     // { key: "ve", msg: "请选择显示参数" },
//     // { key: "ca", msg: "请选择显示参数" },
//     // { key: "code", msg: "请选择显示参数" }
// ];

// const varifyArgsFns = (arg = {}, obj) => {
//     const { key, msg } = arg;
//     if (!key) return true;

//     if (!obj[key]) {
//         ELEMENT.Message({
//             message: msg || "请输入正确的计算条件",
//             type: "error"
//         });
//         return false;
//     }

//     return true;
// };

const verifyModelName = value => {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/;
    return reg.test(value);
};

export default {
    name: "Report",
    components: {
        Cascader,
        // GridLayout,
        Chart
        // DragResize
    },
    data() {
        return {
            // IEVersion,
            searchForm: {},
            chartsData: [],
            allowCreateCharts: false,

            showCalculating: false,
            calculatingPer: 0,

            showDownReportModel: false,

            reportTypeFrom: { type: "", recordId: "" },

            calcResultList: [],
            calcResultDialogVisible: false,

            reportTempList: [],
            curCalcId: ""

            // chartsLayout: testLayout
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        initData() {
            this.getCalcList();
            this.getReportTempList();
        },

        /**
         * 获取计算结果列表
         */
        getCalcList() {
            if (!this.curModelId) return;
            const { userId } = getUserIdAndType();
            // 获取计算结果列表
            report
                .getRecordList({ userId, modelId: this.curModelId })
                .then(res => {
                    if (!res || res.code !== "200") return;
                    this.calcResultList = res.data || [];
                });
        },

        // 获取报告模版列表
        getReportTempList() {
            report.getReportTempList({}).then(res => {
                if (!res || res.code !== "200") return;
                this.reportTempList = res.data || [];
            });
        },

        onArgsChange(args) {
            if (args.length === 0) {
                this.searchForm = {
                    ...this.searchForm,
                    code: "",
                    ve: "",
                    ca: ""
                };
                return;
            }

            const [code, ve, ca] = args[1].split("-");

            // const code = args[0];
            // const vc = args[1].split("-");

            // const ve = vc[0];
            // const ca = vc[1];

            this.searchForm = {
                ...this.searchForm,
                code,
                ve,
                ca
            };
        },

        clearCalcTimer() {
            clearInterval(this.calcProgressTimer);
            this.calcProgressTimer = null;
            this.calcProgressNum = 0;
        },

        showCalcProgress(integralTimes = 1) {
            this.showCalculating = true;

            let stage = Math.ceil(integralTimes) + 1; // 段数

            if (stage < 4) {
                // 最小分4段
                stage = 4;
            } else if (stage > 20) {
                // 最大10段
                stage = 20;
            }

            const frequently = 3000; // 每段时常3s
            const step = Math.ceil(100 / stage); // 步距

            this.clearCalcTimer();

            this.calcProgressTimer = setInterval(() => {
                if (this.calcProgressNum === stage - 1) {
                    return this.clearCalcTimer();
                }
                this.calcProgressNum = this.calcProgressNum + 1;
                let newPer = this.calculatingPer + step;
                if (newPer > 99) newPer = 99;
                this.calculatingPer = newPer;
            }, frequently);
        },

        getCalculateResults() {
            const { userId } = getUserIdAndType();
            const { searchForm } = this;
            const {
                initialLocation = "",
                integralTimes = "",
                integralStep = "",
                v1 = "",
                v2 = ""
            } = searchForm;

            this.showCalcProgress(integralTimes);

            report
                .getCalculateResults({
                    initialLocation,
                    integralTimes,
                    integralStep,
                    v1,
                    v2,
                    modelId: this.curModelId,
                    userID: userId
                })
                .then(res => {
                    this.clearCalcTimer();
                    if (!res || res.code !== "200") {
                        this.showCalculating = false;
                        this.calculatingPer = 0;
                        return;
                    }

                    const { data = {} } = res;
                    this.curCalcId = data.recordId || "";

                    this.allowCreateCharts = true;

                    this.calculatingPer = 100;
                    setTimeout(() => {
                        this.showCalculating = false;
                        this.calculatingPer = 0;
                    }, 500);
                });
        },

        deleteRecordById(record) {
            report.deleteRecordById({ recordId: record.id }).then(res => {
                if (!res || res.code !== "200") return;
                this.$message("操作成功");
                this.getCalcList();
            });
        },

        openCalculate(record) {
            if (!record.id) return;
            const { userId } = getUserIdAndType();
            report.getRecordInfo({ recordId: record.id, userId }).then(res => {
                if (!res || res.code !== "200") return;
                const { data = {} } = res;
                this.curCalcId = data.id || "";
                this.allowCreateCharts = true;
                this.calcResultDialogVisible = false;
                this.$message("操作成功");
            });
        },

        /**
         * 保存计算结果
         */
        saveCalculate() {
            if (!this.curCalcId) return this.$message("当前没有计算结果可保存");
            this.setModelName({
                success: name => {
                    const { userId } = getUserIdAndType();
                    // this.$message(`保存为 ${name}`);
                    let params = { name, modelId: this.curModelId, userId };
                    if (this.curCalcId) {
                        params.id = this.curCalcId;
                    }

                    report.saveResultRecord(params).then(res => {
                        if (!res || res.code !== "200") return;
                        this.$message(res.message || "保存成功");

                        this.getCalcList();
                        // 调用过后端生成图片接口
                        this.generateEChartIMG({
                            modelId: this.curModelId,
                            userId,
                            recordIds: this.curCalcId
                        });
                    });
                }
            });
        },

        generateEChartIMG(params) {
            const { modelId, recordIds, userId } = params;
            report
                .generateEChartIMG({ modelId, recordIds, userId })
                .then(res => console.log(res));
        },

        /**
         * 设置模型名称
         */
        setModelName: function({ success }) {
            // const { userId } = getUserIdAndType();

            this.$prompt("请输入计算结果名称", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: this.validatorModelname
            })
                .then(({ value }) => {
                    success(value);
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
            return true;
        },

        createChartsList() {
            if (!this.allowCreateCharts) {
                this.$message("请先输入计算参数并点击计算");
                return;
            }

            const { searchForm } = this;
            const {
                initialLocation = "",
                integralTimes = "",
                integralStep = "",
                ve = "",
                ca = "",
                code = ""
            } = searchForm;

            if (!ve || !ca || !code) {
                this.$message("请先选择参数");
                return;
            }

            const chartData = {
                chartKey: `${this.curModelId}-${ve}-${ca}-${code}-${initialLocation}-${integralTimes}-${integralStep}`,
                ...this.searchForm,
                modelId: this.curModelId
            };

            // 所填参数已经生成一个图表
            // 将该图表删除，然后在第一位再插入
            const oldChartIdx = this.chartsData.findIndex(
                item => item.chartKey === chartData.chartKey
            );

            if (oldChartIdx !== -1) {
                this.chartsData.splice(oldChartIdx, 1);
            }
            this.chartsData.unshift(chartData);
        },

        // 关闭单个图表
        onCloseCharts(chartInfo) {
            const closedChart = this.chartsData.findIndex(
                item => item.chartKey === chartInfo.chartKey
            );
            if (closedChart !== -1) {
                this.chartsData.splice(closedChart, 1);
            }
        },

        getReportExel() {
            // if (!this.allowCreateCharts) return this.$message("请先进行计算");
            this.showDownReportModel = true;
        },

        sureDownReport() {
            const { type, recordId } = this.reportTypeFrom;

            if (!type) return this.$message("请先选择模版类型");
            if (!recordId || recordId.length === 0) {
                return this.$message("请先选择计算结果");
            }

            const { userId } = getUserIdAndType();

            const a = document.createElement("a");
            a.setAttribute(
                "href",
                `/api/resultrecord/exportReport?modelId=${this.curModelId}&recordId=${recordId}&type=${type}&userId=${userId}`
            );
            a.click();

            this.showDownReportModel = false;
        }
    },
    mounted() {
        this.initData();
        const cache = window.sessionStorage.getItem("_crrc_calc_result_");
        if (cache) {
            this.searchForm = JSON.parse(cache);
        }
    },
    beforeDestroy() {
        window.sessionStorage.setItem(
            "_crrc_calc_result_",
            JSON.stringify(this.searchForm)
        );
        this.clearCalcTimer();
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    // height: 100%;
    padding: 20px;

    // .content {
    //     width: 100%;
    //     height: 100%;
    //     overflow: auto;
    //     // background-color: #fff;
    //     // padding: 20px;
    // }

    .division {
        text-align: center;
    }

    .searchWrap {
        background-color: #fff;
        padding: 20px;
        .title {
            font-size: 16px;
            color: #4baed0;
            margin-bottom: 10px;
        }

        .subForm {
            margin-bottom: 0;
        }
    }

    .btn {
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        width: 215px;
        height: 32px;
        line-height: 32px;
        padding: 0;
        color: #fff;
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
    .saveBtn {
        background-color: #4bccf4;
    }
    .exportBtn {
        background-color: #36a7e3;
    }

    .chartFormWrap {
        background-color: #fff;
        padding: 20px;
        line-height: 30px;
        margin-bottom: 20px;
        overflow: hidden;

        & > div:not(:last-child) {
            margin-right: 10px;
        }

        .btn {
            height: 30px;
            line-height: 30px;
        }
    }

    .charts {
        // padding-top: 20px;
        // margin-top: 20px;
        .chartsCont {
            position: relative;
        }
    }

    .calculating {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        .cont {
            width: 400px;
            height: 90px;
            margin: 100px auto 0;
            padding: 30px;
            background: #fff;
            border: 1px solid #ececea;
            box-sizing: border-box;
            p {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                text-align: center;
            }

            // background: #fff;
        }
    }

    :global {
        .el-select {
            width: 100%;
        }

        .el-col {
            height: 50px;
            overflow: hidden;
        }

        .el-input__icon,
        .el-form-item__label,
        .el-form-item__content {
            line-height: 28px;
        }
    }
}

.downReportDialog {
    width: 500px;

    :global {
        .el-select {
            width: 100%;
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
