import utilMixin from './util.mixin';

export default {
    mixins: [utilMixin],
    data() {
        return {
            formData: { ...this.dataSource }
        };
    },

    mounted() {
        this.cacheFormData = { ...this.dataSource };
    },

    watch: {
        dataSource() {
            this.formData = { ...this.dataSource };
            this.cacheFormData = { ...this.dataSource };
        }
    },
    methods: {
        // 保存数据
        save() {
            return new Promise((resolve) => {
                let datas = {
                    ...this.formData
                };

                this.setIsHaveData(datas);

                this.saveData({ datas });
                resolve(true);
            })
        },
        clearData() {
            this.formData = {}
        },
        cancel() {
            this.formData = { ...this.dataSource };
            this.setIsHaveData(this.formData);
        }
    }
}
