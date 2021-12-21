<template>
    <a-config-provider :locale="themeSetting.local === 'enUS' ? enUS : zhCN">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from 'ant-design-vue/es/locale/en_US';
import { themeSetting } from "./store/setting";
import { useRoute, useRouter } from "vue-router";


</script>

<style lang="less">
@import "@/assets/css/common.css";
@import "@/assets/css/bootstrap.css";
</style>
