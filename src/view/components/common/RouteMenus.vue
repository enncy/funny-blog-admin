<template>
    <!-- 如果存在子路由 -->
    <template v-if="route.children">
        <a-sub-menu :key="route.name" :title="route.meta?.title || '未命名'">
            <template #icon>
                <Icon v-if="route.meta?.icon" :type="route.meta.icon" />
            </template>
            <template v-for="children of route.children">
                <!-- 递归 -->
                <RouteMenus :route="children" />
            </template>
        </a-sub-menu>
    </template>
    <template v-else>
        <a-menu-item :key="route.name" @click="router.push(route.path)">
            <Icon v-if="route.meta?.icon" :type="route.meta.icon" />
            <span class="nav-text"> {{ route.meta?.title || "未命名" }} </span>
        </a-menu-item>
    </template>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
import { router } from "../../../route";

interface RouteMenusProps {
    route: RouteRecordRaw;
}
const props = withDefaults(defineProps<RouteMenusProps>(), {});
const {} = toRefs(props);
</script>

<style scope lang="less"></style>
