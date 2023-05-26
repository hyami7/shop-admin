/**
 * @description 获取本地时间
 */

import { reactive, onMounted, onUnmounted } from "vue";

export function useLocalTime() {
  const state = reactive({
    year: 0,
    month: "",
    week: "",
    day: "",
    hour: "",
    minute: "",
    second: "",
  });

  function getTime() {
    const now = new Date();
    state.year = now.getFullYear();
    state.month = `${now.getMonth()}`.padStart(2, "0");
    state.week = "日一二三四五六".charAt(now.getDay());
    state.day = `${now.getDate()}`.padStart(2, "0");
    state.hour = `${now.getHours()}`.padStart(2, "0");
    state.minute = `${now.getMinutes()}`.padStart(2, "0");
    state.second = `${now.getSeconds()}`.padStart(2, "0");
  }

  getTime();
  let timer: number | undefined;

  onMounted(() => {
    clearInterval(timer);
    timer = window.setInterval(() => getTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return state;
}
