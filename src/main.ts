import { createApp } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import App from "./App.vue";
import { router } from "./route";
import antd from "ant-design-vue";
import '@surely-vue/table/dist/index.css'
import STable from '@surely-vue/table';
// 布局注册
import SignLayout from "@/view/components/layout/SignLayout.vue";
import NavigationLayout from "@/view/components/layout/NavigationLayout.vue";
import BaseLayout from "@/view/components/layout/BaseLayout.vue";


// 注册远程 icon
const Icon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3013134_pc3mmckqy1.js", // 在 iconfont.cn 上生成
});

const app = createApp(App);

app.use(router)
    .use(antd)
    .use(STable)
    .component("Icon", Icon)
    .component("SignLayout", SignLayout)
    .component("NavigationLayout", NavigationLayout)
    .component("BaseLayout", BaseLayout)

    .mount("#app");
