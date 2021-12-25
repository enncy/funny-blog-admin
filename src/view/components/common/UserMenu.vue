<template>
    <a-dropdown placement="bottomCenter">
        <a-menu mode="horizontal" :theme="theme">
            <a-menu-item key="userMenu">
                <div>
                    <a-avatar class="me-2">{{ user.role || "user" }}</a-avatar>
                    {{ user.account || "未登录" }}
                </div>
            </a-menu-item>
        </a-menu>

        <template #overlay>
            <a-menu>
                <a-menu-item @click="$router.push('/login')">
                    <Icon type="icon-login" />
                    <a>登录</a>
                </a-menu-item>

                <a-menu-item>
                    <a href="https://blog.enncy.cn">
                        <Icon type="icon-logout" />
                        <span>博客首页</span>
                    </a>
                </a-menu-item>

                <a-menu-item @click="logout">
                    <Icon type="icon-logout" />
                    <a>退出</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { MenuTheme, message } from "ant-design-vue";
import { ref, reactive, toRefs } from "vue";
import { handleApiSync } from "../../../api";
import { UserApi } from "../../../api/user";
import { router } from "../../../route";

import { themeSetting } from "../../../store/setting";
import { user } from "../../../store/user";
interface UserMenuProps {
    theme: MenuTheme;
}
const props = withDefaults(defineProps<UserMenuProps>(), {
    theme: themeSetting.theme,
});
const {} = toRefs(props);

async function logout() {
    const res = await handleApiSync(UserApi.logout());
    if (res?.data.success) {
        message.success(res.data.msg);
    }
}
</script>
<style scope lang="less">
.ant-menu-submenu-title {
    padding: 0px;
}
</style>
