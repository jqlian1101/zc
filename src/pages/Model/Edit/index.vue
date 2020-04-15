<template>
    <div :class="$style.root">
        <div v-if="curModelId">
            <div :class="$style.close" class="cursor-p" @click="onClickClose" v-if="showClose">
                <img :src="closeIcon" alt />
            </div>
            <BasicInfo v-if="curTreeNodeType === modelTreetype.basic" :key="curTreeNodeId" />
            <Vehicle v-if="curTreeNodeType === modelTreetype.vehicle" :key="curTreeNodeId" />
            <Connect v-if="curTreeNodeType === modelTreetype.connect" :key="curTreeNodeId" />
            <Circuit v-if="curTreeNodeType === modelTreetype.circuit" :key="curTreeNodeId" />
            <Args v-if="curTreeNodeType === modelTreetype.args" :key="curTreeNodeId" />
            <div :class="$style.sketchWrap" v-if="showLegend">
                <Legend />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import { MODEL_TREE_TYPE } from "common/constants";
import Img from "assets/icon";

import BasicInfo from "./Basic";
import Vehicle from "./Vehicle";
import Connect from "./Connect";
import Circuit from "./Circuit";
import Args from "./Args";

import Legend from "../Open/Legend";

export default {
    name: "Home",
    components: {
        BasicInfo,
        Vehicle,
        Connect,
        Circuit,
        Args,
        Legend
    },
    data() {
        return {
            modelTreetype: MODEL_TREE_TYPE,
            closeIcon: Img["close"]
        };
    },
    props: {},
    methods: {
        ...mapActions("uiState", ["saveCurCarDetail"]),
        onClickClose() {
            // 点击关闭，如果当前是对车辆信息或连接系统编辑，跳到大样图，否则，列车示意图
            let { curTreeNodeInfo } = this;
            let { row, cal } = curTreeNodeInfo;
            if (!row || !cal) {
                this.saveCurCarDetail({});
            } else {
                let car = this.getCarDataByNum(row, cal) || {};
                this.saveCurCarDetail(car);
            }

            this.$router.push("/page/model/open");
        }
    },
    computed: {
        ...mapGetters("models", ["curTreeNodeInfo", "getCarDataByNum"]),
        ...mapState("models", ["curModelId", "curTreeNodeId"]),

        showLegend() {
            return (
                this.curTreeNodeType === this.modelTreetype.vehicle ||
                this.curTreeNodeType === this.modelTreetype.connect
            );
        },

        curTreeNodeType() {
            return this.curTreeNodeInfo.type;
        },

        showClose() {
            // const { curTreeNodeType, modelTreetype } = this;
            // return (
            //     curTreeNodeType !== modelTreetype.args &&
            //     curTreeNodeType !== modelTreetype.circuit &&
            //     curTreeNodeType !== modelTreetype.basic
            // );
            return false;
        }
    },
    mounted() {},
    updated() {}
};
</script>

<style module lang="scss">
.root {
    position: relative;
    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
}

.sketchWrap {
    background: #fff;
    margin-top: 20px;
    padding: 30px 20px;
}
</style>

