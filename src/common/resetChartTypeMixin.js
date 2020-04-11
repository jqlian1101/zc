import { mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("models", ["curTreeNodeInfo", "getCarDataByNum"])
    },
    methods: {
        ...mapActions("uiState", ["saveCurCarDetail"]),

        resetChartType() {
            let { curTreeNodeInfo } = this;
            let { row, cal } = curTreeNodeInfo;
            if (!row || !cal) {
                this.saveCurCarDetail({});
            } else {
                let car = this.getCarDataByNum(row, cal) || {};
                this.saveCurCarDetail(car);
            }
        }
    },
    mounted() {
        this.resetChartType();
    }
};
