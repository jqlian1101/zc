<template>
    <div :class="{[$style.root]:true, [$style.disabled]: disabled}" class="clearfix">
        <div :class="$style.mainWrap" class="fll">
            <slot></slot>
        </div>
        <div :class="$style.suffix" class="flr" v-if="suffix">{{suffix}}</div>
    </div>
</template>

<script>
export default {
    name: "InputNumberWrap",
    data() {
        return {};
    },
    props: {
        disabled: { type: Boolean, default: false },
        suffix: { type: String, default: "" }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 28px;
    border: 1px solid #acc5e5 !important;

    .mainWrap {
        width: calc(100% - 40px);
    }
    .suffix {
        width: 40px;
        text-align: center;
        color: #999;
        font-size: 12px;
    }

    &.disabled {
        .suffix {
            background-color: #f5f7fa;
            color: #c0c4cc;
        }
    }

    :global {
        .el-input,
        .el-input-number,
        .el-input__inner {
            height: 24px;
            line-height: 24px;
            border: none !important;
        }
    }
}
</style>
