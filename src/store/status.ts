import { reactive } from "vue";
 

export const layoutStatus = reactive({
    // 菜单栏是否显示
    collapsed: false,
    // 选择的菜单
    selectedKeys: ["1"],
    // 设置侧边栏是否显示
    visible: false,
});
