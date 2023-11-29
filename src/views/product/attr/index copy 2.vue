<template>
  <div>
    <iframe src="http://127.0.0.1:8080/#/home" frameborder="0"></iframe>
    <el-select v-model="currentType" @change="changeType">
      <el-option label="默认(框选)" value="default" />
      <el-option label="绘制矩形" value="rect" />
    </el-select>
    <div style="position: relative">
      <canvas
        id="canvas"
        width="600"
        height="600"
        style="border: 1px solid #ccc"
      ></canvas>

      <div
        v-show="oprate.show"
        class="oprate"
        :style="`top: ${oprate.top}px; left: ${oprate.left}px`"
      >
        <el-button @click="delEl">删除</el-button>
        <el-input
          v-model="oprate.input"
          placeholder="请输入"
          style="width: 120px"
          @blur="blurInput"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { fabric } from "fabric";

let canvas = null;
let activeEl = null;
const oprate = reactive({
  top: 0,
  left: 0,
  show: false,
  input: "",
});

let currentType = ref("default");

function changeType(val) {
  switch (val) {
    case "default":
      canvas.selection = true;
      canvas.selectionColor = "rgba(100, 100, 255, 0.3)";
      canvas.selectionBorderColor = "rgba(230, 46, 52)";
      canvas.skipTargetFind = false; // 允许选中
      break;
    case "rect":
      canvas.selectionColor = "transparent";
      canvas.selectionBorderColor = "rgba(230, 46, 52)";
      canvas.skipTargetFind = true; // 禁止选中
      break;
  }
}

function init() {
  canvas = new fabric.Canvas("canvas");

  canvas.on("mouse:down", canvasMouseDown);
  canvas.on("mouse:up", canvasMouseUp);
  canvas.on("mouse:move", canvasMouseMove);
}

let downPoint = null; // 鼠标按下的坐标

const setOpratePosition = (top, left) => {
  oprate.top = top + 8;
  oprate.left = left + 8;
};

function canvasMouseDown(e) {
  downPoint = e.absolutePointer;

  if (e.target && e.target.type === "rect") {
    activeEl = e.target;
    oprate.show = true;

    setOpratePosition(e.target.top, e.target.left);
  }
}

function canvasMouseMove(e) {
  if (activeEl && e.target && e.target.type === "rect") {
    setOpratePosition(e.target.top, e.target.left);
  }
}

function canvasMouseUp(e) {
  if (currentType.value === "rect") {
    createRect(e.absolutePointer);
    currentType.value = "default";
    canvas.skipTargetFind = false; // 允许选中

    // activeEl = null;
  }
}

function createRect(pointer) {
  if (JSON.stringify(downPoint) === JSON.stringify(pointer)) {
    return;
  }

  let top = Math.min(downPoint.y, pointer.y);
  let left = Math.min(downPoint.x, pointer.x);
  let width = Math.abs(downPoint.x - pointer.x);
  let height = Math.abs(downPoint.y - pointer.y);

  const rect = new fabric.Rect({
    top,
    left,
    width,
    height,
    fill: "rgba(230, 46, 52, .1)",
    stroke: "rgba(230, 46, 52)",
  });

  rect.lockRotation = true; // 禁止旋转

  canvas.add(rect);
  downPoint = null;
}

const createLine = (pointer) => {
  const line = new fabric.Line(pointer, {
    stroke: "red",
  });
  canvas.add(line);
};

const delEl = () => {
  canvas.remove(activeEl);
  activeEl = null;
  oprate.show = false;
};

const blurInput = (val) => {
  // 生成标注
  console.log(activeEl);
  let x = activeEl.left + activeEl.width;
  let y = activeEl.top;
  const line = createLine([x, y, x + 100, y - 100]);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.oprate {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
