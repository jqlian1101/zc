<template>
    <div :class="{[$style.root]: true, [$style.disabled]: disabled}" class="cursor-p" ref="root">
        <div
            v-if="showToggleBtn"
            slot="reference"
            :class="$style.box"
            class="link inp-border"
            ref="reference"
            @click="toggleVisible(true)"
        >
            <span :class="{[$style.haveData]:isHaveData, [$style.noData]:!isHaveData}">{{boxTxt}}</span>
            <span v-if="showArrow" class="triangle-down-6 downIcon"></span>
        </div>
        <el-drawer
            :visible.sync="visible"
            :with-header="false"
            custom-class="editArgsDrawer"
            :title="title"
            @close="cancel"
        >
            <div class="editArgsDrawerBody">
                <slot></slot>
                <div class="subBtnWrap">
                    <el-button class="btn-default" @click="clickSave">应用</el-button>
                    <el-button class="btn-default" @click="clickReset">清空</el-button>
                    <el-button class="btn-default" @click="clickCancel">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: "DropDown",
    data() {
        return {
            visible: false,
            popoverWidth: 250
        };
    },
    props: {
        showToggleBtn: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: "default"
        },
        isHaveData: {
            type: Boolean,
            default: false
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "参数设置"
        },
        save: {
            type: Function,
            default: () => {}
        },
        resetData: {
            type: Function,
            default: () => {}
        },
        cancel: {
            type: Function,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        "$attrs.visible"(val, oldVal) {
            if (val !== oldVal && val !== this.visible) this.visible = val;
        }
    },
    computed: {
        boxTxt() {
            if (this.placeholder) return this.placeholder;
            return this.isHaveData
                ? "参数设置（已设置）"
                : "参数设置（未设置）";
        }
    },
    methods: {
        showPop: function() {
            this.popoverWidth = this.$refs.reference.offsetWidth;
        },
        setVisible(bool = false) {
            this.visible = bool;
        },
        clickCancel() {
            this.setVisible();
            this.cancel();
        },
        async clickSave() {
            // this.setVisible();
            let result = await this.save();
            setTimeout(() => {
                result && this.setVisible();
            }, 10);
        },
        clickReset() {
            this.resetData();
        },
        toggleVisible(bool) {
            if (this.disabled) return;
            this.visible = bool;
        }
    },
    mounted() {}
};
</script>

<style module lang="scss">
$height: 28px;
.root {
    width: 100%;
    height: $height;
    line-height: $height - 2px;
    position: relative;
    // margin-top: 4px;

    .haveData {
        color: #4baed0;
    }

    .noData {
        color: #999;
    }

    &.disabled {
        .box {
            background-color: #f5f7fa !important;

            span {
                color: #c0c4cc !important;
            }
        }
    }

    &.mini {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        :global {
            .link {
                padding: 0 $input-pad-s;
            }
            .downIcon {
                right: 5px;
                top: 9px;
            }
        }
    }

    :global {
        .link {
            padding: 0 $input-pad-default;
        }
        .downIcon {
            position: absolute;
            right: 10px;
            top: 12px;
        }
    }
}

:global {
    .editArgsDrawer {
        width: 200px;
        overflow: auto;

        .editArgsDrawerBody {
            padding: 0 20px 20px;
        }

        .el-drawer__header {
            font-size: 16px;
        }

        .subBtnWrap {
            margin-top: 20px;
            text-align: center;
        }

        .el-form-item__label,
        .el-checkbox__label {
            font-size: 12px;
            color: $label-color_1;
        }
        .el-form-item {
            margin-bottom: 10px;
        }

        .radioWrap {
            margin-bottom: 10px;
        }

        .listWrap {
            margin-bottom: 20px;
        }
    }
}
</style>
