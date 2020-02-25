<template>
    <div :class="$style.root">
        <div :class="$style.btnGroup">
            <span class="btn-mini" :class="$style.btn" @click="tableAdd()">+</span>
            <span class="btn-mini" :class="$style.btn" @click="tableDel">-</span>
        </div>
        <el-table :data="tableData" border max-height="500">
            <el-table-column prop="xInitial" label="起始位置" align="center">
                <!-- <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.xInitial"
                        :controls="false"
                        :min="0"
                        @change="resetTableData"
                    ></el-input-number>
                </template> -->
            </el-table-column>
            <el-table-column prop="lInitial" label="长度(m)" align="center">
                <!-- <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.lInitial"
                        :controls="false"
                        :min="0"
                        @change="resetTableData"
                    ></el-input-number>
                </template> -->
            </el-table-column>
            <el-table-column prop="gradient" label="坡度(ppt)" align="center">
                <!-- <template slot-scope="scope">
                    <el-input-number v-model="scope.row.gradient" :controls="false" :min="0"></el-input-number>
                </template> -->
            </el-table-column>
            <el-table-column prop="radius" label="过渡曲线半径(m)" align="center">
                <!-- <template slot-scope="scope">
                    <el-input-number v-model="scope.row.radius" :controls="false" :min="0"></el-input-number>
                </template> -->
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.insert,$style.editBtn]"
                        @click="tableAdd(scope.$index)"
                    >插入</span>
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.insert,$style.editBtn]"
                        @click="tableEdit(scope.$index,scope.row)"
                    >修改</span>
                    <span
                        class="cursor-p hover-heighlight"
                        :class="[$style.del,$style.editBtn]"
                        @click="deleteRow(scope.$index,scope.row)"
                    >删除</span>
                </template>
            </el-table-column>
        </el-table>
        <Ramp
            :type="rampType"
            :visible="rampVisible"
            :dataSource="rampDataSource"
            @saveData="saveRampData"
            @cancel="rampVisible=false"
        />
        <div :class="$style.footer">
            <el-button class="btn-xl" type="primary" @click="saveData">保存</el-button>
            <el-button class="btn-xl" @click="clearData">清空</el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

import { circuit } from "api";
import { isNil } from "utils/util";
import msgCenter from "utils/msgCenter";
import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import Ramp from "./Ramp";

export default {
    name: "Circuit",
    components: {
        Ramp
    },
    data() {
        return {
            tableData: [],
            rampVisible: false,
            rampDataSource: {},
            rampType: "",
            insertIdx: 0 // 插入数据的位置，默认第一行
        };
    },
    props: {},
    computed: {
        ...mapState("models", ["curModelId"])
    },
    methods: {
        resetTableData(tableData) {
            let len = tableData.length;
            for (let i = 1; i <= len; i++) {
                let prev = tableData[i - 1];
                let cur = tableData[i];

                if (i === 1) {
                    prev.xInitial = 0;
                }

                if (cur) {
                    cur.xInitial = prev.xInitial + prev.lInitial;
                }
            }

            this.tableData = tableData;
        },

        // 插入一行数据，默认在最后插入
        insertRow(row = []) {
            let idx = this.insertIdx;
            this.tableData.splice(idx, 0, ...row);
            this.resetTableData(this.tableData);
            return true;
        },

        // 修改行数据
        editRowData([data]) {
            const _editIdx = data._editIdx;
            if (isNil(_editIdx)) return false;

            delete data._editIdx;
            this.tableData.splice(_editIdx, 1, data);
            this.resetTableData(this.tableData);
            return true;
        },

        // 删除一行数据
        deleteRow(idx, row) {
            if (row.id) {
                circuit.delCircleRow({ id: row.id }).then(res => {
                    if (!res) return;
                    this.initData();
                });
            } else {
                this.tableData.splice(idx, 1);
                this.resetTableData(this.tableData);
            }
        },

        tableEdit(idx, row) {
            this.rampVisible = true;
            this.rampDataSource = { ...row, _editIdx: idx };
            this.rampType = "edit";
        },

        // 表头添加按钮，默认添加一条数据到第一行
        tableAdd(idx) {
            if (idx !== 0 && !idx) {
                idx = this.tableData.length;
            }
            this.rampVisible = true;
            this.insertIdx = idx;
            this.rampType = "add";
        },

        // 表头删除按钮，默认删除第一条数据
        tableDel() {
            const len = this.tableData.length;
            if (len === 0) {
                return;
            }

            const delIdx = len - 1;
            const delRow = this.tableData[len - 1];
            this.deleteRow(delIdx, delRow);
        },

        saveRampData(data) {
            let isSuccess = false;
            if (this.rampType === "edit") {
                isSuccess = this.editRowData(data);
            } else {
                isSuccess = this.insertRow(data);
            }

            if (!isSuccess) return;

            // this.$message.success("操作成功");
            this.rampVisible = false;
        },

        initData() {
            circuit.getCircleData({ modelId: this.curModelId }).then(res => {
                if (!res) return;
                let data = res.data || [];
                data.sort((a, b) => a.xInitial - b.xInitial);
                this.tableData = res.data || [];
            });
        },

        // 保存数据
        saveData(params = {}) {
            circuit
                .saveCircleData({ lpArr: this.tableData || [] })
                .then(res => {
                    if (!res) return;
                    if (typeof params.success === "function") {
                        params.success();
                    } else {
                        this.initData();
                    }
                });
        },
        clearData() {
            this.tableData = [];
        }
    },
    mounted() {
        this.initData();
        this.subToken = msgCenter.subscribe(
            GLOBAL_MSG_CENTER_TOKEN.auto_save,
            (topic, data) => {
                this.saveData({ success: data.success });
            }
        );
    },
    beforeDestroy() {
        msgCenter.unsubscribe(this.subToken);
    }
};
</script>


<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    .footer {
        text-align: center;
        margin: 30px 0 10px;
    }
    .btnGroup {
        margin-bottom: 10px;

        .btn {
            // background-color: transparent !important;
            // color: #4baed0 !important;
            // border: 1px solid rgba(75, 174, 208, 0.5);
            margin-right: 5px;
            cursor: pointer;
        }
    }
    .icon {
        margin-right: 10px;
    }

    .editBtn {
        padding: 5px 10px;
    }
}
</style>


