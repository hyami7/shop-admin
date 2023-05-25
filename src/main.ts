import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
// import ElementPlus from './plugins/element-plus'

// 加载全局样式
import "./styles/index.scss";

// import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(store, key);
// app.use(ElementPlus)
app.mount("#app");
