import { MenuProps } from "ant-design-vue";
import { ref, reactive } from "vue";

type LayoutType = "BaseLayout" | "NavigationLayout";

// 主题设置

interface ThemeSettingConfigs {
    // 语言
    local:'enUS'|'zhCN',
    layout: LayoutType;
    theme: MenuProps["theme"];
    selectableColor: string[];
    menuStyle: any;
    selectableMenuInfos: { name: MenuProps["theme"]; style: any }[];
    color: {
        //主色
        "@primary-color": string;
    };
}

const selectableMenuInfos: { name: MenuProps["theme"]; style: any }[] = [
    {
        name: "dark",
        style: {
            backgroundColor: "#001529",
            color: "#fff",
        },
    },
    {
        name: "light",
        style: {
            backgroundColor: "#fff",
            color: "black",
        },
    },
];

// 主题设置
export const themeSetting: ThemeSettingConfigs = reactive<ThemeSettingConfigs>({
    local:'zhCN',
    layout: "BaseLayout",
    theme: "dark",
    // 主题可选颜色
    selectableColor: ["#1890ff", "#f5222d", "#fa541c", "#faad14", "#52c41a", "#2f54eb", "#722ed1"],
    menuStyle: selectableMenuInfos.find((s) => s.name === "dark")?.style,
    // 菜单可选颜色
    selectableMenuInfos: selectableMenuInfos,
    //主题颜色
    color: {
        "@primary-color": "#1890ff",
    },
});
