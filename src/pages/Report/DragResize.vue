<template>
    <vue-drag-resize
        :isActive="true"
        :w="200"
        :h="200"
        :preventActiveBehavior="true"
        :parentLimitation="true"
        v-on:resizing="resize"
        v-on:dragging="resize"
    >
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }}</p>
        <p>{{ width }} х {{ height }}</p>
    </vue-drag-resize>
</template>

<script>
export default {
    name: "app",

    components: {},

    data() {
        return {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };
    },

    methods: {
        resize(newRect) {
            this.width = newRect.width;
            this.height = newRect.height;
            this.top = newRect.top;
            this.left = newRect.left;
        }
    }
};
</script>
