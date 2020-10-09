<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :resetData="clearData"
        :cancel="cancel"
    >
        <div :class="$style.root">
            <div class="listWrap">
                <span :class="$style.numLabel">数量</span>
                <el-input-number
                    :class="$style.inpNum"
                    :controls="false"
                    v-model="formData.jzqNum"
                    :min="0"
                ></el-input-number>
            </div>
            <div :class="$style.tableWrap">
                <h4>特征曲线</h4>
                <EditTable
                    xUnit="m/s"
                    fxUnit="N"
                    ref="editTable"
                    :type="type"
                    :onSaveCb="onSaveCb"
                    :tcsdData="tcsdData"
                    :dataSource="tcsdData.tcsdData"
                    :tableDataChange="tableDataChange"
                    :showCharts="true"
                />
            </div>
        </div>
    </DropDown>
</template>

<script>
import EditTable from "components/EditTable";

import { model } from "api";
import { getObjFromStr } from "utils/util";

import mixin from "./mixin/mixin";
import mixinSaveFunc from "./mixin/mixinSaveFunc";
import mixinData from "./mixin/mixinData";

import watchHaveDataMixin from "common/watchHaveDataMixin";

export default {
    name: "Damper",
    mixins: [mixin, mixinData, mixinSaveFunc, watchHaveDataMixin],

    data() {
        return {
            formData: {},
            tcsdData: {}
        };
    },
    components: {
        EditTable
    },
    props: {
        type: {
            required: true
        }
    },

    watch: {
        dataSource(val, oldVal) {
            const { jzqNum } = val;

            this.formData = { jzqNum };
            this.cacheFormData = { jzqNum };
            if (val.jzqNum || val.tcsdId) this.isHaveData = true;

            if (
                val.tcsdId &&
                val.tcsdId !== oldVal.tcsdId &&
                val.tcsdId !== this.curveId
            ) {
                this.getTcsdDataById(val.tcsdId);
            }
        }
    },

    methods: {
        getTcsdDataById(id) {
            if (!id) return;
            model.tractionLiView({ id }).then(res => {
                let data = res.data || {};
                if (data.tcsdData) {
                    data = { ...data, tcsdData: getObjFromStr(data.tcsdData) };
                }
                this.tcsdData = data;
            });
        },

        cancel() {
            this.formData = { ...this.dataSource };
            this.setIsHaveData({
                jzqNum: this.dataSource.jzqNum,
                jzqTcsdId: this.dataSource.tcsdId
            });
            this.getTcsdDataById(this.dataSource.tcsdId);
        },

        clearData() {
            this.formData = {};
            this.cacheFormData = {};
            this.tcsdData = { tcsdData: [] };

            this.tableData = null;
            this.curveId = "";
            this.isSaved = false;
            this.isHaveData = false;

            this.$refs.editTable && this.$refs.editTable.clearData();
        },

        // 保存数据
        onSaveData() {
            let datas = {
                jzqNum: this.formData.jzqNum,
                jzqTcsdId: this.curveId
            };

            this.setIsHaveData(datas);
            this.saveData({ datas });
        },

        // 保存数据
        async save() {
            if (!this.isSaved) {
                await this.$refs.editTable.tractionLiSave();
            }
            return new Promise((resolve, reject) => {
                this.onSaveData();

                resolve(true);
            });
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    font-size: 12px;

    .inpNum {
        width: 200px;
    }

    .numLabel {
        display: inline-block;
        width: 40px;
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
