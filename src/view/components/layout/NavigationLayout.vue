<template>
    <a-layout>
        <a-layout-header class="header" :style="themeSetting.menuStyle">
            <div class="d-flex flex-nowrap ms-5 me-5">
                <div style="height: 64px">
                    <Logo
                        class="d-flex align-content-center align-items-center justify-content-center me-5"
                        style="height: 64px"
                    />
                </div>
                <slot name="menu" mode="horizontal"></slot>
                <slot name="header"></slot>
            </div>
        </a-layout-header>
        <a-layout-content style="padding-top: 20px !important;" class="p-1 p-md-3 p-lg-5  overflow-auto">
            <slot></slot>
        </a-layout-content>
        <a-layout-footer class="text-center bg-white">
            <slot name="footer">
                <Footer />
            </slot>
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { themeSetting } from "../../../store/setting";

import Footer from "../Footer.vue";
import Logo from "../Logo.vue";
</script>

<style scope lang="less"></style>
