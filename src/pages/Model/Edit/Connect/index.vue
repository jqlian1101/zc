<template>
    <div>
        <div :class="$style.root">
            <div :class="$style.title">{{curTreeNodeInfo.name}}</div>
            <!-- <div :class="$style.fileBtn">
            <el-button class="btn-default">文件</el-button>
            </div>-->
            <el-row :class="$style.content" class="clearfix">
                <el-col :class="$style.front" :span="10">
                    <div :class="$style.title">前端面</div>
                    <el-form ref="frontForm" label-width="120px">
                        <el-form-item label="缓冲器:">
                            <Buffer
                                title="前端面-缓冲器"
                                eleKey="hcq"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.hcq })"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="橡胶轴承:">
                            <RubberBearing
                                title="前端面-橡胶轴承"
                                eleKey="xjzc"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.xjzc})"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="压溃管:">
                            <Foldedcollapse
                                title="前端面-压溃管"
                                eleKey="ykg"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.ykg})"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="过载保护:">
                            <OverloadProtection
                                title="前端面-过载保护"
                                eleKey="gzbh"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.gzbh})"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="防爬器:">
                            <Anticreeper
                                title="前端面-防爬器"
                                eleKey="fpq"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.fpq})"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="车间减振器:">
                            <Damper
                                ref="damper1"
                                title="前端面-车间减振器"
                                eleKey="cjjz"
                                eleParentType="front"
                                :type="1"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.cjjz})"
                                :dataSource="{jzqNum: frontData.jzqNum, tcsdId: frontData.jzqTcsdId}"
                            />
                        </el-form-item>
                        <el-form-item label="风挡系统:">
                            <Windshield
                                title="前端面-风挡系统"
                                eleKey="fd"
                                eleParentType="front"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.fd})"
                                :dataSource="frontData"
                            />
                        </el-form-item>
                        <el-form-item label="用户自定义:">
                            <Diy
                                ref="diy11"
                                title="前端面-用户自定义"
                                eleKey="diy1"
                                eleParentType="front"
                                field="diy1"
                                :type="2"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.diy1})"
                                :dataSource="frontData.diy1"
                                :showCharts="true"
                            />
                        </el-form-item>
                        <el-form-item label="用户自定义:">
                            <Diy
                                ref="diy12"
                                title="前端面-用户自定义"
                                eleKey="diy2"
                                eleParentType="front"
                                field="diy2"
                                :type="3"
                                :saveData="(params)=>saveDropDownData({...params,parent:'frontData', ele:eleDict.diy2})"
                                :dataSource="frontData.diy2"
                                :showCharts="true"
                            />
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="2" :offset="1" :class="$style.copyArea">
                    <div>复制区</div>
                    <div class="clearfix" :class="$style.imgWrap">
                        <img class="fll" :src="Img['copyLeft']" alt @click="copyItem('left')" />
                        <img class="flr" :src="Img['copyRight']" alt @click="copyItem('right')" />
                    </div>
                </el-col>
                <el-col :class="$style.back" :span="10" :offset="1">
                    <div :class="$style.title">后端面</div>
                    <el-form ref="frontForm" :model="backData" label-width="120px">
                        <el-form-item label="缓冲器:">
                            <Buffer
                                title="后端面-缓冲器"
                                eleKey="hcq"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.hcq})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="橡胶轴承:">
                            <RubberBearing
                                title="后端面-橡胶轴承"
                                eleKey="xjzc"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.xjzc})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="压溃管:">
                            <Foldedcollapse
                                title="后端面-压溃管"
                                eleKey="ykg"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.ykg})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="过载保护:">
                            <OverloadProtection
                                title="后端面-过载保护"
                                eleKey="gzbh"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.gzbh})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="防爬器:">
                            <Anticreeper
                                title="后端面-防爬器"
                                eleKey="fpq"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.fpq})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="车间减振器:">
                            <Damper
                                ref="damper2"
                                title="后端面-车间减振器"
                                eleKey="cjjz"
                                eleParentType="back"
                                :type="1"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.cjjz})"
                                :dataSource="{jzqNum: backData.jzqNum, tcsdId: backData.jzqTcsdId}"
                            />
                        </el-form-item>
                        <el-form-item label="风挡系统:">
                            <Windshield
                                title="后端面-风挡系统"
                                eleKey="fd"
                                eleParentType="back"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.fd})"
                                :dataSource="backData"
                            />
                        </el-form-item>
                        <el-form-item label="用户自定义:">
                            <Diy
                                ref="diy21"
                                title="后端面-用户自定义"
                                eleKey="diy1"
                                eleParentType="back"
                                field="diy1"
                                :type="2"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.diy1})"
                                :dataSource="backData.diy1"
                                :showCharts="true"
                            />
                        </el-form-item>
                        <el-form-item label="用户自定义:">
                            <Diy
                                ref="diy22"
                                title="后端面-用户自定义"
                                eleKey="diy2"
                                eleParentType="back"
                                field="diy2"
                                :type="3"
                                :saveData="(params)=>saveDropDownData({...params,parent:'backData', ele:eleDict.diy2})"
                                :dataSource="backData.diy2"
                                :showCharts="true"
                            />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :class="$style.btnWrap">
                    <el-select :class="$style.copySel" v-model="copySource" placeholder="请选择">
                        <el-option
                            v-for="item in trainList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.id === curTreeNodeId"
                        ></el-option>
                    </el-select>
                    <el-button class="btn-xl" :class="$style.copyBtn" @click="copyCar">复制</el-button>
                    <!-- <el-button
                    :class="$style.subBtn"
                    class="btn-xl"
                    type="primary"
                    @click="submitForm()"
                    >保存</el-button>-->
                    <el-button class="btn-xl" @click="clearData">清空</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- <div :class="$style.sketchWrap">
            <Legend />
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import Img from "assets/images";
import {
    MODEL_TREE_TYPE,
    CONNECT_ELE_DICT,
    CONNECT_ELE_FIELD_DICT,
    // CAR_ELE_DICT,
    GLOBAL_MSG_CENTER_TOKEN
} from "common/constants";
import msgCenter from "utils/msgCenter";

// import { filterJson } from "utils/util";
import { model } from "api";
import resetChartTypeMixin from "common/resetChartTypeMixin";

import Foldedcollapse from "./FoldedCollapse";

import Diy from "./Diy";
import Buffer from "./Buffer";
import RubberBearing from "./RubberBearing";
import Damper from "./Damper";
import Anticreeper from "./Anticreeper";
import OverloadProtection from "./OverloadProtection";
import Windshield from "./Windshield";

// import Legend from "../../Open/Legend";

export default {
    name: "Connect",
    mixins: [resetChartTypeMixin],
    components: {
        RubberBearing,
        Foldedcollapse,
        Damper,
        Anticreeper,
        OverloadProtection,
        Windshield,
        Diy,
        Buffer
    },
    data() {
        return {
            frontData: {},
            backData: {},
            copySource: null,
            Img,
            eleDict: CONNECT_ELE_DICT
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId", "curTreeNodeId"]),
        ...mapGetters("models", [
            "getTreeNodeByType",
            "curTreeNodeInfo",
            "getTreeNodeById",
            "curCarNum"
        ]),

        trainList() {
            return this.getTreeNodeByType(MODEL_TREE_TYPE.connect);
        },
        carNameStr() {
            let { curCarNum } = this;
            if (!this.curCarNum) return "";
            return `${curCarNum.row}-${curCarNum.cal}`;
        }
    },
    methods: {
        // ...mapActions("uiState", ["saveDefinedConnect"]),

        // 获取页面数据
        async initData(carNameStr, cb) {
            carNameStr = carNameStr || this.carNameStr;
            if (!carNameStr) return;

            const res = await this.getCarData(carNameStr);

            let { data = [] } = res;
            let front = data.find(item => item.faceType === "1") || {};
            let back = data.find(item => item.faceType === "2") || {};

            this.frontData = {
                ...front,
                diy1: { xType: front.diy1X, tcsdId: front.diy1TcsdId },
                diy2: { xType: front.diy2X, tcsdId: front.diy2TcsdId }
            };
            this.backData = {
                ...back,
                diy1: { xType: back.diy1X, tcsdId: back.diy1TcsdId },
                diy2: { xType: back.diy2X, tcsdId: back.diy2TcsdId }
            };

            this.cacheFrontData = { ...front };
            this.cacheBackData = { ...back };

            typeof cb === "function" && cb();

            // model
            //     .getAllCoupTypeByModelId({
            //         modelId: this.curModelId,
            //         carNum: carNameStr
            //     })
            //     .then(res => {
            //         if (!res) return;
            //     });
        },

        getCarData(carNameStr, cb) {
            return model.getAllCoupTypeByModelId({
                modelId: this.curModelId,
                carNum: carNameStr
            });
            // .then(res => {
            //     if (!res) return;
            //     cb(res);
            // });
        },

        // 复制端
        copyItem(item) {
            if (item === "left") {
                this.frontData = {
                    ...this.backData,
                    id: this.frontData.id,
                    faceType: this.frontData.id,
                    modelId: this.frontData.modelId,
                    carNum: this.frontData.carNum
                };
            } else {
                this.backData = {
                    ...this.frontData,
                    id: this.backData.id,
                    faceType: this.backData.id,
                    modelId: this.backData.modelId,
                    carNum: this.backData.carNum
                };
            }
            this.$message("操作成功");
        },

        // 复制 其他车辆
        async copyCar() {
            if (!this.copySource) {
                this.$message("请先选择车辆");
                return;
            }

            let sourceInfo = this.getTreeNodeById(this.copySource);

            let { row, cal } = sourceInfo;
            if (!row || !cal) return null;

            // this.submitForm({
            //     saveCb:()=>{
            //     }
            // })

            this.submitForm({
                carNum: `${row}-${cal}`,
                saveCb: () => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                }
            });

            // this.initData(`${row}-${cal}`, () => {
            //     this.$message({
            //         message: "操作成功",
            //         type: "success"
            //     });
            // });
        },

        // 保存下拉框的数据
        saveDropDownData(params) {
            let { datas, parent, ele } = params;
            const { xType, tcsdId } = datas;

            if (ele === "diy1" || ele === "diy2") {
                let otherP = parent === "frontData" ? "backData" : "frontData";

                this[parent][ele] = { ...datas };
                this[parent][`${ele}X`] = xType;
                this[parent][`${ele}TcsdId`] = tcsdId;

                if (tcsdId === this[otherP][`${ele}TcsdId`]) {
                    this[otherP][ele] = { ...datas };
                    this[otherP][`${ele}X`] = xType;
                    this[otherP][`${ele}TcsdId`] = tcsdId;
                }
            } else {
                this[parent] = { ...this[parent], ...datas };
                CONNECT_ELE_FIELD_DICT[ele].map(item => {
                    if (datas[item] !== 0 && !datas[item]) {
                        delete this[parent][item];
                    }
                });
            }

            // // 保存已定义的元件列表，图形显示使用
            // let faceType = CAR_ELE_DICT.back.key;
            // if (parent === "frontData") {
            //     faceType = CAR_ELE_DICT.front.key;
            // }

            // this.saveDefinedConnect({
            //     id: this.carNameStr,
            //     type: faceType,
            //     eleType: ele
            // });
        },

        /**
         * 保存模型数据
         * 复制时，传入carNum和cb
         */
        async submitForm(args = {}) {
            let { carNum, saveCb, success } = args;

            let { front: nullF, back: nullB } = this.getNullData();

            let frontData = { id: "", ...nullF, ...this.frontData };
            let backData = { id: "", ...nullB, ...this.backData };

            if (!this.carNameStr) {
                this.$message({
                    message: "数据错误",
                    type: "error"
                });
                return;
            }

            Object.assign(frontData, {
                modelId: this.curModelId,
                faceType: 1,
                carNum: this.carNameStr
            });

            Object.assign(backData, {
                modelId: this.curModelId,
                faceType: 2,
                carNum: this.carNameStr
            });

            // TODO 复制
            if (carNum) {
                const res = await this.getCarData(carNum);
                let { data = [] } = res;
                let targetFront =
                    data.find(item => item.faceType === "1") || {};
                let targetBack = data.find(item => item.faceType === "2") || {};

                frontData = {
                    ...frontData,
                    carNum,
                    id: targetFront.id || ""
                };
                backData = {
                    ...backData,
                    carNum,
                    id: targetBack.id || ""
                };
            }

            let params = {
                allCoupTypeArr: [{ ...frontData }, { ...backData }]
            };

            model.saveAllCoupType(params).then(res => {
                if (!res) return;

                // TODO 复制
                if (saveCb && typeof saveCb === "function") {
                    return saveCb(res);
                }

                this.frontData = { ...frontData, id: res.data["1"] };
                this.backData = { ...backData, id: res.data["2"] };

                this.$message({
                    message: "保存成功",
                    type: "success"
                });

                typeof success === "function" && success();
            });
        },

        getNullData() {
            let front = {};
            let back = {};

            for (let i in CONNECT_ELE_FIELD_DICT) {
                CONNECT_ELE_FIELD_DICT[i].map(item => {
                    front[item] = "";
                    back[item] = "";
                });
            }
            return { front, back };
        },

        /**
         * 取消输入
         */
        clearData: function() {
            const { frontData, backData } = this;

            let { front: newF, back: newB } = this.getNullData();

            // let newF = {};
            // let newB = {};

            // for (let i in CONNECT_ELE_FIELD_DICT) {
            //     CONNECT_ELE_FIELD_DICT[i].map(item => {
            //         newF[item] = "";
            //         newB[item] = "";
            //     });
            // }

            this.frontData = {
                id: frontData.id,
                carNum: frontData.carNum,
                faceType: frontData.faceType,
                modelId: frontData.modelId,
                diy1: {},
                diy2: {},
                ...newF
            };
            this.backData = {
                id: backData.id,
                carNum: backData.carNum,
                faceType: backData.faceType,
                modelId: backData.modelId,
                diy1: {},
                diy2: {},
                ...newB
            };
            this.$refs.diy11.clearData();
            this.$refs.diy12.clearData();
            this.$refs.diy21.clearData();
            this.$refs.diy22.clearData();
            this.$refs.damper1.clearData();
            this.$refs.damper2.clearData();
        }
    },

    mounted() {
        this.initData();
        this.subToken = msgCenter.subscribe(
            GLOBAL_MSG_CENTER_TOKEN.auto_save,
            (topic, data) => {
                this.submitForm({ success: data.success });
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
    padding: 20px 30px;
    background: #fff;
    border-radius: $raduis_1;

    .title {
        text-align: center;
        font-size: 18px;
        padding-top: 20px;
    }

    .fileBtn {
        margin-bottom: 50px;
    }

    .content {
        font-size: 14px;
        .title {
            font-size: 16px;
            margin-bottom: 24px;
            font-weight: 500;
        }
    }

    .copyArea {
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        padding-top: 300px;
        .imgWrap {
            width: 100%;
            height: 64px;
            cursor: pointer;
            img {
                width: 50%;
                height: 100%;
            }
        }
    }

    .copyBtn {
        margin-right: 52px;
    }

    .btnWrap {
        text-align: center;
        .subBtn {
            margin-right: 30px;
        }
    }

    .copySel {
        margin-right: 10px;
        :global {
            .el-input__inner,
            .el-select-dropdown__item {
                height: 22px;
                line-height: 22px;
                font-size: 12px;
            }

            .el-input__icon {
                line-height: 22px;
            }
        }
    }

    :global {
        .el-form-item__label {
            text-align: center;
        }
    }
}

.sketchWrap {
    background: #fff;
    margin-top: 20px;
    padding: 30px 20px;
}
</style>
