<template>
    <div :class="$style.root">
        <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="draggable"
            :is-resizable="resizable"
            :vertical-compact="true"
            :use-css-transforms="true"
            :responsive="true"
            @layout-created="layoutCreatedEvent"
            @layout-before-mount="layoutBeforeMountEvent"
            @layout-mounted="layoutMountedEvent"
            @layout-ready="layoutReadyEvent"
            @layout-updated="layoutUpdatedEvent"
        >
            <grid-item
                v-for="(item,idx) in layout"
                :key="idx"
                :static="item.static"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                @resize="resizeEvent"
                @move="moveEvent"
                @resized="resizedEvent"
                @moved="movedEvent"
            >
                <div :class="$style.gridContent">{{itemTitle(item)}}</div>
                <!-- <slot></slot> -->
            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
export default {
    name: "GridLayoutComponent",

    components: {},
    props: {
        layout: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            draggable: true,
            resizable: true,
            index: 0
        };
    },

    methods: {
        itemTitle(item) {
            var result = item.i;
            if (item.static) {
                result += " - Static";
            }
            return result;
        },
        layoutCreatedEvent: function(newLayout) {
            console.log("Created layout: ", newLayout);
        },
        layoutBeforeMountEvent: function(newLayout) {
            console.log("beforeMount layout: ", newLayout);
        },
        layoutMountedEvent: function(newLayout) {
            console.log("Mounted layout: ", newLayout);
        },
        layoutReadyEvent: function(newLayout) {
            console.log("Ready layout: ", newLayout);
        },
        layoutUpdatedEvent: function(newLayout) {
            console.log("Updated layout: ", newLayout);
        },

        moveEvent: function(i, newX, newY) {
            console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
        },
        resizeEvent: function(i, newH, newW, newHPx, newWPx) {
            console.log(
                "RESIZE i=" +
                    i +
                    ", H=" +
                    newH +
                    ", W=" +
                    newW +
                    ", H(px)=" +
                    newHPx +
                    ", W(px)=" +
                    newWPx
            );
        },
        movedEvent: function(i, newX, newY) {
            console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
        },
        /**
         *
         * @param i the item id/index
         * @param newH new height in grid rows
         * @param newW new width in grid columns
         * @param newHPx new height in pixels
         * @param newWPx new width in pixels
         *
         */
        resizedEvent: function(i, newH, newW, newHPx, newWPx) {
            console.log(
                "RESIZED i=" +
                    i +
                    ", H=" +
                    newH +
                    ", W=" +
                    newW +
                    ", H(px)=" +
                    newHPx +
                    ", W(px)=" +
                    newWPx
            );
        }
    }
};
</script>

<style module lang="scss">
.root {
    .gridContent {
        padding: 10px;
    }
    :global {
        .vue-grid-item {
            background-color: #fff;
        }
    }
}
</style>

