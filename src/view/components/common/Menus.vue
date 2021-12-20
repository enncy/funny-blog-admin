<template>
    <!-- 多级嵌套路由 -->
    <a-menu
        v-model:selectedKeys="layoutStatus.selectedKeys"
        :open-keys="layoutStatus.openKeys"
    >
        <!-- 遍历菜单路由 -->
        <template v-for="route of menuRoutes.children">
            <RouteMenus :route="route" />
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { MenuProps } from "ant-design-vue";
import { menuRoutes } from "../../../route";
import { layoutStatus } from "../../../store/status";

import RouteMenus from "./RouteMenus.vue";

interface MenusProps extends MenuProps {}

withDefaults(defineProps<MenusProps>(), {});
</script>

<style scope lang="less"></style>
