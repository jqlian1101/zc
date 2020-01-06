<template>
    <div :class="$style.layoutWrap">
        <div :class="$style.header">
            <Header />
        </div>
        <div :class="$style.pageLeft">
            <LeftMenu />
        </div>
        <div :class="$style.main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from "components/Header.vue";
import LeftMenu from "components/LeftMenu.vue";

export default {
    name: "Layout",
    components: {
        Header,
        LeftMenu
    }
};
</script>
<style module lang="scss">
.layoutWrap {
    width: 100%;
    height: 100%;
    position: relative;
    .header {
        background-color: $header-bg-color;
        padding: 0 $wrap-pad;
    }
    .pageLeft {
        width: $leftmenu-w;
        background-color: #2b303e;
        position: absolute;
        top: $header-H;
        left: 0;
        bottom: 0;
    }
    .main {
        background-color: $body-bg-color;
        overflow: auto;

        position: absolute;
        top: $header-H;
        left: $leftmenu-w;
        right: 0;
        bottom: 0;
    }
}
</style>
