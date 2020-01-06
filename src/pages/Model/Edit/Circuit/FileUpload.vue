<template>
    <file-upload
        :input-id="fileType"
        ref="fileUpload"
        v-model="files"
        name="excelUpload"
        :post-action="url"
        :data="{userId}"
        @input-file="inputFile"
        @input-filter="inputFilter"
    >
        <slot></slot>
    </file-upload>
</template>

<script>
import { mapState } from "vuex";

import { getUserIdAndType } from "utils/util";
import config from "api/config";

import loading from "utils/loading";

export default {
    name: "FileUploadComp",
    components: {},
    data() {
        return {
            url: `${config.baseUrl}/lp/uploadExcel`,
            files: []
        };
    },

    props: {
        fileType: {
            required: true
        },
        uploadCb: {
            default: () => {}
        }
    },
    computed: {
        ...mapState("models", ["curModelId"]),
        userId() {
            const { userId } = getUserIdAndType();
            return userId;
        }
    },
    watch: {
        files() {
            if (this.files.length > 0 && loading.num === 0) {
                loading.show();
            } else if (this.files.length === 0) {
                loading.hide();
            }
        }
    },
    methods: {
        /**
         * Has changed
         * @param  Object|undefined   newFile   只读
         * @param  Object|undefined   oldFile   只读
         * @return undefined
         */
        inputFile(newFile, oldFile, field) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                // 获得相应数据
                // console.log("response", newFile.response);
                const { response = {} } = newFile;
                const { code, message, data = {} } = response;

                if (newFile.xhr) {
                    //  获得响应状态码
                    // console.log(newFile.xhr.status);
                    if (newFile.xhr.status !== 200) {
                        return this.$message.error("网络连接失败");
                    }
                }

                if (code !== "200") {
                    return this.$message.error(message || "上传失败");
                }

                this.$refs.fileUpload.active = false;
                this.$refs.fileUpload.clear();

                // this.responseFilesName[field] = data.fileName;
                // console.log(data);
                this.uploadCb(data, this.$refs.fileUpload.inputId);
            }
        },
        /**
         * Pretreatment
         * @param  Object|undefined   newFile   读写
         * @param  Object|undefined   oldFile   只读
         * @param  Function           prevent   阻止回调
         * @return undefined
         */
        inputFilter: function(newFile, oldFile, prevent, field) {
            // 过滤不是图片后缀的文件
            if (!/\.(xls)$/i.test(newFile.name)) {
                this.$message.error("请选择正确的文件格式");
                return prevent();
            }

            this.$refs.fileUpload.active = true;
        }
    },

    mounted() {}
};
</script>


