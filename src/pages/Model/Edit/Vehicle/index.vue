<template>
    <div>
        <div :class="$style.root">
            <div :class="$style.title">{{curTreeNodeInfo.name}}</div>
            <div :class="$style.formWrap" class="clearfix">
                <el-form ref="vehicleForm" :key="formKey" :model="formData" label-width="120px">
                    <el-col :span="10">
                        <el-form-item label="车辆质量:" prop="m">
                            <input-number-wrap suffix="kg">
                                <el-input-number :controls="false" v-model="formData.m" clearable></el-input-number>
                            </input-number-wrap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="车辆长度:" prop="l">
                            <input-number-wrap suffix="m">
                                <el-input-number
                                    :controls="false"
                                    v-model="formData.length"
                                    clearable
                                ></el-input-number>
                            </input-number-wrap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="车体刚度:" prop="kcar">
                            <input-number-wrap suffix="N/m">
                                <el-input-number
                                    :controls="false"
                                    v-model="formData.kcar"
                                    clearable
                                ></el-input-number>
                            </input-number-wrap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="牵引系统:">
                            <Traction ref="traction" title="牵引力系统" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="车体强度:" prop="qcar">
                            <el-input-number :controls="false" v-model="formData.qcar" clearable></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="制动系统:">
                            <Brakes ref="brakes" title="制动力系统" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户自定义1:">
                            <Diy
                                ref="diy1"
                                title="用户自定义1"
                                field="diy1Tcsd"
                                :showCharts="true"
                                :saveData="(params)=>onSaveDiyData({...params, type:'diy1'})"
                                :dataSource="{tcsdId: diyData.diy1Tcsd}"
                                :type="7"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="用户自定义2:">
                            <Diy
                                ref="diy2"
                                title="用户自定义2"
                                field="diy2Tcsd"
                                :showCharts="true"
                                :saveData="(params)=>onSaveDiyData({...params, type:'diy2'})"
                                :dataSource="{tcsdId: diyData.diy2Tcsd}"
                                :type="8"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="用户自定义3:">
                            <Diy
                                ref="diy3"
                                title="用户自定义3"
                                field="diy3Tcsd"
                                :showCharts="true"
                                :saveData="(params)=>onSaveDiyData({...params, type:'diy3'})"
                                :dataSource="{tcsdId: diyData.diy3Tcsd}"
                                :type="9"
                            />
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <el-row>
                <el-col :span="20" :class="$style.btnWrap">
                    <el-select :class="$style.copySel" v-model="copySource" placeholder="请选择">
                        <el-option
                            v-for="item in trainList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.id === formData.id"
                        ></el-option>
                    </el-select>
                    <el-button class="btn-xl" :class="$style.copyBtn" @click="copyCar">复制</el-button>

                    <!-- <el-button
                    :class="$style.subBtn"
                    class="btn-xl"
                    type="primary"
                    @click="submitForm"
                    >保存</el-button>-->
                    <el-button class="btn-xl" @click="clearData">清空</el-button>
                </el-col>
            </el-row>
        </div>
        <div :class="$style.sketchWrap">
            <Legend />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import _util from "utils/util";
import { MODEL_TREE_TYPE, GLOBAL_MSG_CENTER_TOKEN } from "common/constants";
import msgCenter from "utils/msgCenter";

import { carArg } from "api";

import Traction from "./Traction";
import Brakes from "./Brakes";
import Diy from "./Diy";
// import Traction from "./Traction";

import Legend from "../../Open/Legend";

// 自定义验证规则
// const rules = {
//     // mass: { max: 10, isInt: true, min: 2 },
//     m: {},
//     kcar: {},
//     qcar: {}
// };

// const validateField = _util.validateField(rules);

const FIELD_LIST = ["m", "m", "kcar", "qcar", "length", "l"];
const FIELD_LIST_DIY = [
    "diy1",
    "diy1Tcsd",
    "diy2",
    "diy2Tcsd",
    "diy3",
    "diy3Tcsd"
];

export default {
    name: "Vehicle",
    components: {
        Traction,
        Brakes,
        Diy,
        Legend
    },
    data() {
        return {
            formData: {},
            diyData: {},

            formKey: _util.randomString("vehicleForm_"),

            copySource: null
            // rules: {
            //     m: [{ validator: validateField, trigger: "change" }],
            //     kcar: [{ validator: validateField, trigger: "change" }],
            //     qcar: [{ validator: validateField, trigger: "change" }]
            // }
        };
    },
    props: {},
    computed: {
        ...mapGetters("models", ["getTreeNodeByType", "curTreeNodeInfo"]),

        trainList() {
            const list = this.getTreeNodeByType(MODEL_TREE_TYPE.vehicle) || [];
            let trainList = [{ id: "all", name: "所有车辆" }, ...list];
            return trainList;
        }
    },
    methods: {
        initData() {
            let { initPageData, initDiyData } = this;
            return Promise.all([initPageData(), initDiyData()]);
        },
        initPageData(cb) {
            let { id } = this.curTreeNodeInfo || {};
            if (!id) return;

            return carArg.vehicleView({ id }).then(res => {
                if (!res) return;
                const data = res.data || {};

                this.formData = { ...data };
                this.cacheFromData = { ...data };
            });
        },

        initDiyData() {
            let { id } = this.curTreeNodeInfo || {};
            if (!id) return;
            return carArg.diyView({ caId: id }).then(res => {
                if (!res) return;

                const data = res.data || {};

                this.diyData = { ...data };
                this.cacheDiyData = { ...data };
            });
        },

        // 点击复制按钮
        copyCar() {
            if (!this.copySource) {
                this.$message("请先选择车辆");
                return;
            }

            // 获取复制源的基本信息
            let sourceInfo = this.trainList.find(
                item => item.id === this.copySource
            );

            if (!sourceInfo) return;

            this.$confirm(
                `确认将“${this.curTreeNodeInfo.name}”的所有数据复制到“${sourceInfo.name}”吗？`,
                "",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    this.sureCopy(sourceInfo);
                })
                .catch(() => {});
        },

        sureCopy(sourceInfo) {
            // let { row, cal, id, name } = sourceInfo;
            let { row, cal, id } = sourceInfo;

            // 默认复制全部
            // let carNums = "";

            let params = { id: this.curTreeNodeInfo.id };
            if (id !== "all") params.carNums = `${row}-${cal}`;

            carArg.vehicleCopy({ ...params }).then(res => {
                if (!res) return;

                this.formKey = _util.randomString("vehicleForm_");

                this.initData().then(resArr => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                });
            });
        },

        // 保存用户自定义数据
        onSaveDiyData(params) {
            let { field, data, type } = params;
            this.diyData[field] = data.tcsdId;
            this.diyData[type] = 1;
        },

        /**
         * 保存模型数据
         */
        submitForm(params) {
            this.$refs.vehicleForm.validate(vali => {
                if (!vali) return;
                this.saveData(params);
            });
        },

        // saveChildCompData(){
        //     return Promise.all([
        //         this.$refs.traction.saveDataToServe(),
        //         this.$refs.brakes.saveDataToServe(),
        //     ])
        // },

        saveData(params = {}) {
            let diyData = { ...this.diyData };
            delete diyData.diy1TcsdData;
            delete diyData.diy2TcsdData;
            delete diyData.diy3TcsdData;

            const veParams = {
                ...this.formData,
                l: this.formData.length,
                length: this.formData.length
            };

            const diyParams = { ...this.diyData };

            FIELD_LIST.map(item => {
                veParams[item] !== 0 &&
                    !veParams[item] &&
                    (veParams[item] = "");
            });

            FIELD_LIST_DIY.map(item => {
                diyParams[item] !== 0 &&
                    !diyParams[item] &&
                    (diyParams[item] = "");
            });

            Promise.all([
                this.$refs.traction.saveDataToServe(),
                this.$refs.brakes.saveDataToServe(),
                carArg.vehicleEdit(veParams),
                carArg.diySave(diyParams)
            ]).then(res => {
                if (!res[0] || !res[1]) return;

                this.$message({
                    message: "保存成功",
                    type: "success"
                });

                typeof params.success && params.success();
            });
        },

        /**
         * 取消输入
         */
        clearData: function() {
            const { id, modelId, carNum } = this.formData;

            this.formData = { id, modelId, carNum };
            this.diyData = {
                id: this.diyData.id,
                modelId: this.diyData.modelId,
                caId: this.diyData.caId
            };

            this.$refs.traction.clearData();
            this.$refs.brakes.clearData();
            this.$refs.diy1.clearData();
            this.$refs.diy2.clearData();
            this.$refs.diy3.clearData();
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
        margin-bottom: 30px;
    }

    .fileBtn {
        margin-bottom: 50px;
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
}

.sketchWrap {
    background: #fff;
    margin-top: 20px;
    padding: 30px 20px;
}
</style>
