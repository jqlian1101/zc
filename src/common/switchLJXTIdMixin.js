import { mapGetters } from "vuex";
import {
    MODEL_TREE_TYPE
} from "common/constants";

export default {
    computed: {
        ...mapGetters("models", ["getTreeNodeByCarNum"])
    },
    methods: {
        /**
         * 保存后，车辆连接系统id可能会发生变化
         * 以车辆编号carNum和类型type为条件，查询最新的ID，并返回新的id
         */
        switchLJXTId (node = {}) {
            const { type, carNum, id } = node;
            let newId = id;

            if (type === MODEL_TREE_TYPE.connect && carNum) {
                const datas = this.getTreeNodeByCarNum(carNum);
                const newCarInfo = datas.find(
                    item => item.carNum === carNum && item.type === type
                );

                if (newCarInfo && newCarInfo.id !== id) {
                    newId = newCarInfo.id;
                }
            }

            return newId;
        }
    }
}
