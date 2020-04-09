<template>
    <DropDown
        :save="save"
        :resetData="clearData"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :cancel="cancel"
    >
        <div class="clearfix" :class="$style.root">
            <el-row class="listWrap">
                <label for>选择型号</label>
                <el-select
                    :class="$style.sel"
                    class="flr"
                    v-model="formData.ykgTempId"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-row>
            <el-row class="listWrap">
                <label for>备注</label>
                <el-input :disabled="true" v-model="remarks"></el-input>
            </el-row>
        </div>
    </DropDown>
</template>

<script>
import { argConfig } from "api";
import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

import { getUserIdAndType } from "utils/util";
import watchHaveDataMixin from "common/watchHaveDataMixin";

export default {
    name: "FoldedCollapse",
    mixins: [mixin, mixinData, watchHaveDataMixin],
    components: {},
    data() {
        return {
            options: [],
            remarks: ""
        };
    },
    methods: {
        getYKGTempList() {
            const { userId, userTypeCode } = getUserIdAndType();

            argConfig
                .getYKGTempList({ userId, type: userTypeCode })
                .then(res => {
                    if (!res) return;
                    this.options = res.data;
                });
        },
        "formData.ykgTempId"(val) {
            const cur = this.options.find(item => item.id === val);
            this.remarks = cur ? cur.remarks || "" : "";
        }
    },
    mounted() {
        this.getYKGTempList();
    }
};
</script>

<style module lang="scss">
.root {
    .row {
        margin-bottom: 10px;
    }
    .sel {
        width: 250px;
    }
    label {
        display: inline-block;
        height: 28px;
        line-height: 28px;
    }
}
</style>



