<template>
    <component :is="layout" v-model:collapsed="collapsed">
        <template v-slot:menu="props">
            <Menus v-model:selectedKeys="selectedKeys" theme="dark" :mode="props.mode" />
        </template>
        <template #header>
            <div class="fl" v-if="layout === 'BaseLayout'">
                <!-- trigger -->
                <a-button
                    class="d-md-inline-block d-none"
                    type="text"
                    size="large"
                    @click="collapsed = !collapsed"
                >
                    <Icon type="icon-outdent" />
                </a-button>
            </div>
            <div class="fr w-100 text-end">
                <a-button
                    type="text"
                    size="large"
                    :style="{ color: layout === 'BaseLayout' ? 'black' : 'white' }"
                    @click="visible = !visible"
                >
                    <Icon type="icon-setting" />
                </a-button>
            </div>
        </template>
        <template #default>
            <div class="bg-white" style="min-height: 340px">
                <router-view></router-view>
            </div>
     
            <a-drawer
                title="设置"
                placement="right"
                v-model:visible="visible"
                :closable="true"
            >
                <!--默认的一些主题颜色-->
                <SimpleCard title="通用主题颜色">
                    <div class="d-flex">
                        <div
                            v-for="(color, index) in themeSetting.selectableColor"
                            class="color-input"
                            :style="{ backgroundColor: color }"
                            @click="themeSetting.color['@primary-color'] = color"
                            :key="index"
                        />
                    </div>
                </SimpleCard>

                <!--自定义主色，也就是 @primary-color-->
                <SimpleCard title="自定义主题颜色">
                    <a-row>
                        <a-col>
                            <span>主题色</span>
                            <input
                                type="color"
                                v-model="themeSetting.color['@primary-color']"
                                class="color-input"
                                style="border: none"
                            />
                            <a-divider type="vertical" />
                            <span>成功色</span>
                            <input
                                type="color"
                                v-model="themeSetting.color['@success-color']"
                                class="color-input"
                                style="border: none"
                            />
                        </a-col>

                        <a-col>
                            <span>警告色</span>
                            <input
                                type="color"
                                v-model="themeSetting.color['@warning-color']"
                                class="color-input"
                                style="border: none"
                            />
                            <a-divider type="vertical" />
                            <span>错误色</span>
                            <input
                                type="color"
                                v-model="themeSetting.color['@error-color']"
                                class="color-input"
                                style="border: none"
                            />
                        </a-col>
                    </a-row>
                </SimpleCard>

                <!-- <SimpleCard title="菜单栏颜色">
                    <div class="d-flex">
                        <div
                            style="background-color: #fff; border: 1px solid gray"
                            class="color-input"
                            @click="updateMenuTheme('light')"
                        />
                        <div
                            style="background-color: #2c3e50"
                            class="color-input"
                            @click="updateMenuTheme('dark')"
                        />
                    </div>
                </SimpleCard> -->

                <a-divider />

                <SimpleCard title="布局管理">
                    <div>
                        <img
                            class="cursor-pointer"
                            @click="layout = 'BaseLayout'"
                            src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
                        />
                        <img
                            class="cursor-pointer"
                            @click="layout = 'NavigationLayout'"
                            src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"
                        />
                    </div>
                </SimpleCard>
            </a-drawer>
        </template>
    </component>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from "vue";

import Menus from "./components/common/Menus.vue";
import Logo from "./components/Logo.vue";
import { useRoute, useRouter } from "vue-router";

import { computed } from "vue";
import SimpleCard from "./components/common/SimpleCard.vue";

type LayoutType = "BaseLayout" | "NavigationLayout";

// 布局
const layout = ref<LayoutType>("NavigationLayout");

// 菜单栏是否显示
const collapsed = ref(false);
// 选择的菜单
const selectedKeys = ref<string[]>(["1"]);
// 设置侧边栏是否显示
const visible = ref(false);

interface ThemeSettingConfigs {
    selectableColor: string[];
    color: {
        //主色
        "@primary-color": string;
        //成功色
        "@success-color": string;
        //警告色
        "@warning-color": string;
        //错误色
        "@error-color": string;
    };
}

// 主题设置
const themeSetting: ThemeSettingConfigs = reactive<ThemeSettingConfigs>({
    // 可选颜色
    selectableColor: [
        "#1890ff",
        "#f5222d",
        "#fa541c",
        "#faad14",
        "#52c41a",
        "#2f54eb",
        "#722ed1",
    ],
    //主题颜色
    color: {
        "@primary-color": "#1890ff",
        "@success-color": "#52c41a",
        "@warning-color": "#faad14",
        "@error-color": "#f5222d",
    },
});

watch(themeSetting.color, () => {
    changeColor(themeSetting.color);
});

function changeColor(colors: any) {
    (window as any)?.less?.modifyVars(colors);
}
</script>

<style scope lang="less">
.color-input {
    border: 1px solid white;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    background: white;
    margin: 0px 2px 0px 2px;
    cursor: pointer;
}
.cursor-pointer {
    cursor: pointer;
}

img{
    width: 64px;
}
</style>
