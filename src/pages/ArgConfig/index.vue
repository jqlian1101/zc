<template>
    <div :class="$style.root">
        <div :class="$style.left">
            <div class="leftCont">
                <Tree />
            </div>
        </div>
        <div :class="$style.right" ref="rightWrap">
            <div class="rightCont">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Tree from "./Tree";

export default {
    name: "Model",
    data() {
        return {};
    },
    components: {
        Tree
    },
    props: {},
    computed: {},
    watch: {},
    methods: {}
};
</script>

<style module lang="scss">
$left-width: 222px;
.root {
    width: 100%;
    height: 100%;
    position: relative;
    .left {
        vertical-align: top;
        width: $left-width;
        height: 100%;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
        background-color: #fff;
        :global {
            .leftCont {
                width: 100%;
                height: 100%;
                overflow: auto;
                padding-bottom: 20px;
            }
        }
    }
    .right {
        height: 100%;
        padding: 20px;
        overflow: auto;
        position: absolute;
        top: 0;
        left: $left-width;
        right: 0;
        bottom: 0;
        .btnWrap {
            margin-bottom: 20px;
        }
        :global {
            .rightCont {
                width: 100%;
                height: 100%;
                background-color: #fff;
                padding: 20px;
                overflow: auto;
                min-width: 758px;
            }
        }
    }
}
</style>
