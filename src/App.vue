<template>
    <router-view  v-slot="{ Component }">
        <transition name="fade">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>

</script>

<style lang="less">
@import "@/assets/css/common.css";
@import "@/assets/css/bootstrap.css";
</style>
