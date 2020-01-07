<template>
    <div :class="$style.root">
        <div :class="$style.notice">请先下载模版文件，根据模版文件的格式填写完毕后，依次上传，最后点击‘合成线路信息’按钮</div>
        <a :class="[$style.fileUpload,$style.downTempBtn]" href="/file/temp.rar">下载模版文件</a>
        <ul :class="$style.fileList" class="clearfix">
            <li class="fll" :class="$style.fileUpload">
                <FileUploadComp key="ramp" fileType="ramp" :uploadCb="uploadCb">线路坡道信息文件</FileUploadComp>
            </li>
            <li class="fll" :class="$style.fileUpload">
                <FileUploadComp key="curve" fileType="curve" :uploadCb="uploadCb">线路曲线信息文件</FileUploadComp>
            </li>
            <li class="fll" :class="$style.fileUpload">
                <FileUploadComp key="tunnel" fileType="tunnel" :uploadCb="uploadCb">线路隧道信息文件</FileUploadComp>
            </li>
        </ul>

        <div :class="$style.submitBtn" class="cursor-p" @click="calculateFile">合成线路信息计算</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { MODEL_TREE_TYPE } from "common/constants";

import msgCenter from "utils/msgCenter";
import { GLOBAL_MSG_CENTER_TOKEN } from "common/constants";

import { getUserIdAndType } from "utils/util";
import config from "api/config";

import { circuit } from "api";

import FileUploadComp from "./FileUpload";

export default {
    name: "Circuit",
    components: {
        FileUploadComp
    },
    data() {
        return {
            url: `${config.baseUrl}/lp/uploadExcel`,
            ramp: [],
            curve: []
        };
    },
    props: {},
    methods: {
        uploadCb(data, fileType) {
            // console.log("uploadCb", data, fileType);
            this.responseFilesName[fileType] = data.fileName;
        },

        // 合成文件
        calculateFile() {
            const { responseFilesName, curModelId: modelId } = this;
            const {
                ramp: fileNameRamp,
                curve: fileNameCurve,
                tunnel: fileNameTunnel
            } = responseFilesName;

            if (!fileNameRamp) {
                return this.$message.error("请上传线路坡道信息文件");
            }
            if (!fileNameCurve) {
                return this.$message.error("请上传线路曲线信息文件");
            }
            if (!fileNameTunnel) {
                return this.$message.error("请上传线路隧道信息文件");
            }

            circuit
                .calculateExcel({
                    fileNameRamp,
                    fileNameCurve,
                    fileNameTunnel,
                    modelId
                })
                .then(res => {
                    if (!res) return;
                    this.$message.info("操作成功");
                });
        }
    },
    computed: {
        ...mapState("models", ["curModelId"]),
        userId() {
            const { userId } = getUserIdAndType();
            return userId;
        }
    },
    mounted() {
        this.responseFilesName = {
            ramp: "",
            curve: "",
            tunnel: ""
        };

        this.subToken = msgCenter.subscribe(
            GLOBAL_MSG_CENTER_TOKEN.auto_save,
            (topic, data) => {
                data.success();
            }
        );
    },
    beforeDestroy() {
        msgCenter.unsubscribe(this.subToken);
    }
};
</script>


<style module lang="scss">
.root {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #fff;
    border-radius: $radius_1;
    .fileList {
        margin: 20px 0;
    }

    .fileUpload {
        width: 150px;
        height: 30px;
        line-height: 30px;
        border: 1px solid $highlight-color_1;
        color: $highlight-color_1;
        margin-right: 20px;
        text-align: center;
        overflow: hidden;

        &:last-child {
            margin-right: 0;
        }

        :global {
            .file-uploads {
                width: 100%;
                height: 100%;
                label {
                    cursor: pointer;
                }
            }
        }
    }

    .downTempBtn {
        display: inline-block;
        margin: 20px 0 10px;
        width: 100px;
    }

    .submitBtn {
        display: inline-block;
        padding: 5px 20px;
        background-color: $highlight-color_1;
        color: #fff;
        border-radius: 4px;
    }
}
</style>


