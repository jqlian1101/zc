<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :resetData="clearData"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :cancel="cancel"
    >
        <div :class="$style.root">
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.coupdef===1"
                    :label="1"
                    @change="onCheckboxChange(1)"
                >描点法设置</el-checkbox>
                <el-form
                    class="clearfix"
                    ref="form"
                    label-position="left"
                    :model="formData"
                    label-width="120px"
                >
                    <el-form-item label="型号选择">
                        <el-select
                            v-model="formData.couMdfId"
                            placeholder="请选择"
                            :disabled="formData.coupdef!==1"
                        >
                            <el-option
                                v-for="item in curveList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行程">
                        <input-number-wrap suffix="m" :disabled="formData.coupdef!==1">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.coupdef!==1"
                                v-model="formData.couRoute"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="间隙">
                        <input-number-wrap suffix="m" :disabled="formData.coupdef!==1">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.coupdef!==1"
                                v-model="formData.couGap"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                    <el-form-item label="包络线间震动的阻尼">
                        <input-number-wrap suffix="N.s/m" :disabled="formData.coupdef!==1">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.coupdef!==1"
                                v-model="formData.couDeboost"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="listWrap">
                <el-checkbox
                    class="radioWrap"
                    :value="formData.coupdef===2"
                    :label="2"
                    @change="onCheckboxChange(2)"
                >分段函数法设置</el-checkbox>
                <div>
                    <div class="clearfix">
                        <el-form
                            class="clearfix"
                            ref="form"
                            label-position="left"
                            :model="formData"
                            label-width="120px"
                        >
                            <el-form-item label="型号选择">
                                <el-select
                                    v-model="formData.couFdhsfId"
                                    placeholder="请选择"
                                    :disabled="formData.coupdef!==2"
                                >
                                    <el-option
                                        v-for="item in piecewiseLsit"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-row>
            <el-row class="listWrap">
                <div class="clearfix">
                    <el-checkbox
                        class="radioWrap"
                        :value="formData.coupdef === 3"
                        :label="3"
                        @change="onCheckboxChange(3)"
                    >缓冲器本构 型号选择</el-checkbox>
                    <el-input-number
                        :disabled="formData.coupdef!==3"
                        class="flr"
                        :controls="false"
                        v-model="formData.couEquation"
                        style="width:88px;margin-bottom:6px"
                    ></el-input-number>
                </div>
                <el-form ref="form" label-position="left" :model="formData" label-width="120px">
                    <el-form-item label="钩缓质量" label-position="left">
                        <input-number-wrap suffix="kg" :disabled="formData.coupdef!==3">
                            <el-input-number
                                :controls="false"
                                :disabled="formData.coupdef!==3"
                                v-model="formData.couQuality"
                            ></el-input-number>
                        </input-number-wrap>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import DropDown from "components/DropDown.vue";
import { getUserIdAndType } from "utils/util";
import { argConfig } from "api";

import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

import watchHaveDataMixin from "common/watchHaveDataMixin";

const { userId, userType } = getUserIdAndType();

export default {
    name: "ConnectBuffer",
    mixins: [mixin, mixinData, watchHaveDataMixin],
    data() {
        return {
            curveList: [], // 描点list
            piecewiseLsit: [], // 分段函数list

            checkedValue: ""
        };
    },
    components: {
        DropDown
    },
    watch: {
        dataSource() {
            this.formData = { coupdef: "", ...this.dataSource };
            this.cacheFormData = { coupdef: "", ...this.dataSource };
        }
    },
    computed: {},
    methods: {
        onCheckboxChange(value) {
            if (this.formData.coupdef === value) {
                this.formData.coupdef = "";
                return;
            }
            this.formData.coupdef = value;
        },

        // 查询缓冲器分段函数法模版列表
        getCoupFdhsfTempList() {
            argConfig
                .getCoupFdhsfTempList({ type: userType, userId })
                .then(res => {
                    if (!res) return;
                    this.piecewiseLsit = res.data || [];
                });
        },

        // 查询缓冲器描点法模版列表
        getCoupMdfTempList() {
            argConfig
                .getCoupMdfTempList({ type: userType, userId })
                .then(res => {
                    if (!res) return;
                    this.curveList = res.data || [];
                });
        },

        clearData() {
            this.formData = { coupdef: "" };
        }
    },
    mounted() {
        this.getCoupFdhsfTempList();
        this.getCoupMdfTempList();
    }
};
</script>

<style module lang="scss">
.root {
    .form {
        margin-left: 22px;
    }

    :global {
        .el-select {
            width: 100%;
        }
    }
}
</style>
