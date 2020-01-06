<template>
    <div>
        <!-- directive -->
        <!-- <div class="images" v-viewer>
            <img src="1.jpg" />
            <img src="2.jpg" />
            ...
        </div>-->
        <!-- component -->
        <viewer :images="images">
            <img v-for="src in images" :src="src" :key="src" />
        </viewer>
    </div>
</template>
<script>

// Viewer
// https://mirari.cc/v-viewer/

import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
    data() {
        return {
            images: [
                "http://img12.3lian.com/gaoqing02/02/93/37.jpg"
            ]
        };
    }
};
</script>
