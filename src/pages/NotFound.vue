<template>
    <div :class="$style.root">
        <div :class="$style.title">404</div>
        <div :class="$style.desc">页面跑丢了～</div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {};
    },
    props: {}
};
</script>

<style module lang="scss">
.root {
    color: #000;
    text-align: center;
    padding: 100px 0 150px;
    .title {
        font-size: 80px;
        margin-bottom: 10px;
    }
    .desc {
        font-size: 30px;
    }
}
</style>
