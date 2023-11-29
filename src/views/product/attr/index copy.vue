<template>
  <div style="position: relative">
    <canvas
      id="canvasRef"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
        height: 711px;
        z-index: 1;
      "
    />
    <img src="@/assets/test.webp" style="pointer-events: none; width: 400px" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
const isClick = ref(false);
const position = reactive({
  x: 0,
  y: 0,
});
onMounted(() => {
  const canvas = document.getElementById("canvasRef") as HTMLCanvasElement;
  canvas.width = 400;
  canvas.height = 711;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    canvas.addEventListener("mousedown", (event) => {
      isClick.value = true;
      position.x = event.offsetX;
      position.y = event.offsetY;
      ctx.strokeRect(position.x, position.y, 0, 0);
    });
    canvas.addEventListener("mouseup", (event) => {
      isClick.value = false;
    });
    canvas.addEventListener("mousemove", (event) => {
      if (isClick.value) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(
          position.x,
          position.y,
          event.offsetX - position.x,
          event.offsetY - position.y
        );
      }
    });
  }
});
</script>

<style lang="scss" scoped></style>
