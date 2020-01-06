<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :resetData="clearData"
        :cancel="cancel"
        :disabled="disabled"
    >
        <div :class="$style.root">
            <div :class="$style.axis" class="listWrap">
                <div>
                    <label>横坐标</label>
                    <el-select v-model="xType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    <label>纵坐标</label>力 (单位：N)
                </div>
            </div>
            <div :class="$style.tableWrap">
                <h4>曲线点设置</h4>
                <EditTable
                    ref="editTable"
                    :parentParams="{xType: xType}"
                    :type="type"
                    :onSaveCb="onSaveCb"
                    :showCharts="$attrs.showCharts"
                    :onOpenCurveCb="onOpenCurveCb"
                    :tcsdData="tcsdData"
                    :dataSource="tcsdData.tcsdData"
                    :tableDataChange="tableDataChange"
                />
            </div>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "components/EditTable";

import { model } from "api";
import { getObjFromStr } from "utils/util";

import mixinSaveFunc from "./mixin/mixinSaveFunc";

const options = [
    { label: "位移(m)", value: "1" },
    { label: "速度(m/s)", value: "2" },
    { label: "时间(s)", value: "3" }
];

export default {
    name: "Diy",
    mixins: [mixinSaveFunc],
    data() {
        return {
            options,
            xType: "",
            tcsdData: {},
            isHaveData: false
        };
    },
    components: {
        DropDown,
        EditTable
    },
    props: {
        size: {
            type: String,
            default: ""
        },
        type: {
            type: Number,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        saveData: {
            type: Function,
            default: () => {}
        },
        placeholder: {
            type: String,
            default: "参数设置"
        },
        dataSource: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        "dataSource.xType"(val) {
            if (val) this.isHaveData = true;
            this.setXType(val);
        },
        "dataSource.tcsdId"(tcsdId, oldId) {
            const haveTcsd = tcsdId && tcsdId !== "0";

            if (haveTcsd) this.isHaveData = true;

            if (haveTcsd && tcsdId !== oldId && tcsdId !== this.curveId) {
                this.getTcsdDataById(tcsdId);
            }
        },
        "dataSource.tcsdData"(tcsdData) {
            this.setTcsdData(tcsdData);
        }
        // xType(val) {
        //     if (val !== this.cacheXType) {
        //         this.isSaved = false;
        //     }
        // }
    },
    methods: {
        getTcsdDataById(id) {
            if (!id) return;
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};
                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }

                if (data.id) {
                    this.isHaveData = true;
                }

                const xType = data.xType || data.xtype || "";
                // this.xType = xType;
                this.setXType(xType);
                this.setTcsdData({ ...data, xType });
                // this.tcsdData = { ...data, xType };
            });
        },

        setXType(xType) {
            this.xType = xType;
            this.cacheXType = xType;
        },

        setTcsdData(data) {
            this.tcsdData = { ...data };
            this.cacheTcsdData = { ...data };
        },

        clearData() {
            this.xType = "";
            this.cacheXType = "";

            this.tcsdData = {};
            this.tableData = null;

            this.curveId = "";
            this.isSaved = true;
            this.isHaveData = false;

            this.openCurveDataCache = {};

            this.$refs.editTable && this.$refs.editTable.clearData();

            // const { xType, tcsdId } = this.dataSource;
            // const haveTcsd = tcsdId && tcsdId !== "0";

            // if (xType || haveTcsd) this.isHaveData = true;

            // this.xType = xType || "";
            // this.cacheXType = xType || "";

            // if (haveTcsd) {
            //     this.getTcsdDataById(tcsdId);
            // } else {
            //     this.tcsdData = { xType, tcsdId, tcsdData: [] };
            // }
        },

        cancel() {
            // console.log(this.isSaved);
            // if (!this.isSaved) {
            //     this.xType = this.cacheXType;
            //     this.tcsdData = this.cacheTcsdData;
            //     if (this.xType || this.tcsdData.id) {
            //         this.isHaveData = true;
            //     }
            // }
            const { tcsdId, xType } = this.dataSource;
            this.formData = { ...this.dataSource };

            this.getTcsdDataById(this.dataSource.tcsdId);

            if (tcsdId || xType) {
                this.isHaveData = true;
            }
        },

        onOpenCurveCb(data) {
            const xType = data.xType || data.xtype || "";
            // this.xType = xType;
            // this.cacheXType = xType;
            this.setXType(xType);
            this.setTcsdData(data);
            this.openCurveDataCache = { ...data };
        },

        onSaveData() {
            let field = this.field;
            if (!field) return;

            const openCurveDataCache = this.openCurveDataCache || {};

            let datas = {
                xType: this.xType,
                tcsdId: this.curveId,
                tcsdData: {
                    ...this.tcsdData,
                    ...openCurveDataCache
                }
                // [`${field}X`]: this.xType,
                // [`${field}TcsdId`]: this.curveId,
                // [`${field}TcsdData`]: this.tcsdData
            };

            if (this.tableData) {
                datas.tcsdData.tcsdData = this.tableData;
            }

            if (this.xType || this.curveId) {
                this.isHaveData = true;
            }

            this.saveData({ datas });
        },

        // 保存数据
        async save() {
            // const xTypeChange = this.xType !== this.tcsdData.xType;
            // const haveData = this.tableData || this.tcsdData.tcsdData;

            // if (!haveData && !this.curveId) {
            //     this.$message({
            //         message: "请将数据填写完整"
            //     });
            //     return false;
            // }

            if (!this.isSaved && this.tableData && this.tableData.length > 0) {
                if (!this.xType) {
                    this.$message.error("请先选择横坐标");
                    return false;
                }
                await this.$refs.editTable.tractionLiSave();
            }

            return new Promise((resolve, reject) => {
                this.onSaveData();
                resolve(true);
            });
        },

        tableDataChange(data) {
            let curX,
                isPass = true;

            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (curX !== 0 && !curX) {
                    curX = item.x;
                    continue;
                }
                if (curX >= item.x) {
                    isPass = false;
                }
                curX = item.x;
            }

            if (!isPass) this.$message.error("数据必须从小到大排列");

            this.tableData = data;

            // 数据编辑以后，将id清空，后续提示用户保存数据
            this.curveId = "";
            this.isSaved = false;
        }
    },
    mounted() {
        // console.log("diy : ", this.disabled);
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    font-size: 12px;

    .axis {
        & > div:not(:last-child) {
            margin-bottom: 10px;
        }
        label {
            margin-right: 20px;
        }
    }

    .tableWrap {
        margin-top: 14px;
        h4 {
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
}
</style>
