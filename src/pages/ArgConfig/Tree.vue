<template>
    <div :class="$style.root">
        <div :class="$style.searchWrap">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </div>
        <div :class="$style.treeWrap">
            <el-tree
                ref="tree"
                :data="datas"
                node-key="id"
                :current-node-key="getQueryId"
                :filter-node-method="filterNode"
                default-expand-all
                @node-click="nodeClick"
            ></el-tree>
        </div>
    </div>
</template>

<script>
import { TreeData } from "./config.js";
export default {
    data() {
        return {
            filterText: "",
            datas: TreeData,
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: {
        // ...mapState("models", ["modelsTree"]),
        // ...mapGetters("models", ["getCarData"]),

        getQueryId() {
            return this.$route.path;
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        nodeClick(nodeData) {
            nodeData.url && this.$router.push(nodeData.url);
        }
    }
};
</script>

<style module lang="scss">
.root {
    // padding: 16px 0 0 22px;
    .searchWrap {
        padding: 16px;
    }

    .noData {
        text-align: center;
        line-height: 200px;
        color: #999;
        margin-left: -16px;
    }
    .title {
        font-size: 16px;
    }
    .treeWrap {
        padding-left: 16px;
    }
    :global {
        .custom-tree-node {
            img {
                width: 12px;
                height: 10px;
                margin-right: 4px;
            }
            span {
                font-size: 12px;
            }
        }
        .el-tree-node,
        .el-tree-node > .el-tree-node__content {
            background-color: transparent;
        }
        .el-tree-node.is-current > .el-tree-node__content {
            color: $highlight-color_1;
        }
    }
}
</style>
