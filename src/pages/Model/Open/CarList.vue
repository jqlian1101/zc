<template>
    <div :class="$style.root">
        <div
            class="btn-default"
            :class="$style.sortBtn"
            @click="isAllowDrag = true"
            v-if="!isAllowDrag"
        >排序</div>
        <div v-for="(item, idx) in carListData" :key="idx" :class="$style.trainWrap">
            <div :class="$style.trainListWrap" class="clearfix">
                <div :class="$style.title">{{`第${item[0]}列`}}</div>
                <div
                    :class="$style.carWrap"
                    v-for="(li,index) in item[1]"
                    :key="`${li.vehicleId}_${index}`"
                    class="fll"
                    @click="clickList(li)"
                >
                    <Car
                        :key="`${li.vehicleId}_${index}`"
                        @mousedown="onCarMouseDown($event, li)"
                        @mouseup="onCarMouseUp($event, li)"
                        :class="[$style[`car_${getCarType(item[1], index)}`]]"
                        :type="getCarType(item[1], index)"
                        :carInfo="li"
                    />
                </div>
            </div>
        </div>
        <div :class="$style.sortFooter" v-if="isAllowDrag">
            <el-button class="btn-xl" type="primary" @click="saveSort">保存</el-button>
            <el-button class="btn-xl" @click="cancelSort">取消</el-button>
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
import { mapGetters, mapActions } from "vuex";

// import CarList from "components/CarList";
import Car from "components/CarBody";
import { model } from "api";

const getIdx = (doubleArr, tarRow, tarId) => {
    doubleArr = JSON.parse(JSON.stringify(doubleArr));
    for (let i = 0; i < doubleArr.length; i++) {
        if (doubleArr[i][0] === tarRow) {
            let curList = doubleArr[i][1];
            for (let j = 0; j < curList.length; j++) {
                let idx = curList.findIndex(item => {
                    return item.vehicleId === tarId;
                });
                return { rowIdx: i, calIdx: idx };
            }
        }
    }
    return null;
};

export default {
    name: "OpenCarList",
    components: {
        Car
    },
    data() {
        return {
            isAllowDrag: false,
            curDragItem: null,
            carListData: []
        };
    },
    props: {},
    computed: {
        ...mapGetters("models", ["allCarData"])
    },
    watch: {
        isAllowDrag() {
            if (this.isAllowDrag) {
                this.docAddListener();
            } else {
                this.docRemoveListener();
            }
        },
        allCarData() {
            this.initData();
        }
    },
    methods: {
        ...mapActions("uiState", ["saveCurCarDetail"]),
        ...mapActions("models", ["getModelData"]),

        initData() {
            this.carListData = [...this.allCarData];
        },

        // 点击车辆
        clickList(info) {
            // 排序中，不允许点击跳转
            if (this.isAllowDrag) return;
            this.saveCurCarDetail(info);
        },

        // 判断car的类型，车头 | 车身 | 车位
        getCarType(list, idx) {
            if (list.length < 2) return "head";
            switch (idx) {
                case 0:
                    return "head";
                case list.length - 1:
                    return "trail";
                default:
                    return "body";
            }
        },

        // 重新排序
        resort(target, cb) {
            let { curDragItem, carListData } = this;

            let curItem = { ...curDragItem };
            // _row: 标记排序后新的row，与原始数据做区分
            if (!curItem._row) {
                curItem._row = curItem.row;
            }
            if (!target._row) {
                target._row = target.row;
            }

            let curListData = JSON.parse(JSON.stringify(carListData));

            // 删除原数据，即被拖拽的元素
            let delObj = getIdx(curListData, curItem._row, curItem.vehicleId);
            if (!delObj) {
                typeof cb === "function" && cb();
                return;
            }

            // 验证删除的数组长度是否<=2，每列车最少车辆数为2
            let delTar = curListData[delObj.rowIdx][1];
            if (delTar.length <= 2) {
                typeof cb === "function" && cb();
                this.$message("每列车车辆数不能小于2");
                return;
            }
            delTar.splice(delObj.calIdx, 1);

            // 在目标位置添加元素
            let addObj = getIdx(curListData, target._row, target.vehicleId);
            curListData[addObj.rowIdx][1].splice(addObj.calIdx, 0, {
                ...curItem,
                _row: target._row
            });

            this.carListData = [...curListData];
            typeof cb === "function" && cb();
        },

        // 设置tooltip位置
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

            this.setTooltipDomPosition(ev);
            this.curDragItem = item;
        },

        onCarMouseUp(ev, item) {
            if (!this.isAllowDrag) return;

            if (!item) {
                this.curDragItem = null;
                return;
            }
            this.resort(item, () => {
                this.curDragItem = null;
            });
        },

        docAddListener() {
            document.addEventListener("mousemove", this.onMouseMove);
            document.addEventListener("mouseup", this.onCarMouseUp);
        },

        docRemoveListener() {
            document.removeEventListener("mouseup", this.onCarMouseUp);
            document.removeEventListener("mousemove", this.onMouseMove);
        },

        // 保存排序
        saveSort() {
            let { carListData } = this;
            let cas = [];
            carListData.map(item => {
                item[1].map((list, idx) => {
                    cas.push({
                        id: list.vehicleId,
                        carNum: `${item[0]}-${idx + 1}`
                    });
                });
            });

            model.resortVehicleOrder({ cas }).then(res => {
                if (!res) return;
                // 保存成功后，刷新模型树数据
                // this.getModelData("", () => {
                //     this.isAllowDrag = false;
                //     this.$message.success("操作成功");
                // });

                this.getModelData({
                    id: "",
                    cb: () => {
                        this.isAllowDrag = false;
                        this.$message.success("操作成功");
                    }
                });
            });
        },

        // 取消排序
        cancelSort() {
            this.isAllowDrag = false;
        }
    },
    mounted() {
        this.initData();
    },
    destroyed() {
        this.docRemoveListener();
    }
};
</script>

<style module lang="scss">
.root {
    position: relative;

    .trainWrap {
        margin-bottom: 60px;
        &:last-child {
            margin-bottom: 20px;
        }
    }
    .title {
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        margin: 20px 0;
    }

    .sortBtn {
        position: absolute;
        top: -10px;
        right: 0px;
    }

    .sortFooter {
        text-align: center;
    }

    // carList
    .trainListWrap {
        margin: 0 5px;
    }
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
