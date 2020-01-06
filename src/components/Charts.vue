<template>
    <div :class="[className,$style.root]" :id="id" ref="myEchart"></div>
</template>

<script>
import echarts from "src/lib/echarts.js";
import EleResize from "src/lib/esresize";

export default {
    name: "Charts",
    props: {
        className: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        };
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            // 使用nextTick为了保证dom元素都已经渲染完毕
            this.initChart();
            this.initOptionsWatcher();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            // 获取chart的容器
            this.chart = echarts.init(this.$refs.myEchart);

            // 设置chart的options
            this.chart.setOption(this.options);

            // chart根据容器自适应
            let listener = () => {
                this.chart.resize();
            };
            EleResize.on(this.$refs.myEchart, listener);

            this.chart.on("datazoom", params => {
                this.$emit("datazoom", params);
            });
        },

        // 深度监听options的变化
        initOptionsWatcher() {
            if (this.__unwatchOptions) {
                this.__unwatchOptions();
                this.__unwatchOptions = null;
            }
            if (!this.manualUpdate) {
                this.__unwatchOptions = this.$watch(
                    "options",
                    (val, oldVal) => {
                        if (!this.chart && val) {
                            this.initChart();
                        } else {
                            this.chart.setOption(val, val !== oldVal);
                        }
                    },
                    { deep: true }
                );
            }
        }
    }
};
</script>

<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
}
</style>

