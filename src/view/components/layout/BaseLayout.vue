<template>
    <a-layout>
        <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
            class="box-shadow-base"
            v-model:collapsed="layoutStatus.collapsed"
            :style="themeSetting.menuStyle"
            style="z-index: 999;"
        >
            <div
                class="mb-3 d-flex justify-content-center align-content-center align-items-center"
                style="height: 64px"
            >
                <Logo />
            </div>

            <slot name="menu" mode="inline"></slot>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="bg-white ps-1 pe-1 pe-lg-5 d-flex">
                <div class="fl">
                    <!-- trigger -->
                    <Icon
                        type="icon-outdent"
                        @click="layoutStatus.collapsed = !layoutStatus.collapsed"
                        :rotate="layoutStatus.collapsed ? 180 : 0"
                        class="pointer  d-none d-lg-inline-block"
                        style="line-height: 64px; width: 64px"
                    />
                </div>
                <slot name="header" theme="light"></slot>
            </a-layout-header>
            <a-layout-content class="p-1 p-md-3 p-lg-5 overflow-auto">
                <slot></slot>
            </a-layout-content>
            <a-layout-footer  class="text-center bg-white">
                <slot name="footer">
                    <Footer />
                </slot>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { themeSetting } from "../../../store/setting";
import { layoutStatus } from "../../../store/status";
import Footer from "../Footer.vue";
import Logo from "../Logo.vue";
</script>

<style scope lang="less"></style>
