import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

const pathSrc = path.join(__dirname, "./src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 配置选项
      cache: false, // 禁用 eslint 缓存
    }),
    vueJsx({
      // 配置选项
    }),
    // AutoImport({
    //   // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    //   imports: ['vue'],

    //   // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    //   resolvers: [
    //     ElementPlusResolver()
    //   ],

    //   dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    // }),

    // 配置element plus组件全局引入
    // Components({
    //   resolvers: [
    //     // 自动导入 Element Plus 组件
    //     ElementPlusResolver()
    //   ],

    //   dts: path.resolve(pathSrc, 'components.d.ts')
    // })
  ],
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/admin": {
        target: "https://shop.fed.lagounews.com/api",
        changeOrigin: true,
      },
    },
  },
});
