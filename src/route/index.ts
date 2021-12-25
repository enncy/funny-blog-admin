import { message } from "ant-design-vue";
import { ref, watch } from "vue";
import { createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { user } from "../store/user";

export const routes = ref<RouteRecordRaw[]>([
    {
        path: "/",
        name: "index",
        component: () => import("@/view/index.vue"),
        redirect: "/dashboard",
        meta: {
            title: "首页",
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "导航栏",
                    icon: "icon-dashboard",
                },
                component: () => import("@/view/dashboard/index.vue"),
            },
            {
                path: "/user",
                name: "user",
                meta: {
                    title: "个人信息",
                    icon: "icon-user",
                },
                component: () => import("@/view/user/index.vue"),
            },
            {
                path: "/tables",
                name: "tables",
                meta: {
                    title: "信息管理",
                    icon: "icon-table",
                    open: true,
                },
                component: () => import("@/view/tables/index.vue"),
                redirect: "user",
                children: [
                    {
                        path: "user",
                        name: "tables-user",
                        component: () => import("@/view/tables/user/index.vue"),
                        meta: {
                            title: "用户管理",
                            icon: "icon-team",
                        },
                    },
                    {
                        path: "blog",
                        name: "tables-blog",
                        component: () => import("@/view/tables/blog/index.vue"),
                        meta: {
                            title: "文章管理",
                            icon: "icon-file-text",
                        },
                    },
                    {
                        path: "setting",
                        name: "tables-setting",
                        meta: {
                            title: "系统设置",
                            icon: "icon-setting",
                        },
                        component: () => import("@/view/tables/setting/index.vue"),
                    },
                ],
            },

            {
                path: "/:pathMatch(.*)*",
                name: "404",

                component: () => import("@/view/components/NotFound.vue"),
                meta: {
                    title: "404",
                    icon: "icon-infos",
                },
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/view/login/index.vue"),
    },
]);

// 菜单主路由
export const menuRoutes = ref(routes.value.find((r) => r.name === "index"));

// 当前路由
export const currentRoute = menuRoutes.value?.children?.find((r) => r.path === window.location.pathname);

export const router = createRouter({
    history: createWebHistory(),
    routes: routes.value,
});

router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next();
    } else {
        if (user.account === "") {
            router.push("/login");
        } else {
            if (user.role === "admin") {
                next();
            } else {
                router.push("/login");
                message.error("权限不足");
            }
        }
    }
});
