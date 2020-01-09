<template>
    <div :class="$style.root" class="noselect" unselectable="on">
        <div v-if="!isOpenCarDetail" :class="$style.listWrap">
            <CarList />
        </div>
        <div v-else :class="$style.detailWrap">
            <div :class="$style.close" class="cursor-p" @click="onClickList({})">
                <img :src="closeIcon" alt />
            </div>
            <div :class="$style.title">{{carDetail.name}}</div>
            <CarBodyDetail />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

// import msgCenter from "utils/msgCenter";
// import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import Img from "assets/icon";
import CarList from "./CarList";

import CarBodyDetail from "./CarBodyDetail";

export default {
    name: "Open",
    components: {
        CarBodyDetail,
        CarList
    },
    data() {
        return {
            closeIcon: Img["close"]
        };
    },
    props: {},
    methods: {
        ...mapActions("uiState", ["saveCurCarDetail"]),
        ...mapActions("models", ["setCurTreeNodeId"]),

        onClickList(info) {
            this.saveCurCarDetail(info);
        }
    },
    computed: {
        ...mapGetters("uiState", ["isOpenCarDetail"]),
        ...mapState("uiState", ["carDetail"])
    }
};
</script>

<style module lang="scss">
.root {
    background: #fff;
    border-radius: $raduis_1;
    position: relative;

    .listWrap,
    .detailWrap {
        padding: 30px;
    }

    .detailWrap {
        text-align: center;
        .title {
            margin: 20px 0;
            text-align: center;
            font-size: 18px;
            font-weight: normal;
        }
    }
    .close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
</style>
