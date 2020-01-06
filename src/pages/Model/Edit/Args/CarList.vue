<template>
    <div :class="$style.root" class="clearfix">
        <div :class="$style.carWrap" v-for="(item,idx) in list" :key="idx" class="fll">
            <Car
                :class="[$style[`car_${getCarType(idx)}`]]"
                :type="getCarType(idx)"
                :carInfo="item"
            />
            <div
                :class="[$style.front, $style.section, $style[`face_${getCarType(idx)}`]]"
            >{{item.front['coupname'] || ''}}</div>
            <div
                :class="[$style.back, $style.section, $style[`face_${getCarType(idx)}`]]"
            >{{item.back['coupname'] || ''}}</div>
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
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
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
        }
    },
    mounted() {}
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    margin: 0 5px;
    .carWrap {
        margin-bottom: 40px;
        position: relative;

        .section {
            position: absolute;
            bottom: -20px;
            font-size: 16px;
        }
        .front {
            left: 10px;
            &.face_head {
                left: 0;
            }
        }
        .back {
            right: 10px;
            &.face_trail {
                right: 0;
            }
        }
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
}
</style>
