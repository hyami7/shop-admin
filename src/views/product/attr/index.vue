<template>
  <div>
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
        :style="`top: ${oprate.top}px;left: ${oprate.left}px`"
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

  if (e.target && e.target.type === "rect" && !e.target.isSign) {
    activeEl = e.target;
    oprate.show = true;

    setOpratePosition(e.target.top, e.target.left);
  }
}

function canvasMouseMove(e) {
  if (activeEl && e.target && e.target.type === "rect" && !e.target.isSign) {
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
    selection: true,
  });

  rect.lockRotation = true; // 禁止旋转

  canvas.add(rect);

  // 监听拖拽事件
  canvas.on("object:modified", function (e) {
    console.log(e.target, "object:modified");
    if (e.target && e.target.type === "rect" && !e.target.isSign) {
      activeEl = e.target;
    }
    // 在这里你可以执行其他的操作，根据需要更新画布
    canvas.renderAll();
  });
  downPoint = null;
}

const createLine = (pointer) => {
  const line = new fabric.Line(pointer, {
    stroke: "red",
    selectable: false,
  });
  const sign = new fabric.Rect({
    top: pointer[3] - 32,
    left: pointer[2],
    width: 100,
    height: 32,
    stroke: "#fff",
    fill: "#ffffff",
    selectable: true,
    shadow: {
      color: "rgba(0, 0, 0, 0.5)", // 阴影颜色
      offsetX: 5, // x 方向偏移
      offsetY: 5, // y 方向偏移
      blur: 5, // 模糊度
    },
  });
  sign.on("moving", function () {
    let r1x = activeEl.left;
    let r1y = activeEl.top;
    let r2x = sign.left;
    let r2y = sign.top;
    console.log(activeEl);
    const intersectionPoint = getLineRectIntersection(activeEl, {
      x: sign.left + sign.width / 2,
      y: sign.top + sign.height / 2,
    });
    console.log(intersectionPoint, "intersectionPoint");
    console.log(r1x, r1y, "rect1");
    console.log(r2x, r2y, "rect2");
    line.set({
      x1: parseInt(intersectionPoint.x),
      y1: parseInt(intersectionPoint.y),
      x2: sign.left + sign.width / 2,
      y2: sign.top + sign.height / 2,
    });
    canvas.renderAll();
  });
  sign.isSign = true;
  canvas.add(line, sign);
  return [line, sign];
};

const delEl = () => {
  if (activeEl.line) {
    canvas.remove(activeEl.line);
    activeEl.line = null;
  }
  if (activeEl.sign) {
    canvas.remove(activeEl.sign);
    activeEl.sign = null;
  }
  canvas.remove(activeEl);
  activeEl = null;
  oprate.show = false;
};

const blurInput = (val) => {
  if (activeEl.line) return;
  // 生成标注
  let x = activeEl.left + activeEl.width;
  let y = activeEl.top;
  const [line, sign] = createLine([x, y, x + 100, y - 100]);
  activeEl.line = line;
  activeEl.sign = sign;
};

function getLineRectIntersection(rect, targetPoint) {
  const rectLeft = rect.left;
  const rectTop = rect.top;
  const rectRight = rect.left + rect.width;
  const rectBottom = rect.top + rect.height;

  const lineStartX = rect.left + rect.width / 2;
  const lineStartY = rect.top + rect.height / 2;

  const lineEndX = targetPoint.x;
  const lineEndY = targetPoint.y;

  const dx = lineEndX - lineStartX;
  const dy = lineEndY - lineStartY;

  let t;
  let intersectionX;
  let intersectionY;

  if (
    rectLeft <= lineEndX &&
    lineEndX <= rectRight &&
    rectTop <= lineEndY &&
    lineEndY <= rectBottom
  ) {
    // 目标点在矩形内部，将线连接到最近的边框
    const closestX =
      Math.abs(lineStartX - rectLeft) < Math.abs(lineStartX - rectRight)
        ? rectLeft
        : rectRight;
    const closestY =
      Math.abs(lineStartY - rectTop) < Math.abs(lineStartY - rectBottom)
        ? rectTop
        : rectBottom;

    t = 1;
    intersectionX = closestX;
    intersectionY = closestY;
  } else {
    // 目标点不在矩形内部，计算线与矩形边框的交点
    if (Math.abs(dx) > Math.abs(dy)) {
      t = (targetPoint.x - lineStartX) / dx;
      intersectionX = targetPoint.x;
      intersectionY = lineStartY + t * dy;
    } else {
      t = (targetPoint.y - lineStartY) / dy;
      intersectionX = lineStartX + t * dx;
      intersectionY = targetPoint.y;
    }
  }

  // 判断交点是否在矩形内
  if (intersectionX < rectLeft) {
    intersectionX = rectLeft;
  } else if (intersectionX > rectRight) {
    intersectionX = rectRight;
  }

  if (intersectionY < rectTop) {
    intersectionY = rectTop;
  } else if (intersectionY > rectBottom) {
    intersectionY = rectBottom;
  }

  return { x: intersectionX, y: intersectionY };
}

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
