<template>
    <div>
        <div :class="$style.root">
            <div :class="$style.title">列车基本参数</div>
            <div :class="$style.formWrap">
                <div>
                    <h4>第一列</h4>
                    <div :class="$style.cont" class="clearfix">
                        <el-form ref="no1Form" :model="no1" label-width="170px">
                            <el-col :span="10">
                                <el-form-item label="车辆数量:" prop="num">
                                    <el-input-number :controls="false" v-model="no1.num" clearable></el-input-number>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="10" :offset="2">
                            <el-form-item label="车辆长度:" prop="length">
                                <el-input v-model="no1.length" clearable></el-input>
                            </el-form-item>
                            </el-col>-->
                            <el-col :span="10" :offset="2">
                                <el-form-item label="速度:" prop="v">
                                    <input-number-wrap suffix="km/h">
                                        <el-input-number
                                            :controls="false"
                                            v-model="no1.v"
                                            clearable
                                        ></el-input-number>
                                    </input-number-wrap>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="单位起动基本阻力:" prop="qdf">
                                    <input-number-wrap suffix="N/k/N">
                                        <el-input-number
                                            :controls="false"
                                            v-model="no1.qdf"
                                            clearable
                                        ></el-input-number>
                                    </input-number-wrap>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="停放制动系数(u):" prop="mu">
                                    <el-input-number :controls="false" v-model="no1.mu" clearable></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="起动基本阻力的作用速度:" prop="vlimit">
                                    <input-number-wrap suffix="km/h">
                                        <el-input-number
                                            :controls="false"
                                            v-model="no1.vlimit"
                                            clearable
                                        ></el-input-number>
                                    </input-number-wrap>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="牵引力特征曲线:">
                                    <Traction
                                        ref="tractionNo1"
                                        parentField="no1"
                                        :saveData="saveTractionData"
                                        type="1"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="单位基本运行阻力(N/kN):">
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="A:">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no1.basicresisA"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="B:">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no1.basicresisB"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                        <el-form-item label="C:">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no1.basicresisC"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </div>
                </div>
                <div>
                    <h4>第二列</h4>
                    <div :class="$style.cont" class="clearfix">
                        <el-form ref="no2Form" :model="no2" label-width="170px">
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="车辆数量:" prop="num">
                                        <el-input-number
                                            :controls="false"
                                            v-model="no2.num"
                                            clearable
                                        ></el-input-number>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="10" :offset="2">
                                <el-form-item label="车辆长度:" prop="length">
                                    <el-input v-model="no2.length" clearable></el-input>
                                </el-form-item>
                                </el-col>-->
                                <el-col :span="10" :offset="2">
                                    <el-form-item label="速度:" prop="v">
                                        <input-number-wrap suffix="km/h">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no2.v"
                                                clearable
                                            ></el-input-number>
                                        </input-number-wrap>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="单位起动基本阻力:" prop="qdf">
                                        <input-number-wrap suffix="N/k/N">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no2.qdf"
                                                clearable
                                            ></el-input-number>
                                        </input-number-wrap>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="2">
                                    <el-form-item label="停放制动系数(u):" prop="mu">
                                        <el-input-number
                                            :controls="false"
                                            v-model="no2.mu"
                                            clearable
                                        ></el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="起动基本阻力的作用速度:" prop="vlimit">
                                        <input-number-wrap suffix="km/h">
                                            <el-input-number
                                                :controls="false"
                                                v-model="no2.vlimit"
                                                clearable
                                            ></el-input-number>
                                        </input-number-wrap>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="2">
                                    <el-form-item label="牵引力特征曲线:">
                                        <Traction
                                            ref="tractionNo2"
                                            parentField="no2"
                                            :saveData="saveTractionData"
                                            type="2"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="单位基本运行阻力(N/kN):">
                                        <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                            <el-form-item label="A:">
                                                <el-input-number
                                                    :controls="false"
                                                    v-model="no2.basicresisA"
                                                />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                            <el-form-item label="B:">
                                                <el-input-number
                                                    :controls="false"
                                                    v-model="no2.basicresisB"
                                                />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" :offset="1" :class="$style.basicReLabel">
                                            <el-form-item label="C:">
                                                <el-input-number
                                                    :controls="false"
                                                    v-model="no2.basicresisC"
                                                />
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <el-row>
                    <el-col :span="20" :class="$style.btnWrap">
                        <el-button
                            :class="$style.subBtn"
                            class="btn-xl"
                            type="primary"
                            @click="submitForm"
                        >保存</el-button>
                        <el-button class="btn-xl" @click="resetForm">清空</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div :class="$style.sketchWrap" v-if="showSketch">
            <Legend />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

// import _util from "utils/util";
import msgCenter from "utils/msgCenter";
import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import { model } from "api";

import Traction from "./Traction";

import Legend from "../../Open/Legend";

// 自定义验证规则
// const rules = {
//     num: { max: 18, isInt: true, min: 2 },
//     length: {},
//     v: {},
//     mu: {},
//     vlimit: {},
//     qdf: {}
// };

// const validateField = (rule, value, cb) => {
//     let result = _util.validateNum(value, rules[rule.field]);
//     if (result) {
//         cb(new Error(result));
//     }
//     cb();
// };

export default {
    name: "BasicInfo",
    components: {
        Traction,
        Legend
    },
    data() {
        /**
         * 当将两列车当数据放到一个formData中时，ele当校验规则会失效
         */
        return {
            no1: {},
            no2: {},

            showSketch: false

            // rules: {
            //     num: [{ validator: validateField, trigger: "blur" }],
            //     length: [{ validator: validateField, trigger: "blur" }],
            //     speed: [{ validator: validateField, trigger: "blur" }],
            //     brakes: [{ validator: validateField, trigger: "blur" }],
            //     startResistance: [
            //         { validator: validateField, trigger: "blur" }
            //     ],
            //     speed2: [{ validator: validateField, trigger: "blur" }],
            //     basicRe: [{ validator: validateField, trigger: "blur" }]
            // }
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        ...mapActions("models", ["getModelData"]),

        initData() {
            model.getVehicleBasic({ modelId: this.curModelId }).then(res => {
                if (!res) return;

                let { data = {} } = res;
                this.initDataCb(data);
                // const no1 = data.ve1 || {};
                // const no2 = data.ve2 || {};

                // this.no1 = no1;
                // this.no2 = no2;

                // this.cacheNo1 = { ...no1 };
                // this.cacheNo2 = { ...no2 };
            });
        },

        initDataCb(data = {}) {
            const no1 = data.ve1 || {};
            const no2 = data.ve2 || {};

            this.showSketch = no1.num || no2.num;

            this.no1 = no1;
            this.no2 = no2;

            this.cacheNo1 = { ...no1 };
            this.cacheNo2 = { ...no2 };
        },

        /**
         * 保存模型数据
         */
        submitForm(params) {
            Promise.all([
                this.$refs.no1Form.validate(),
                this.$refs.no2Form.validate()
            ])
                .then(([val1, val2]) => {
                    if (val1 && val2) {
                        this.saveDataToServe(params);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        saveChildCompData() {
            return Promise.all([
                this.$refs.tractionNo1.saveDataToServe(),
                this.$refs.tractionNo2.saveDataToServe()
            ]);
        },

        async saveDataToServe(params = {}) {
            // const childSaveResult = await this.saveChildCompData();
            // if (
            //     childSaveResult[0].code !== "200" ||
            //     childSaveResult[1].code !== "200"
            // ) {
            //     return;
            // }

            await this.saveChildCompData();

            model
                .vehicleBasicEdit({
                    ve1Info: {
                        num: 0,
                        ...this.no1,
                        modelId: this.curModelId
                    },
                    ve2Info: {
                        num: 0,
                        ...this.no2,
                        modelId: this.curModelId
                    }
                })
                .then(res => {
                    if (!res) return;
                    let { data = {} } = res;

                    this.no1 = { ...this.no1, id: data.v1Id };
                    this.no2 = { ...this.no2, id: data.v2Id };

                    this.showSketch = this.no1.num || this.no2.num;

                    // 基本参数变更以后，更新treeData
                    this.getModelData({
                        id: this.curModelId,
                        cb: () => {
                            this.$message.success("保存成功");
                            typeof params.success === "function" &&
                                params.success();
                        }
                    });
                });
        },

        /**
         * 取消输入
         */
        resetForm: function() {
            let initData = {
                ve1: { id: this.no1.id },
                ve2: { id: this.no2.id }
            };
            this.initDataCb(initData);

            this.$refs.tractionNo1.clearData();
            this.$refs.tractionNo2.clearData();
        },

        saveTractionData(params) {
            let { field = "", data = {} } = params;
            if (field) this[field]["traction"] = data;
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
    // width: 100%;
    // height: 100%;
    padding: 20px 30px;
    background: #fff;
    border-radius: $raduis_1;

    .title {
        text-align: center;
        font-size: 18px;
        padding: 20px 0;
    }

    .formWrap {
        h4 {
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
    .btnWrap {
        text-align: center;
        .subBtn {
            margin-right: 30px;
        }
    }

    .basicReLabel {
        :global {
            .el-form-item__label {
                width: 20px !important;
            }
            .el-form-item__content {
                margin-left: 20px !important;
            }
            .el-input__inner {
                padding: 0 5px !important;
            }
        }
    }
}

.sketchWrap {
    background: #fff;
    margin-top: 20px;
    padding: 30px 20px;
}
</style>
