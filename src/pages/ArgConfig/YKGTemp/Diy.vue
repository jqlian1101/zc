<template>
    <DropDown
        :save="save"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="true"
        :resetData="clearData"
        :cancel="cancel"
        :disabled="disabled"
        :showArrow="false"
        :visible="$attrs.visible"
        :showToggleBtn="$attrs.showToggleBtn"
    >
        <div :class="$style.root">
            <div :class="$style.axis" class="listWrap">
                <div>
                    <label>横坐标</label>位移 (m)
                </div>
                <div>
                    <label>纵坐标</label>力 (单位：N)
                </div>
            </div>
            <div :class="$style.tableWrap">
                <h4>曲线点设置</h4>
                <EditTable
                    ref="editTable"
                    :parentParams="{xType: xType, tcsdName: tcsdName}"
                    :type="type"
                    :showCharts="$attrs.showCharts"
                    :onOpenCurveCb="onOpenCurveCb"
                    :tcsdData="tcsdData"
                    :dataSource="tcsdData.tcsdData"
                    :tableDataChange="tableDataChange"
                />
            </div>
        </div>
        <NameDialog2
            :visible="nameDialogVisible"
            :onSaveData="saveName"
            :onCancel="()=>nameDialogVisible = false"
        />
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import EditTable from "./EditTable";

import { model } from "api";
import { getObjFromStr } from "utils/util";

import mixinSaveFunc from "common/editTableMixin";

import watchHaveDataMixin from "common/watchHaveDataMixin";

import NameDialog2 from "components/NameDialog";

const options = [
    { label: "位移(m)", value: "1" },
    { label: "速度(m/s)", value: "2" },
    { label: "时间(s)", value: "3" }
];

export default {
    name: "Diy",
    mixins: [mixinSaveFunc, watchHaveDataMixin],
    data() {
        return {
            options,
            xType: "1",
            tcsdData: {},
            isHaveData: false,
            nameDialogVisible: false,
            tcsdName: ""
        };
    },
    components: {
        DropDown,
        EditTable,
        NameDialog2
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
        // field: {
        //     type: String,
        //     required: true
        // },
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
        // "dataSource.xType"(val) {
        //     if (val) this.isHaveData = true;
        //     this.setXType(val);
        // },
        // dataSource(data, oldData) {
        //     console.log(data, oldData);
        // },
        "dataSource.id"(tcsdId, oldId) {
            const haveTcsd = tcsdId && tcsdId !== "0";
            if (!tcsdId) {
                this.setXType("");
                this.setTcsdData({});
                return;
            }

            if (haveTcsd) this.isHaveData = true;

            if (haveTcsd && tcsdId !== oldId && tcsdId !== this.curveId) {
                this.getTcsdDataById(tcsdId);
            }
        }
        // "dataSource.tcsdData"(tcsdData) {
        //     this.setTcsdData(tcsdData);
        // }
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

                // const xType = data.xType || data.xtype || "";
                // this.xType = xType;
                // this.setXType(xType);
                this.setTcsdData({ ...data, xType: "1" });
                // this.tcsdData = { ...data, xType };
            });
        },

        setXType(xType) {
            // this.xType = xType;
            // this.cacheXType = xType;
        },

        setTcsdData(data) {
            this.tcsdData = { ...data };
            this.tableData = data.tcsdData;
            this.cacheTcsdData = { ...data };
            this.tcsdName = data.tcsdName;
        },

        clearData() {
            // this.xType = "";
            this.cacheXType = "";

            this.tcsdData = {};
            this.tableData = null;
            this.tcsdName = "";

            this.curveId = "";
            this.isSaved = true;
            this.isHaveData = false;

            this.openCurveDataCache = {};

            this.$refs.editTable && this.$refs.editTable.clearData();
        },

        cancel() {
            const { tcsdId } = this.dataSource;
            this.formData = { ...this.dataSource };

            this.getTcsdDataById(this.dataSource.tcsdId);

            if (tcsdId) {
                this.isHaveData = true;
            }
            this.$attrs.onCancel && this.$attrs.onCancel();
        },

        onOpenCurveCb(data) {
            // const xType = data.xType || data.xtype || "";
            // this.setXType(xType);
            this.setTcsdData(data);
            this.openCurveDataCache = { ...data };
        },

        onSaveData() {
            // let field = this.field;
            // if (!field) return;

            const openCurveDataCache = this.openCurveDataCache || {};

            let datas = {
                tcsdName: this.tcsdName,
                xType: "1",
                tcsdId: this.curveId,
                tcsdData: {
                    ...this.tcsdData,
                    ...openCurveDataCache
                }
            };

            if (this.tableData) {
                datas.tcsdData.tcsdData = this.tableData;
            }

            if (this.curveId) {
                this.isHaveData = true;
            }

            this.saveData({ datas });
        },

        saveName(name) {
            this.tcsdName = `${name}.crv`;
            this.nameDialogVisible = false;
            setTimeout(() => {
                this.save();
            }, 50);
        },

        // 保存数据
        async save() {
            if (this.tableData.length <= 1) {
                this.$message.error("曲线定义不合理");
                // eslint-disable-next-line prefer-promise-reject-errors
                return false;
            }

            if (!this.isSaved && this.tableData && this.tableData.length > 0) {
                // if (!this.xType) {
                //     this.$message.error("请先选择横坐标");
                //     return false;
                // }

                if (!this.tcsdName) {
                    this.nameDialogVisible = true;
                    return false;
                }
                const res = await this.$refs.editTable.tractionLiSave(
                    null,
                    this.tcsdName
                );
                this.curveId = res.data.id;
            }

            return new Promise((resolve, reject) => {
                this.onSaveData();
                resolve(true);
            });
        },

        tableDataChange(data) {
            // let curX,
            // isPass = true;

            // for (let i = 0; i < data.length; i++) {
            //     const item = data[i];
            //     if (curX !== 0 && !curX) {
            //         curX = item.x;
            //         continue;
            //     }
            //     if (curX >= item.x) {
            //         isPass = false;
            //     }
            //     curX = item.x;
            // }

            // if (!isPass) this.$message.error("数据必须从小到大排列");

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
