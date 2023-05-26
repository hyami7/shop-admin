import { defineStore } from "pinia";
import { setItem, getItem } from "@/utils/storage";
import { IS_LOCK } from "@/utils/constants";

// 五分钟未操作自动锁屏
const initTime = 60 * 5 * 1000;
const islock = !!getItem(IS_LOCK);

const state = {
  islock,
  time: islock ? initTime : 0,
};

export type State = typeof state;

export const useLockScreen = defineStore({
  id: "lockScreen",
  state: (): State => state,
  getters: {},
  actions: {
    setLock(lock: boolean) {
      this.islock = lock;
      setItem(IS_LOCK, String(this.islock));
    },
    setLockTime(time = initTime) {
      this.time = time;
    },
  },
});
