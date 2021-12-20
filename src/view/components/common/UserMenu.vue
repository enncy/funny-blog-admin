<template>
    <a-dropdown placement="bottomCenter">
        <a-menu mode="horizontal" :theme="theme">
            <a-menu-item key="userMenu">
                <div>
                    <a-avatar class="me-2">User</a-avatar>
                    未登录
                </div>
            </a-menu-item>
        </a-menu>

        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <Icon type="icon-login" />
                    <a href="#">登录</a>
                </a-menu-item>
                <a-menu-item>
                    <Icon type="icon-logout" />
                    <a href="#">退出</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { MenuTheme } from "ant-design-vue";
import { ref, reactive, toRefs } from "vue";

import { themeSetting } from "../../../store/setting";
interface UserMenuProps {
    theme: MenuTheme;
}
const props = withDefaults(defineProps<UserMenuProps>(), {
    theme: themeSetting.theme,
});
const {} = toRefs(props);
</script>
<style scope lang="less">
.ant-menu-submenu-title {
    padding: 0px;
}
</style>
