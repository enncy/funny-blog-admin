import { createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/view/index.vue"),

        children: [
            {
                path: "/dashboard",
                component: () => import("@/view/dashboard/index.vue"),
            },
            {
                path: "/user",
                component: () => import("@/view/user/index.vue"),
            },
            {
                path: "/tables",
                component: () => import("@/view/tables/index.vue"),
            },
            {
                path: "/setting",
                component: () => import("@/view/setting/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/view/login/index.vue"),
    },

    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/view/components/NotFound.vue"),
        meta: {
            title: "404",
        },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
