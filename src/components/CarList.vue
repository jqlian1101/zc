<template>
    <div :class="$style.root" class="clearfix">
        <div
            :class="$style.carWrap"
            v-for="(item,idx) in list"
            :key="idx"
            class="fll"
            @click="clickList(item)"
        >
            <Car
                @mousedown="onCarMouseDown($event, item)"
                @mouseup="onCarMouseUp($event, item)"
                :class="[$style[`car_${getCarType(idx)}`]]"
                :type="getCarType(idx)"
                :carInfo="item"
            />
        </div>

        <div :class="$style.mouseTooltip" v-show="curDragItem" ref="mouseTooltip">
            <Car
                :class="[$style[`car_body`]]"
                type="body"
                :carInfo="curDragItem"
                v-if="curDragItem"
            />
        </div>
    </div>
</template>

<script>
import Car from "components/CarBody";

export default {
    name: "CarList",
    components: {
        Car
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            }
        },
        onClickList: {
            type: Function,
            default: () => {}
        },
        isAllowDrag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            curDragItem: null
        };
    },
    computed: {
        carList() {
            return [...this.list];
        }
    },
    methods: {
        clickList(info) {
            // 排序中，不允许点击跳转
            if (this.isAllowDrag) return;

            this.onClickList(info);
        },
        // 判断car的类型，车头 | 车身 | 车位
        getCarType(idx) {
            if (this.list.length < 2) return "head";
            switch (idx) {
                case 0:
                    return "head";
                case this.list.length - 1:
                    return "trail";
                default:
                    return "body";
            }
        },

        setTooltipDomPosition(ev) {
            if (!this.tooltopDom) {
                this.tooltopDom = this.$refs.mouseTooltip;
            }
            this.tooltopDom.style.top = ev.y + 10 + "px";
            this.tooltopDom.style.left = ev.x + 10 + "px";
        },

        onMouseMove(ev) {
            this.setTooltipDomPosition(ev);
        },

        onCarMouseDown(ev, item) {
            if (!this.isAllowDrag) return;

            let self = this;
            this.setTooltipDomPosition(ev);
            self.curDragItem = item;

            document.addEventListener("mousemove", self.onMouseMove);
            document.addEventListener("mouseup", self.onCarMouseUp);
        },

        onCarMouseUp(ev, item) {
            if (!this.isAllowDrag) return;

            if (!item) {
                this.curDragItem = null;
                return;
            }
            this.resort(item);
            document.removeEventListener("mousemove", this.onMouseMove);
        }
    },
    mounted() {
        this.tooltopDom = this.$refs.mouseTooltip;
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    margin: 0 5px;
    .carWrap {
        margin-bottom: 20px;
    }
    .car_head,
    .car_trail {
        width: 120px;
        height: 60px;
    }
    .car_body {
        width: 140px;
        height: 60px;
    }
    .mouseTooltip {
        position: fixed;
    }
}
</style>
