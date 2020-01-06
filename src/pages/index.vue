<template>
    <div class="page_root">
        <Layout v-if="support" />
        <div v-else class="nonsupport">请选用高版本浏览器，告别IE</div>
    </div>
</template>

<script>
import Layout from "components/Layout.vue";

import { IEVersion, getUserIdAndType } from "utils/util";
import { setTimeout } from "timers";

window.__IEVersion__ = IEVersion();

const support =
    window.__IEVersion__ < 0 ||
    window.__IEVersion__ >= 9 ||
    window.__IEVersion__ === "edge";

export default {
    name: "app",
    data() {
        return {
            support
        };
    },
    components: {
        Layout
    },
    mounted() {
        let { userId } = getUserIdAndType();
        if (!userId) {
            this.$message.error("请重新登录");
            setTimeout(() => {
                this.$router.push("/login");
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.page_root {
    width: 100%;
    height: 100%;
    // min-width: $app-min-w;
    overflow: auto;

    .nonsupport {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 20px;
    }
}
</style>

