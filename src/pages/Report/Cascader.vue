<template>
    <div :class="$style.root">
        <el-cascader :props="cascaderProps" clearable @change="this.onChange"></el-cascader>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { report } from "api";
import { getUserIdAndType } from "utils/util";

export default {
    name: "NotFound",
    data() {
        return {
            cascaderProps: {
                lazy: true,
                lazyLoad: (node, resolve) => {
                    if (node.root === true) {
                        return this.getArgsList(resolve);
                    }
                    this.getCarList({
                        argCode: node.value,
                        resolveCb: resolve
                    });
                }
            }
        };
    },
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        getArgsList(resolveCb) {
            const { userId } = getUserIdAndType();
            report
                .getArgsList({ modelId: this.curModelId, userID: userId })
                .then(res => {
                    if (!res || res.code !== "200") return;
                    const data = res.data || [];
                    const nodes = data.map(item => {
                        return {
                            value: item.key,
                            label: item.name,
                            leaf: false
                        };
                    });

                    resolveCb(nodes);
                });
        },

        getCarList(params = {}) {
            const { argCode, resolveCb } = params;

            if (!this.$attrs.curCalc) {
                resolveCb([]);
                this.$message.error("请先选择要查看的计算结果");
                return;
            }
            if (!argCode) {
                resolveCb([]);
                return;
            }

            const { userId } = getUserIdAndType();

            report
                .getCaListBYCode({
                    modelId: this.curModelId,
                    code: argCode,
                    recordId: this.$attrs.curCalc,
                    userId
                })
                .then(res => {
                    if (!res || res.code !== "200") return;
                    const data = res.data || [];
                    // const data = [
                    //     {
                    //         code: "F_stock",
                    //         value: "第1列第3辆前端面"
                    //     },
                    //     {
                    //         code: "F_stock_back",
                    //         value: "第1列第4辆后端面"
                    //     }
                    // ];

                    const nodes = data.map(item => {
                        // const vc = item.replace("车辆", "");

                        const [ve, ca] = item.value.match(/\d+/g);

                        // const ve = vc.charAt(0);
                        // const ca = vc.substring(1);

                        // return {
                        //     value: `${ve}-${ca}`,
                        //     label: `第${ve}列 第${ca}辆`,
                        //     leaf: true
                        // };
                        return {
                            value: `${item.code}-${ve}-${ca}-${item.value}`,
                            label: item.value,
                            leaf: true
                        };
                    });
                    resolveCb(nodes);
                })
                .catch(e => {
                    resolveCb([]);
                });
        },

        onChange(node) {
            this.$emit("onChange", node);
        }
    },
    created() {}
};
</script>

<style module lang="scss">
.root {
    display: inline-block;
    width: 100%;

    :global {
        .el-cascader {
            width: 100%;
            height: 28px;
            line-height: 28px;
            .el-input__inner {
                height: 28px !important;
            }
        }
    }
}
</style>
