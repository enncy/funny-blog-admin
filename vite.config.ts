import ViteComponents, { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://cdn.jsdelivr.net/npm/vue@3.2.10/dist/vue.esm-browser.prod.js
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    plugins: [
        vue(), 

        // antdv 按需加载
        // Components({
        //     resolvers: [AntDesignVueResolver()],
        //     dts: true,
        //     include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        // }),

        // gzip 压缩
        viteCompression(),
    ],
});
