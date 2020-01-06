<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {};
    },
    components: {}
};
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    // min-width: $app-min-w;
    overflow: auto;
}
</style>

