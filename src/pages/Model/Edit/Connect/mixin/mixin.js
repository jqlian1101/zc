import DropDown from "components/DropDown.vue";

import utilMixin from './util.mixin';

export default {
    components: {
        DropDown
    },
    mixins: [utilMixin],

    props: {
        size: {
            type: String,
            default: ""
        },
        dataSource: {
            type: Object,
            default: () => {
                return {};
            }
        },
        saveData: {
            type: Function,
            default: () => { }
        },
        placeholder: {
            type: String,
            default: "参数设置"
        }
    },
    watch: {
        dataSource() {
            this.setIsHaveData(this.dataSource);
            this.formData = { ...this.dataSource }
        }
    }
}
