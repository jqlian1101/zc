<template>
    <div :class="$style.root">
        <div
            :class="$style.train"
            class="cursor-p"
            :style="bodyBGImg"
            @dblclick.stop="onDblclickBody"
        >
            <div>
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.hcq)"
                    :src="Img['hc']"
                    title="缓冲器-前端"
                    :class="[$style.frontHC,$style.hc,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.hcq)"
                    :src="Img['hc']"
                    title="缓冲器-后端"
                    :class="[$style.backHC,$style.hc,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.xjzc)"
                    :src="Img['xjth']"
                    title="橡胶弹簧-前端"
                    :class="[$style.frontXJTH,$style.xjth,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.xjzc)"
                    :src="Img['xjth']"
                    title="橡胶弹簧-后端"
                    :class="[$style.backXJTH,$style.xjth,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.ykg)"
                    :src="Img['yk']"
                    title="压馈管-前端"
                    :class="[$style.frontYK,$style.yk,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.ykg)"
                    :src="Img['yk']"
                    title="压馈管-后端"
                    :class="[$style.backYK,$style.yk,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.gzbh)"
                    :src="Img['gz']"
                    title="过载保护-前端"
                    :class="[$style.frontGZ,$style.gz,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.gzbh)"
                    :src="Img['gz']"
                    title="过载保护-后端"
                    :class="[$style.backGZ,$style.gz,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.fpq)"
                    :src="Img['fp']"
                    title="防爬-前端"
                    :class="[$style.frontFP,$style.fp,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.fpq)"
                    :src="Img['fp']"
                    title="防爬-后端"
                    :class="[$style.backFP,$style.fp,$style.connectEle]"
                />
                <div
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.diy1)"
                    :class="[$style.diy,$style.connectDiy,$style.frontDIY1,$style.connectEle]"
                >diy1</div>
                <div
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.diy2)"
                    :class="[$style.diy,$style.connectDiy,$style.frontDIY2,$style.connectEle]"
                >diy2</div>
                <div
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.diy1)"
                    :class="[$style.diy,$style.connectDiy,$style.backDIY1,$style.connectEle]"
                >diy1</div>
                <div
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.diy2)"
                    :class="[$style.diy,$style.connectDiy,$style.backDIY2,$style.connectEle]"
                >diy2</div>
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.fd)"
                    :src="Img['fd']"
                    title="风挡-前端"
                    :class="[$style.frontFD,$style.fd,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.fd)"
                    :src="Img['fd']"
                    title="风挡-后端"
                    :class="[$style.backFD,$style.fd,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(frontKey, connectEleDict.cjjz)"
                    :src="Img['cjjz']"
                    title="车间减震-前端"
                    :class="[$style.frontCJJZ,$style.cjjz,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('connect')"
                    v-if="isShowEle(backKey, connectEleDict.cjjz)"
                    :src="Img['cjjz']"
                    title="车间减震-后端"
                    :class="[$style.backCJJZ,$style.cjjz,$style.connectEle]"
                />
                <img
                    @dblclick.stop="onDblclick('vehicle')"
                    :src="Img['qy']"
                    title="牵引系统"
                    :class="[$style.qy,$style.btmEle]"
                    v-if="isShowEle(infoKey, vehicleEleDict.qyxt)"
                />
                <img
                    @dblclick.stop="onDblclick('vehicle')"
                    :src="Img['zd']"
                    title="制动系统"
                    :class="[$style.zd,$style.btmEle]"
                    v-if="isShowEle(infoKey, vehicleEleDict.zdxt)"
                />
                <div
                    @dblclick.stop="onDblclick('vehicle')"
                    :class="[$style.diy,$style.carDiy,$style.btmDIY1,$style.btmEle]"
                    v-if="isShowEle(infoKey, vehicleEleDict.diy1)"
                >diy1</div>
                <div
                    @dblclick.stop="onDblclick('vehicle')"
                    :class="[$style.diy,$style.carDiy,$style.btmDIY2,$style.btmEle]"
                    v-if="isShowEle(infoKey, vehicleEleDict.diy2)"
                >diy2</div>
                <div
                    @dblclick.stop="onDblclick('vehicle')"
                    :class="[$style.diy,$style.carDiy,$style.btmDIY3,$style.btmEle]"
                    v-if="isShowEle(infoKey, vehicleEleDict.diy3)"
                >diy3</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Img from "assets/images/connect";

import {
    CONNECT_ELE_DICT,
    VEHICLE_ELE_DICT,
    CAR_ELE_DICT,
    CONNECT_ELE_FIELD_DICT,
    VEHICLE_ELE_FIELD_DICT
} from "common/constants";
import switchLJXTId from "common/switchLJXTIdMixin";

import { model, carArg } from "api";

export default {
    name: "CarBodyDetail",
    components: {},
    data() {
        return {
            Img,
            bodyBGImg: { backgroundImage: `url(${Img["ct01"]})` },
            connectEleDict: CONNECT_ELE_DICT,
            vehicleEleDict: VEHICLE_ELE_DICT,

            frontKey: CAR_ELE_DICT.front.label,
            backKey: CAR_ELE_DICT.back.label,
            infoKey: CAR_ELE_DICT.info.label,

            connectFrontData: {},
            connectBackData: {},
            diyData: {},
            brakesData: {},
            tractionData: {}
        };
    },
    mixins: [switchLJXTId],
    props: {},
    watch: {
        curModelId(val) {
            this.getAllCoupTypeByModelId(val);
        },
        carDetail(detail = {}) {
            let { row, cal } = detail;
            if (row && cal) {
                this.getAllCoupTypeByModelId(false, `${row}-${cal}`);
            }

            this.getVehicleDiy(detail.vehicleId);
            this.getBrakesView(detail.vehicleId);
            this.getTractionView(detail.vehicleId);
        }
    },

    computed: {
        ...mapState("uiState", ["carDetail", "carDetailInfo"]),
        ...mapGetters("uiState", ["curCarNum", "isDefinedEle"]),
        ...mapState("models", ["curTreeNodeId", "curModelId"]),

        isShowEle() {
            return (type, ele) => {
                return this.isDefinedEle(this.getCarNum(), type, ele);
                // const { carDetailInfo } = this;
                // const curCarInfo = carDetailInfo[this.getCarNum()];

                // if (!curCarInfo) return false;

                // // console.log(
                // //     type,
                // //     curCarInfo,
                // //     curCarInfo[type],
                // //     curCarInfo[type].indexOf(ele) !== -1
                // // );

                // return curCarInfo[type].indexOf(ele) !== -1;
                // // if (type === this.infoKey) {
                // //     return this.vehicleEleIsShow(type, ele);
                // // }
                // // return this.connectEleIsShow(type, ele);
            };
        }
    },
    methods: {
        ...mapActions("models", ["setCurTreeNodeId"]),
        ...mapActions("uiState", ["saveDefinedEleStatus"]),

        // 双击车身
        onDblclickBody() {
            console.log("onDblclickBody");
        },

        // 双击图标
        onDblclick(eleType) {
            let { connectData = {}, vehicleData = {} } = this.carDetail || {};

            let curInfo = {};
            if (eleType === "connect") {
                curInfo = connectData;
            } else if (eleType === "vehicle") {
                curInfo = vehicleData;
            }

            let { id, type } = curInfo;
            if (!id || !type) return;

            id = this.switchLJXTId(curInfo);

            this.setCurTreeNodeId(id);

            if (
                id === this.$route.query.id &&
                type === this.$route.query.type
            ) {
                return;
            }

            this.$router.push({
                path: "/page/model/edit",
                query: { type, id }
            });
        },

        // 判断车辆参数元件是否显示
        vehicleEleIsShow(type, ele) {
            let list = VEHICLE_ELE_FIELD_DICT[ele];

            let data = {};
            if (ele === VEHICLE_ELE_DICT["zdxt"]) {
                // 制动系统
                data = this.brakesData;
            } else if (ele === VEHICLE_ELE_DICT["qyxt"]) {
                // 牵引系统
                data = this.tractionData;
            } else {
                data = this.diyData;
                return data[ele] === 1;
            }

            for (let i = 0; i < list.length; i++) {
                let value = data[list[i]];
                // 如果元件的某个字段的值存在，表示该元件已定义过，0代表未定义
                if (value) {
                    return true;
                }
            }
            return false;
        },

        // 判断连接系统元件是否显示
        connectEleIsShow(type, ele) {
            const { carDetailInfo } = this;
            const curCarInfo = carDetailInfo[this.getCarNum()];
            if (!curCarInfo) return false;

            return curCarInfo[type].indexOf(ele) !== -1;

            // let { connectBackData, connectFrontData } = this;

            // let list = CONNECT_ELE_FIELD_DICT[ele];

            // // 判断是取前端面数据还是后端面数据
            // let data = connectBackData;
            // if (type === this.frontKey) {
            //     data = connectFrontData;
            // }

            // for (let i = 0; i < list.length; i++) {
            //     let value = data[list[i]];
            //     // 如果元件的某个字段的值存在，表示该元件已定义过，0代表未定义
            //     if (value) {
            //         return true;
            //     }
            // }
            // return false;
        },

        getEleStatus(data, dict) {
            const arr = [];
            for (let i in dict) {
                const curEleFields = dict[i];

                for (let j = 0; j < curEleFields.length; j++) {
                    if (data[curEleFields[j]]) {
                        arr.push(i);
                    }
                }
            }
            return arr;
        },

        getCarNum() {
            let { curCarNum } = this;
            if (!curCarNum) return;

            return `${curCarNum.row}-${curCarNum.col}`;
        },

        // 获取连接系统列表
        getAllCoupTypeByModelId(modelId, num) {
            let { curModelId } = this;
            let carNum = this.getCarNum();

            curModelId = modelId || curModelId;
            carNum = num || carNum;

            if (!carNum) return;

            model
                .getAllCoupTypeByModelId({
                    modelId: curModelId,
                    carNum
                })
                .then(res => {
                    if (!res) return;
                    let { data = [] } = res;

                    // this.connectFrontData =
                    //     data.find(item => item.faceType === "1") || {};

                    // this.connectBackData =
                    //     data.find(item => item.faceType === "2") || {};

                    const frontData =
                        data.find(item => item.faceType === "1") || {};
                    const backData =
                        data.find(item => item.faceType === "2") || {};

                    this.saveDefinedEleStatus({
                        id: carNum,
                        type: "front",
                        eleKey: this.getEleStatus(
                            frontData,
                            CONNECT_ELE_FIELD_DICT
                        )
                    });

                    this.saveDefinedEleStatus({
                        id: carNum,
                        type: "back",
                        eleKey: this.getEleStatus(
                            backData,
                            CONNECT_ELE_FIELD_DICT
                        )
                    });
                });
        },

        // 获取车辆参数diy数据
        getVehicleDiy(id) {
            // let { vehicleId } = this.carDetail || {};
            let vehicleId = id || this.carDetail.vehicleId;
            if (!vehicleId) return;
            return carArg.diyView({ caId: vehicleId }).then(res => {
                if (!res) return;
                // this.diyData = res.data || {};

                const { data } = res;

                let eleKey = [];
                if (data.diy1 || (data.diy1Tcsd && data.diy1Tcsd !== "0")) {
                    eleKey.push("diy1");
                }
                if (data.diy2 || (data.diy2Tcsd && data.diy2Tcsd !== "0")) {
                    eleKey.push("diy2");
                }
                if (data.diy3 || (data.diy3Tcsd && data.diy3Tcsd !== "0")) {
                    eleKey.push("diy3");
                }
                if (eleKey.length > 0) {
                    this.setVeInfo(eleKey);
                }
            });
        },

        // 获取车辆参数 制动系统数据
        getBrakesView(id) {
            // let { vehicleId } = this.carDetail || {};
            let vehicleId = id || this.carDetail.vehicleId;
            if (!vehicleId) return;
            return carArg.brakesView({ caId: vehicleId }).then(res => {
                if (!res) return;
                // this.brakesData = res.data || {};

                const { data } = res;
                const dict = VEHICLE_ELE_FIELD_DICT["zdxt"];
                let eleKey = "";
                for (let i = 0; i < dict.length; i++) {
                    if (data[dict[i]]) {
                        eleKey = "zdxt";
                        break;
                    }
                }

                this.setVeInfo(eleKey);
            });
        },

        // 获取车辆参数 牵引系统数据
        getTractionView(id) {
            // let { vehicleId } = this.carDetail || {};
            let vehicleId = id || this.carDetail.vehicleId;
            if (!vehicleId) return;
            return carArg.tractionView({ caId: vehicleId }).then(res => {
                if (!res) return;
                this.tractionData = res.data || {};

                const { data } = res;
                const dict = VEHICLE_ELE_FIELD_DICT["qyxt"];
                let eleKey = "";
                for (let i = 0; i < dict.length; i++) {
                    if (data[dict[i]]) {
                        eleKey = "qyxt";
                        break;
                    }
                }

                this.setVeInfo(eleKey);
            });
        },

        setVeInfo(eleKey) {
            if (!eleKey) return;
            const carNum = this.getCarNum();
            if (!carNum) return;

            this.saveDefinedEleStatus({
                id: carNum,
                type: "info",
                eleKey,
                isDefined: true
            });
        }
    },

    mounted() {
        // console.log(this.$route);
        this.getAllCoupTypeByModelId();
        this.getVehicleDiy();
        this.getBrakesView();
        this.getTractionView();
    }
};
</script>

<style module lang="scss">
.root {
    display: inline-block;
    background-color: #fff;
    margin: 0 auto;
    img {
        cursor: pointer;
    }

    .train {
        width: 600px;
        height: 288px;
        margin: 50px 0 120px;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .diy {
        width: 28px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        border: 1px solid rgba(255, 116, 255, 0.6);
        color: rgba(255, 116, 255, 0.6);
    }
    .connectEle {
        position: absolute;
        top: 56%;
    }
    .hc {
        width: 20px;
        height: 16px;
        margin-top: -24px;
    }

    .frontHC {
        left: 120px;
    }

    .backHC {
        right: 120px;
    }

    .xjth {
        width: 30px;
        height: 10px;
        margin-top: -20px;
    }
    .frontXJTH {
        left: 146px;
    }
    .backXJTH {
        right: 146px;
    }

    .yk {
        width: 20px;
        height: 30px;
        margin-top: -32px;
    }
    .frontYK {
        left: 180px;
    }
    .backYK {
        right: 180px;
    }

    .gz {
        width: 10px;
        height: 30px;
        margin-top: -32px;
    }
    .frontGZ {
        left: 208px;
    }
    .backGZ {
        right: 208px;
    }

    .connectDiy {
        margin-top: -25px;
    }
    .frontDIY1 {
        left: 224px;
    }
    .backDIY1 {
        right: 224px;
    }
    .frontDIY2 {
        left: 260px;
    }
    .backDIY2 {
        right: 260px;
    }

    .fd {
        width: 20px;
        height: 25px;
        bottom: 68px;
        top: auto;
    }
    .frontFD {
        left: 68px;
    }
    .backFD {
        right: 68px;
    }

    .fp {
        width: 20px;
        height: 20px;
        margin-top: -25px;
    }
    .frontFP {
        left: -30px;
    }
    .backFP {
        right: -30px;
    }

    .cjjz {
        width: 40px;
        height: 10px;
        top: 10px;
    }
    .frontCJJZ {
        left: 58px;
    }
    .backCJJZ {
        right: 58px;
    }

    .btmEle {
        position: absolute;
        left: 50%;
    }
    .qy {
        width: 40px;
        height: 20px;
        margin-left: -20px;
        bottom: -10px;
    }

    .zd {
        width: 40px;
        height: 30px;
        margin-left: -20px;
        bottom: -50px;
    }

    .carDiy {
        margin-left: -14px;
    }
    .btmDIY1 {
        bottom: -78px;
    }
    .btmDIY2 {
        bottom: -106px;
    }
    .btmDIY3 {
        bottom: -134px;
    }
}
</style>

