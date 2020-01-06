<template>
    <div :class="$style.root">
        <div :class="$style.title">线路参数</div>
        <div :class="$style.schemeWrap">
            <label>请选择线路设置方法</label>
            <el-select v-model="scheme" placeholder="请选择" class="m-l-5">
                <el-option
                    v-for="item in schemeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </div>
        <div :class="$style.content">
            <Scheme1 v-if="scheme === 'scheme1'" ref="scheme1" />
            <Scheme2 v-if="scheme === 'scheme2'" />

            <!-- <div :class="$style.footer" v-if="scheme==='scheme1'">
                <el-button class="btn-xl" type="primary" @click="save">保存</el-button>
                <el-button class="btn-xl" @click="cancel">取消</el-button>
            </div> -->
        </div>
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

import Scheme1 from "./Scheme1";
import Scheme2 from "./Scheme2";

const schemeList = [
    { value: "scheme1", label: "线路设置1" },
    { value: "scheme2", label: "线路设置2" }
];

export default {
    name: "Circuit",
    components: {
        Scheme1,
        Scheme2
    },
    data() {
        return {
            schemeList,
            scheme: schemeList[1].value
        };
    },
    props: {},
    methods: {
        save() {
            if (this.scheme === "scheme1") {
                this.$refs.scheme1.saveData();
            }
        },
        cancel() {}
    },
    computed: {},
    mounted() {}
};
</script>


<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #fff;
    border-radius: $radius_1;

    .title {
        font-size: 20px;
        text-align: center;
        padding: 10px 0 20px;
    }

    .schemeWrap {
        margin-bottom: 20px;
    }

    label {
        font-size: 14px;
        margin-right: 20px;
    }

    .footer {
        text-align: center;
        margin: 30px 0 10px;
    }

    :global {
        .el-input__icon {
            line-height: 1;
        }
    }
}
</style>


