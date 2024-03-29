/* eslint-disable no-unused-vars */
import { Store } from "vuex";
import { State } from "./store";

declare module "@vue/runtime-core" {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
