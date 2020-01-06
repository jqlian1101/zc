<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <span v-if="showAdd" class="btn-mini" :class="$style.btn" @click="tableAdd">+</span>
            <span v-if="showDel" class="btn-mini" :class="$style.btn" @click="tableDel">-</span>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            size="mini"
            :class="$style.root"
            :height="height"
        >
            <el-table-column prop="order" label="分段号" width="80">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.order" @change="dataChange"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="行程起止点∆x">
                <el-table-column prop="start" label="起点" width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.start" @change="dataChange"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="end" label="止点" width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.end" @change="dataChange"></el-input>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="desc" label="函数描述">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.desc" @change="dataChange"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export default {
    name: "BufferPiecewiseTable",
    props: {
        dataSource: {
            type: Array,
            default: () => {
                // return [{ order: 1, start: 10, end: 20, desc: "aaaa" }];
                return [];
            }
        },
        tableDataChange: {
            type: Function,
            default: () => {}
        },
        height: {
            type: String,
            default: "200"
        },
        showOpen: {
            type: Boolean,
            default: true
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        showDel: {
            type: Boolean,
            default: true
        },
        showSave: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tableData: [...this.dataSource]
        };
    },
    watch: {
        dataSource() {
            this.tableData = [...this.dataSource];
        }
    },
    methods: {
        dataChange(data) {
            console.log(data);
        },
        // table中插入一行
        tableAdd() {
            let { tableData } = this;
            tableData.unshift({});
            this.tableData = tableData;
            this.tableDataChange(this.tableData);
        },

        // table中删除一行
        tableDel() {
            let { tableData } = this;
            tableData.pop();
            this.tableData = tableData;
            this.tableDataChange(this.tableData);
        },

        saveData() {
            return this.tableData;
        }
    }
};
</script>

<style module lang="scss">
.root {
    .btnGroup {
        margin-bottom: 10px;
    }
    .btn {
        background-color: transparent !important;
        color: #4baed0 !important;
        border: 1px solid rgba(75, 174, 208, 0.5);
        margin-right: 5px;
        cursor: pointer;
    }
    :global {
        .el-input__inner {
            padding: 0;
        }
    }
}
</style>

