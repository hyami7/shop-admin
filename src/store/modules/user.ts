import { defineStore } from "pinia";
// import type { RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import { IUserInfo } from "@/api/types/common";
import { setItem, getItem } from "@/utils/storage";
import { USER } from "@/utils/constants";
import { ElMessage, ElMessageBox } from "element-plus";
import { logout } from "@/api/common";
import { useRouter } from "vue-router";

const state = {
  isCollapse: false,
  user: getItem<{ token: string } & IUserInfo>(USER),
  // user: JSON.parse(window.localStorage.getItem('user') || 'null') as IUserInfo | null
};

type IUser = ({ token: string } & IUserInfo) | null;

export type State = typeof state;

export const useUserStore = defineStore({
  id: "user",
  state: (): State => state,
  getters: {},
  actions: {
    setIsCollapse(payload: boolean) {
      this.isCollapse = payload;
    },
    setUser(payload: IUser) {
      this.user = payload;
      setItem(USER, this.user);
    },
    logout() {
      ElMessageBox.confirm("确认退出吗？", {})
        .then(async () => {
          await logout();
          ElMessage.success("退出成功！");
          this.setUser(null);
          const router = useRouter();
          router.push({ name: "login" });
        })
        .catch(() => {});
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
