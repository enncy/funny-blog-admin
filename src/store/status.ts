import { reactive } from "vue";
import { User } from "../api/models/user";
import { currentRoute, menuRoutes,  router, routes } from "../route";


// 展开的路由
export const openRouteKeys = menuRoutes.value?.children?.filter((r) => !!r.meta?.open).map((r) => r.name) || [];


export const layoutStatus = reactive({
    // 菜单栏是否显示
    collapsed: false,
    // 选择的菜单
    selectedKeys: [currentRoute?.name],
    // 展开的菜单
    openKeys: openRouteKeys,
    // 设置侧边栏是否显示
    visible: false,
});


