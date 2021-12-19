<template>
    <div class="w-100 h-100">
        <div
            class="sign-container d-flex align-items-center align-content-center justify-content-center"
        >
            <slot></slot>
        </div>

        <div class="bg">
            <img src="https://images8.alphacoders.com/679/679478.jpg" />
        </div>

        <div class="footer">
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import Footer from "../Footer.vue";
</script>

<style scope lang="less">
.bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    z-index: -1;
    top: 0px;
    img {
        max-width: 2000px;
        min-width: 100%;
        min-height: 100%;
        position: relative;

        left: 50%;
        transform: translate(-50%);
    }
}

.footer {
    color: rgb(235, 235, 235) !important;
    position: relative;
    bottom: 0px;
}

.sign-container {
    height: 80%;
    margin: 0 auto;
    padding-top: 50px;
}
</style>
