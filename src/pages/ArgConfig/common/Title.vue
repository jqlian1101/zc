<template>
    <div :class="$style.title">{{title}}</div>
</template>

<script>
export default {
    name:'ArgConfigTitle',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>


<style module lang="scss">
.title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
}
</style>

