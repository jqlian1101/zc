<!-- 牵引力特征曲线参数设置 -->
<template>
    <DropDown
        :save="save"
        title="牵引力特征曲线"
        :isHaveData="isHaveData"
        :resetData="clearData"
    >
        <div :class="$style.root">
            <el-row class="listWrap">
                <el-form
                    ref="form"
                    label-position="left"
                    :model="datas"
                    label-width="160px"
                >
                    <el-form-item label="整列最大载客工况总质量">
                        <input-number-wrap suffix="kg">
                            <el-input-number
                                :controls="false"
                                v-model="datas.massMax"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="整列车回转质量">
                        <input-number-wrap suffix="kg">
                            <el-input-number
                                :controls="false"
                                v-model="datas.massRotating"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="整列车牵引电机数量">
                        <el-input-number
                            :controls="false"
                            v-model="datas.motorNum"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="牵引指令下达后的延长时间">
                        <input-number-wrap suffix="s">
                            <el-input-number
                                :controls="false"
                                v-model="datas.delayTime"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="冲击率">
                        <input-number-wrap suffix="m/s³">
                            <el-input-number
                                :controls="false"
                                v-model="datas.rampFun"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="characteristics === 1"
                    :label="1"
                    @change="() => onCheckboxChange(1)"
                    >整列车牵引力曲线自定义1</el-checkbox
                >

                <ul :class="$style.curveInfo">
                    <el-form :model="datas">
                        <li>
                            <span>恒转速区：</span>
                            <span>
                                速度(km/h) 0-
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV1"
                                    />
                                </el-form-item>
                            </span>
                            <span style="margin-left: 10px">
                                F(N)
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterF"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                        <li>
                            <span>恒功率区:</span>
                            <span>
                                速度(km/h)
                                <el-form-item>
                                    <el-input-number
                                        :disabled="true"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV3"
                                    /> </el-form-item
                                >-
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV2"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F∙v(N∙(m/s))
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterFv"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                        <li>
                            <span>降功区：</span>
                            <span>
                                速度(km/h)
                                <el-form-item>
                                    <el-input-number
                                        :disabled="true"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV5"
                                    /> </el-form-item
                                >-
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterFvv"
                                    />
                                </el-form-item>
                            </span>
                            <span>
                                F∙v² (N∙(m/s)²)
                                <el-form-item>
                                    <el-input-number
                                        :disabled="characteristics !== 1"
                                        :controls="false"
                                        :class="$style.speedbox"
                                        v-model="datas.characterV4"
                                    />
                                </el-form-item>
                            </span>
                        </li>
                    </el-form>
                </ul>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="characteristics === 2"
                    :label="2"
                    @change="() => onCheckboxChange(2)"
                    >整列车牵引力曲线自定义2</el-checkbox
                >

                <div :class="$style.curveInfo">
                    <EditTable
                        ref="editTable"
                        :type="4"
                        xUnit="km/h"
                        fxUnit="N"
                        :disabled="characteristics !== 2"
                        :showCharts="true"
                        :onSaveCb="onSaveCb"
                        :tcsdData="tcsd"
                        :dataSource="tcsd.tcsdData"
                        :tableDataChange="tableDataChange"
                    />
                </div>
            </el-row>
            <el-row class="listWrap" :class="$style.tcuWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="characteristics === 3"
                    :label="3"
                    @change="() => onCheckboxChange(3)"
                    >整列车牵引TCU控制</el-checkbox
                >
                <div :class="$style.curveInfo">
                    <el-form
                        class="clearfix"
                        ref="form"
                        label-position="left"
                        :model="datas"
                        label-width="160px"
                    >
                        <el-form-item label>
                            <el-select
                                v-model="datas.tcu"
                                placeholder="请选择"
                                :disabled="characteristics !== 3"
                            >
                                <el-option
                                    v-for="item in TCUList"
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
import EditTable from "components/EditTable";
import { getObjFromStr } from "utils/util";

import { model } from "api";

const TCUList = [
    { id: "1", name: "TCU控制程序1" },
    { id: "2", name: "TCU控制程序2" },
    { id: "3", name: "TCU控制程序3" },
    { id: "4", name: "TCU控制程序4" },
    { id: "5", name: "TCU控制程序5" },
    { id: "6", name: "TCU控制程序6" },
    { id: "7", name: "TCU控制程序7" },
    { id: "8", name: "TCU控制程序8" },
    { id: "9", name: "TCU控制程序9" },
    { id: "10", name: "TCU控制程序10" },
];

export default {
    name: "Traction",
    data() {
        return {
            datas: {},
            tcsd: {},
            characteristics: 0,
            dialogVisible: false,

            nameDialogVisible: false,
            tractionTableName: "",

            // 牵引力曲线列表
            tractionList: [],

            isHaveData: false,
            TCUList,
        };
    },
    components: {
        DropDown,
        EditTable,
    },
    props: {
        type: {
            // 表示第几列车
            type: String,
            required: true,
        },
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState("models", ["curModelId"]),
    },
    watch: {
        "datas.characterV1"(val) {
            this.datas.characterV3 = val;
        },
        "datas.characterV2"(val) {
            this.datas.characterV5 = val;
        },
        // "datas.characterV3"(val) {
        //     this.datas.characterV1 = val;
        // },
        // "datas.characterV5"(val) {
        //     this.datas.characterV2 = val;
        // }
    },
    methods: {
        initData() {
            model
                .tractionView({ modelId: this.curModelId, type: this.type })
                .then((res) => {
                    if (!res) return;
                    let { data = {} } = res;

                    // if (data && JSON.stringify(data) !== "{}") {
                    //     this.isHaveData = true;
                    // }
                    this.setHaveDataStatus(data);

                    if (data.tcsd && data.tcsd.tcsdData) {
                        data.tcsd.tcsdData = getObjFromStr(data.tcsd.tcsdData);
                    }

                    this.datas = data;
                    this.characteristics = data.characteristics || "";
                    this.tcsd = data.tcsd || {};
                });
        },

        tableDataChange(data) {
            this.tableData = data;

            // 数据编辑以后，将id清空，后续提示用户保存数据
            this.tcsdId = "";
        },

        onSaveCb(id) {
            this.tcsdId = id;
        },

        onCheckboxChange(value) {
            if (this.characteristics === value) {
                return (this.characteristics = "");
            }
            this.characteristics = value;
        },

        clearData() {
            const { id, modelId } = this.datas;
            const newDatas = { id, modelId };

            this.datas = newDatas;

            this.characteristics = "";
            this.tcsd = {};
            this.setHaveDataStatus(newDatas);

            this.$refs.editTable && this.$refs.editTable.clearData();
        },

        // 保存数据
        async save() {
            if (this.tableData && !this.tcsdId) {
                // this.$message("请先保存表格数据");
                // return resolve(false);
                const res = await this.$refs.editTable.tractionLiSave();
                this.tcsdId = res.data.id;
            }

            return new Promise((resolve) => {
                // if (this.tableData && !this.tcsdId) {
                //     this.$message("请先保存表格数据");
                //     return resolve(false);
                // }

                const { params } = this.getSaveParams();
                this.setHaveDataStatus(params.vtrInfo);

                resolve(true);
            });
        },

        setHaveDataStatus(params = {}) {
            this.isHaveData = false;
            for (let i in params) {
                if (i === "id" || i === "modelId") continue;
                if (params[i]) {
                    this.isHaveData = true;
                    break;
                }
            }
        },

        getSaveParams() {
            let isNeedSave = false;

            if (JSON.stringify(this.datas) !== "{}") isNeedSave = true;
            let params = {
                type: this.type,
                vtrInfo: {
                    ...this.datas,
                    modelId: this.curModelId,
                },
            };

            if (this.characteristics) {
                params.vtrInfo.characteristics = this.characteristics;
                isNeedSave = true;
            }

            if (!this.tcsdId) {
                if (params.vtrInfo.tcsd && params.vtrInfo.tcsd.id) {
                    this.tcsdId = params.vtrInfo.tcsd.id;
                }
            }

            this.tcsdId &&
                (params.tcsdId = this.tcsdId) &&
                (params.vtrInfo.tcsdId = this.tcsdId) &&
                (isNeedSave = true);

            console.log(params);
            return { params, isNeedSave };
        },

        saveDataToServe() {
            const { params, isNeedSave } = this.getSaveParams();
            if (!isNeedSave) return;
            return model.tractionSave(params).then((res) => {
                if (res && res.code === 200) {
                    !this.datas.id && (this.datas.id = res.data.id);
                }
                return res;
            });
        },
    },
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;

    .speedbox {
        width: 80px;
        input {
            padding-left: 2px !important;
            padding-right: 2px !important;
        }
    }

    .curveInfo {
        li {
            font-size: 12px;
            color: $label-color_1;
        }

        .btnGroup {
            margin-bottom: 10px;
        }

        :global {
            .el-form-item {
                display: inline-block;
            }
        }
    }

    .tcuWrap {
        :global {
            .el-form-item,
            .el-select {
                width: 100%;
            }
        }
    }

    // :global {
    // .el-form-item__label,
    // .el-checkbox__label {
    //     font-size: 12px;
    //     color: $label-color_1;
    // }
    // .el-form-item {
    //     margin-bottom: 10px;
    // }
    // }
}
</style>
