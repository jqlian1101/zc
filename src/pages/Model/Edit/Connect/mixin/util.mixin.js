import { CONNECT_ELE_FIELD_DICT } from 'common/constants';
export default {
    data () {
        return {
            isHaveData: false
        }
    },
    methods: {
        setIsHaveData (datas) {
            this.isHaveData = false;

            if (this.$attrs.eleKey && CONNECT_ELE_FIELD_DICT[this.$attrs.eleKey]) {
                const keyList = CONNECT_ELE_FIELD_DICT[this.$attrs.eleKey];
                for (let i = 0; i < keyList.length; i++) {
                    if (datas[keyList[i]]) {
                        this.isHaveData = true;
                        break;
                    }
                }
            }
        }
    }
}
