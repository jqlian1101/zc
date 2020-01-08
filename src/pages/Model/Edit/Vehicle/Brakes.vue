<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :resetData="clearData"
        :title="$attrs.title || ''"
        :isHaveData="isHaveData"
    >
        <div :class="$style.root">
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.brakedef===1"
                    :label="1"
                    @change="()=>onCheckboxChange(1)"
                >特征曲线定义</el-checkbox>
                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="制动力">
                        <input-number-wrap suffix="N" :disabled="formData.brakedef!==1">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.brakedef!==1"
                                v-model="formData.brakef"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="空走时间">
                        <input-number-wrap suffix="s" :disabled="formData.brakedef!==1">
                            <el-input-number
                                :disabled="formData.brakedef!==1"
                                :controls="false"
                                v-model="formData.delayTime"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="制动力加载时间">
                        <input-number-wrap suffix="s" :disabled="formData.brakedef!==1">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.brakedef!==1"
                                v-model="formData.loadTime"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.brakedef===2"
                    :label="2"
                    @change="()=>onCheckboxChange(2)"
                >制动力用户自定义</el-checkbox>
                <Diy
                    ref="diy"
                    title="制动力用户自定义"
                    field="tcsdId"
                    :saveData="saveDiyData"
                    :disabled="formData.brakedef!==2"
                    :class="$style.diyDown"
                    :type="6"
                    :dataSource="diyDataSource"
                />
            </el-row>
            <el-row class="listWrap" :class="$style.wgWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.brakedef===3"
                    :label="3"
                    @change="()=>onCheckboxChange(3)"
                >制动控制力定义</el-checkbox>
                <div :class="$style.curveInfo">
                    <el-form
                        class="clearfix"
                        :class="$style.form"
                        ref="form"
                        label-position="left"
                        :model="formData"
                        label-width="120px"
                    >
                        <el-form-item label>
                            <el-select
                                v-model="formData.definition"
                                placeholder="请选择"
                                :disabled="formData.brakedef!==3"
                            >
                                <el-option
                                    v-for="item in WGList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { mapState } from "vuex";
import DropDown from "components/DropDown.vue";

import { carArg } from "api";

import Diy from "./Diy";
import watchHaveDataMixin from "common/watchHaveDataMixin";

const FIELD_LIST = ["brakedef", "brakef", "delayTime", "loadTime", "tcsdId"];

const WGList = [
    { id: "1", name: "制动控制程序1" },
    { id: "2", name: "制动控制程序2" },
    { id: "3", name: "制动控制程序3" },
    { id: "4", name: "制动控制程序4" },
    { id: "5", name: "制动控制程序5" },
    { id: "6", name: "制动控制程序6" },
    { id: "7", name: "制动控制程序7" },
    { id: "8", name: "制动控制程序8" },
    { id: "9", name: "制动控制程序9" },
    { id: "10", name: "制动控制程序10" }
];

export default {
    name: "VehicleBrakes",
    data() {
        return {
            formData: {},
            diyDataSource: {},
            isHaveData: false,
            WGList
        };
    },
    mixins: [watchHaveDataMixin],
    components: {
        DropDown,
        Diy
    },
    props: {},
    computed: {
        ...mapState("models", ["curTreeNodeId"])
    },
    methods: {
        // setHaveDataStatus(data = {}) {
        //     this.isHaveData = false;
        //     for (let i = 0; i < FIELD_LIST.length; i++) {
        //         if (data[FIELD_LIST[i]]) {
        //             this.isHaveData = true;
        //             return;
        //         }
        //     }
        // },
        initData() {
            carArg.brakesView({ caId: this.curTreeNodeId }).then(res => {
                if (!res) return;
                let data = res.data || {};
                let diyData = data.tcsd || {};

                this.setHaveDataStatus(data);

                this.formData = { brakedef: "", ...data };
                this.cacheData = { brakedef: "", ...data };

                this.diyDataSource = { ...diyData, tcsdId: diyData.id };
            });
        },

        onCheckboxChange(value) {
            if (this.formData.brakedef === value) {
                this.formData.brakedef = "";
                // delete this.formData.brakedef;
                return;
            }
            this.formData.brakedef = value;
        },

        clearData() {
            const { id, caId, modelId } = this.formData;

            this.formData = { id, caId, modelId, brakedef: "" };
            this.diyDataSource = {};

            this.setHaveDataStatus(this.formData);

            this.$refs.diy && this.$refs.diy.clearData();
        },

        // 保存数据
        save() {
            return new Promise(resolve => {
                const params = this.getSaveParams();
                this.setHaveDataStatus(params);
                resolve(true);
                // carArg.brakesEdit({ ...params }).then(res => {
                //     if (!res) {
                //         resolve(false);
                //         return;
                //     }
                //     this.$message({
                //         message: "操作成功",
                //         type: "success"
                //     });

                //     this.isHaveData = false;
                //     for (let i in params) {
                //         if (params[i]) {
                //             this.isHaveData = true;
                //             break;
                //         }
                //     }

                //     resolve(true);
                // });
            });
        },

        saveDiyData(params) {
            let { field, data } = params;
            this.formData[field] = data.tcsdId;
        },

        setHaveDataStatus(params = {}) {
            this.isHaveData = false;
            for (let i in params) {
                if (i === "id" || i === "modelId" || i === "caId") continue;
                if (params[i]) {
                    this.isHaveData = true;
                    break;
                }
            }
        },

        getSaveParams() {
            let { formData } = this;

            let params = {};
            for (let i in formData) {
                if (formData[i] === 0 || formData[i]) {
                    params[i] = formData[i];
                }
            }

            FIELD_LIST.map(item => {
                params[item] !== 0 && !params[item] && (params[item] = "");
            });

            return params;
        },

        saveDataToServe() {
            const params = this.getSaveParams();
            delete params.tcsd;
            return carArg.brakesEdit({ ...params });
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .form {
        margin-left: 22px;
    }

    .wgWrap {
        :global {
            .el-form-item,
            .el-select {
                width: 100%;
            }
        }
    }
}

.diyDown {
    padding-left: 144px;
    width: 100%;
}
</style>
