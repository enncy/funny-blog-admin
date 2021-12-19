<template>
    <a-layout>
        <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
            v-model:collapsed="collapsed"
            @collapse="emits('update:collapsed', collapsed)"
        >
            <Logo style="height: 32px; margin: 16px" />
            <slot name="menu" mode="inline"></slot>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="bg-white ps-4 pe-4 d-flex">
                <slot name="header"></slot>
            </a-layout-header>
            <a-layout-content class="p-5">
                <slot></slot>
            </a-layout-content>
            <a-layout-footer class="text-center">
                <slot name="footer">
                    <Footer />
                </slot>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import Footer from "../Footer.vue";
import Logo from "../Logo.vue";

interface BaseLayoutProps {
    collapsed?: boolean;
}

const emits = defineEmits<{
    (e: "update:collapsed", v: boolean);
}>();

const props = withDefaults(defineProps<BaseLayoutProps>(), {
    collapsed: false,
});
const {} = toRefs(props);
</script>

<style scope lang="less"></style>
