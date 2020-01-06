<script>
import ConnectDiy from "../Connect/Diy";

export default {
    name: "Diy",
    extends: ConnectDiy,

    methods: {
        // 保存数据
        onSaveData() {
            let data = {
                tcsdId: this.curveId || this.tcsdData.id
            };

            if (!this.field) return;

            this.isHaveData = false;
            if (data.tcsdId) {
                this.isHaveData = true;
            }
            this.saveData({ data, field: this.field });
        },

        cancel() {
            const { tcsdId } = this.dataSource;
            this.getTcsdDataById(this.dataSource.tcsdId);

            if (tcsdId) {
                this.isHaveData = true;
            }
        }
    },
    mounted() {
        this.cacheTcsdData = {};
        this.getTcsdDataById(this.dataSource.tcsdId);
    }
};
</script>
