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
                    :value="formData.tracdef===1"
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
                    <el-form-item label="牵引电机数量">
                        <el-input-number
                            :controls="false"
                            :disabled="formData.tracdef!==1"
                            v-model="formData.emNum"
                            :min="0"
                        ></el-input-number>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.tracdef===2"
                    :label="2"
                    @change="()=>onCheckboxChange(2)"
                >牵引力参数设置</el-checkbox>

                <el-form
                    ref="form"
                    :class="$style.form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="牵引力">
                        <input-number-wrap suffix="N" :disabled="formData.tracdef!==2">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.tracdef!==2"
                                v-model="formData.tracf"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="延迟时间">
                        <input-number-wrap suffix="s" :disabled="formData.tracdef!==2">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.tracdef!==2"
                                v-model="formData.delayTime"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="牵引力加载时间">
                        <input-number-wrap suffix="s" :disabled="formData.tracdef!==2">
                            <el-input-number
                                :controls="false"
                                v-model="formData.loadTime"
                                :disabled="formData.tracdef!==2"
                                :min="0"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.tracdef===3"
                    :label="3"
                    @change="()=>onCheckboxChange(3)"
                >牵引力用户自定义</el-checkbox>
                <Diy
                    ref="diy"
                    title="牵引力用户自定义"
                    field="tcsdId"
                    :saveData="saveDiyData"
                    :disabled="formData.tracdef!==3"
                    :class="$style.diyDown"
                    :type="5"
                    :dataSource="diyDataSource"
                />
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { mapState } from "vuex";

import DropDown from "components/DropDown.vue";
import { carArg } from "api";

import Diy from "./Diy";

const FIELD_LIST = [
    "tracdef",
    "emNum",
    "tracf",
    "delayTime",
    "loadTime",
    "tcsdId"
];

export default {
    name: "VehicleTraction",
    data() {
        return {
            formData: {},
            diyDataSource: {},
            isHaveData: false
        };
    },
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
            carArg.tractionView({ caId: this.curTreeNodeId }).then(res => {
                if (!res) return;

                let data = res.data || {};
                let diyData = data.tcsd || {};

                // if (data && JSON.stringify(data) !== "{}") {
                //     this.isHaveData = true;
                // }
                this.setHaveDataStatus(data);

                this.formData = { tracdef: "", ...data };
                this.cacheData = { tracdef: "", ...data };
                this.diyDataSource = { ...diyData, tcsdId: diyData.id };
            });
        },

        clearData() {
            const { id, caId, modelId } = this.formData;
            this.formData = { id, caId, modelId, tracdef: "" };
            this.diyDataSource = {};

            this.setHaveDataStatus(this.formData);

            this.$refs.diy && this.$refs.diy.clearData();
        },

        onCheckboxChange(value) {
            if (this.formData.tracdef === value) {
                this.formData.tracdef = "";
                // delete this.formData.tracdef;
                return;
            }
            this.formData.tracdef = value;
        },

        // 保存数据
        save() {
            return new Promise(resolve => {
                const params = this.getSaveParams();
                this.setHaveDataStatus(params);
                resolve(true);
                // carArg.tractionEdit({ ...params }).then(res => {
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
            return carArg.tractionEdit({ ...params });
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
}

.diyDown {
    padding-left: 120px;
    width: 100%;
}
</style>
