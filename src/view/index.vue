<template>
    <component :is="themeSetting.layout" v-model:collapsed="layoutStatus.collapsed">
        <template v-slot:menu="props">
            <Menus style="height: 64px" :theme="themeSetting.theme" :mode="props.mode" />
        </template>
        <template v-slot:header="props">
            <div class="w-100">
                <div
                    class="fr text-center d-flex"
                    :class="props.theme || themeSetting.theme"
                >
                    <!-- 这里以父布局的变量为准，如果父布局没有指定主题，则使用设置里面的主题 -->
                    <UserMenu :theme="props.theme || themeSetting.theme" />
                    <Icon
                        @click="layoutStatus.visible = !layoutStatus.visible"
                        type="icon-setting"
                        class="pointer header-icon"
                    />
                </div>
            </div>
        </template>
        <template #default>
            <div style="min-height: 340px">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in" :duration="200">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
            <SettingDrawer />
        </template>
    </component>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from "vue";
import { themeSetting } from "../store/setting";

import Menus from "./components/common/Menus.vue";

import SettingDrawer from "./components/SettingDrawer.vue";
import UserMenu from "./components/common/UserMenu.vue";
import { layoutStatus } from "../store/status";
</script>

<style scope lang="less">
.header-icon {
    line-height: 64px;
    width: 64px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
