<template>
    <Legend />
</template>

<script>
import Legend from "./Legend";

import msgCenter from "utils/msgCenter";
import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

export default {
    name: "Open",
    components: {
        Legend
    },

    mounted() {
        this.setCurTreeNodeId("");
        this.subToken = msgCenter.subscribe(
            GLOBAL_MSG_CENTER_TOKEN.auto_save,
            (topic, data) => {
                data.success();
            }
        );
    },
    beforeDestroy() {
        msgCenter.unsubscribe(this.subToken);
    }
};
</script>
