<template>
    <a-drawer
        title="设置"
        placement="right"
        v-model:visible="layoutStatus.visible"
        :closable="true"
        width="300"
    >
        <!--默认的一些主题颜色-->
        <SimpleCard title="通用主题颜色"  class="mb-4">
            <div class="d-flex">
                <div
                    v-for="(color, index) in themeSetting.selectableColor"
                    class="color-input ms-2"
                    :style="{ backgroundColor: color }"
                    @click="themeSetting.color['@primary-color'] = color"
                    :key="index"
                />
            </div>
        </SimpleCard>

        <!--自定义主色，也就是 @primary-color-->
        <SimpleCard title="自定义主题颜色"  class="mb-4">
            <div class="d-flex flex-wrap">
                <div class="col-12">
                    <span>主题色</span>

                    <label
                        class="color-input"
                        :style="{
                            backgroundColor: themeSetting.color['@primary-color'],
                        }"
                    >
                        <input
                            type="color"
                            class="hidden-color-input"
                            v-model.lazy="themeSetting.color['@primary-color']"
                        />
                    </label>
                </div>
            </div>
        </SimpleCard>

        <SimpleCard title="菜单栏颜色"  class="mb-4">
            <div class="d-flex">
                <template v-for="infos of themeSetting.selectableMenuInfos">
                    <div
                        :style="infos.style"
                        class="color-input border-secondary"
                        @click="
                            () => {
                                themeSetting.menuStyle = infos.style;
                                themeSetting.theme = infos.name;
                            }
                        "
                    />
                </template>
            </div>
        </SimpleCard>

        <a-divider />

        <SimpleCard title="布局管理"  class="mb-4">
            <div>
                <img
                    class="cursor-pointer"
                    @click="themeSetting.layout = 'BaseLayout'"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
                />
                <img
                    class="cursor-pointer ms-2"
                    @click="themeSetting.layout = 'NavigationLayout'"
                    src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"
                />
            </div>
        </SimpleCard>

        <a-divider />

        <SimpleCard title="全局配置"  class="mb-4">
            <p>
                <span>语言 : </span>
                <a-select class="fr" v-model:value="themeSetting.local">
                    <a-select-option key="enUS" value="enUS">English</a-select-option>
                    <a-select-option key="zhCN" value="zhCN">中文</a-select-option>
                </a-select>
            </p>
        </SimpleCard>
    </a-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch } from "vue";
import { themeSetting } from "../../store/setting";
import { layoutStatus } from "../../store/status";
import SimpleCard from "./common/SimpleCard.vue";

watch(themeSetting.color, () => {
    changeColor(themeSetting.color);
});

function changeColor(colors: any) {
    (window as any)?.less?.modifyVars(colors);
}
</script>

<style scope lang="less">
.color-input {
    border: 1px solid rgb(223, 223, 223);
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

.hidden-color-input {
    width: 0px;
    height: 0px;
    border: none;
    padding: 0px;
    margin: 0px;
    background-color: rgba(255, 255, 255, 0);
    opacity: 0;
}
</style>
