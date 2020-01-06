<!-- 车辆参数 制动系统弹层 -->
<template>
    <DropDown
        :save="save"
        :resetData="clearData"
        :placeholder="placeholder"
        :title="$attrs.title"
        :isHaveData="isHaveData"
        :cancel="cancel"
    >
        <!-- <div class="dropPanel"> -->
        <el-form ref="form" label-position="left" :model="formData" label-width="160px">
            <el-form-item label="最大变形">
                <input-number-wrap suffix="m">
                <el-input-number :controls="false" v-model="formData.selas" :min="0"></el-input-number>
                </input-number-wrap>
            </el-form-item>
            <el-form-item label="总刚度">
                <input-number-wrap suffix="N/m">
                <el-input-number :controls="false" v-model="formData.kelas" :min="0"></el-input-number>
                </input-number-wrap>
            </el-form-item>
        </el-form>
        <!-- </div> -->
    </DropDown>
</template>

<script>
import mixin from "./mixin/mixin";
import mixinData from "./mixin/mixinData";

export default {
    name: "RubberBearing",
    mixins: [mixin, mixinData]
};
</script>
