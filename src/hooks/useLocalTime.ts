/**
 * @description 获取本地时间
 */

import { ref, onMounted, onUnmounted } from "vue";

export function useLocalTime() {
  let year = ref(0);
  let month = ref("");
  let week = ref("");
  let day = ref("");
  let hour = ref("");
  let minute = ref("");
  let second = ref("");

  function getTime() {
    const now = new Date();
    year.value = now.getFullYear();
    month.value = `${now.getMonth() + 1}`;
    week.value = "日一二三四五六".charAt(now.getDay());
    day.value = `${now.getDate()}`;
    hour.value = `${now.getHours()}`.padStart(2, "0");
    minute.value = `${now.getMinutes()}`.padStart(2, "0");
    second.value = `${now.getSeconds()}`.padStart(2, "0");
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

  return { year, month, week, day, hour, minute, second };
}
