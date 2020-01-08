
import { mapActions, mapGetters } from "vuex";

export default {
    methods: {
        ...mapActions("uiState", ["saveDefinedEleStatus", 'initEleStatus']),

        beforeunloadFn (e) {
            // if (!this.curCarNum) return;
            // const { row, cal } = this.curCarNum
            // this.initEleStatus(`${row}-${cal}`)
        }
    },
    computed: {
        ...mapGetters("models", ["curCarNum"])
    },
    watch: {
        isHaveData (val) {
            if (!this.$attrs.eleKey && !this.eleKey) return;
            const eleKey = this.$attrs.eleKey || !this.eleKey;

            const eleParentType = this.$attrs.eleParentType;

            if (!this.curCarNum) return;
            const { row, cal } = this.curCarNum

            let isDefined = !!val;

            this.saveDefinedEleStatus({
                id: `${row}-${cal}`,
                type: eleParentType,
                eleKey,
                isDefined: isDefined
            })
        }
    },

    mounted () {
        window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },

    destroyed () {
        window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    }
}
