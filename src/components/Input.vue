<template>
    <div :class="$style.root" class="clearfix">
        <label class="label" v-if="label">{{label}}:</label>
        <!--
        <input class="input" v-bind:type="type" v-model="value" @input="onChange" />
        <div class="close">
            <img :src="closeIcon" alt />
        </div>
        -->
        <el-input class="input" placeholder="请输入内容" v-model="value" @input="onChange" clearable></el-input>
    </div>
</template>

<script>
import Icon from "assets/icon";

export default {
    name: "HelloWorld",
    data() {
        return {
            value: "",
            closeIcon: Icon["close"]
        };
    },
    props: {
        label: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        }
    },
    methods: {
        onChange(val) {
            this.$emit("onChange", val);
        }
    },
    mounted() {
        console.log("label : ", this.label);
    }
};
</script>

<style module lang="scss">
.root {
    display: inline-block;
    font-size: 16px;
    position: relative;
    :global {
        .label {
            margin-right: 10px;
            color: #333;
        }
        .input {
            width: 320px;
            height: 40px;
            border: 1px solid #acc5e5;
        }
    }
}
</style>
