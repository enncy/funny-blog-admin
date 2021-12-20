<template>
    <a-menu v-model:selectedKeys="layoutStatus.selectedKeys">
        <a-menu-item key="1" @click="router.push('/dashboard')">
            <Icon type="icon-dashboard" />
            <span class="nav-text">导航栏</span>
        </a-menu-item>
        <a-menu-item key="2" @click="router.push('/user')">
            <Icon type="icon-user" />
            <span class="nav-text">个人信息</span>
        </a-menu-item>
        <a-menu-item key="3" @click="router.push('/tables')">
            <Icon type="icon-table" />
            <span class="nav-text">信息管理</span>
        </a-menu-item>
        <a-menu-item key="4" @click="router.push('setting')">
            <Icon type="icon-setting" />
            <span class="nav-text">系统设置</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { MenuProps } from "ant-design-vue";
import { ref, reactive, toRefs } from "vue";
import { router } from "../../../route";
import { layoutStatus } from "../../../store/status";

interface MenusProps extends MenuProps {}

withDefaults(defineProps<MenusProps>(), {});
</script>

<style scope lang="less"></style>
