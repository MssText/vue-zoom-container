<template>
  <div id="zoom-container">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "VueZoomContainer",
};
</script>

<script setup lang="ts">
import AlloyFinger from "alloyfinger";
import { Transform } from "./transfom";
import { withDefaults, onMounted, onBeforeUnmount } from "vue";
import { TransformElement } from "/#/vue-zoom-container";
// props
const props = withDefaults(
  defineProps<{
    touchList?: any[];
    minScale?: number;
    maxScale?: number;
    movePercent?: number;
  }>(),
  {
    touchList: () => [],
    minScale: 1,
    maxScale: 1.8,
    movePercent: 0.5,
  }
);

// data

// 手指缩放目标元素
let target: TransformElement;

// AlloyFingers实例
let af: unknown = null;

// 缩放比例
let initScale = 1;

// 上下左右单指移动距离
let canMoveUp = false;
let canMoveDown = false;
let canMoveLeft = false;
let canMoveRight = false;

// 是否可以整体拖动元素
let canDrag = false;

// life function
onMounted(() => {
  target = document.querySelector("#zoom-container") as TransformElement;
  Transform(target);
  initAlloyFinger();
});

onBeforeUnmount(() => {
  //@ts-ignore
  af && af.destroy();
});

// touch function
const initAlloyFinger = () => {
  const handlers = {
    doubleTap: handleDoubleTap,
    pinch: handlePinch,
    multipointStart: handleMultipointStart,
    multipointEnd: handleMultipointEnd,
    pressMove: handlePressMove,
    ...props.touchList,
  };
  af = new AlloyFinger(target, handlers);
};

// 双击事件
const handleDoubleTap = () => {
  if (!target) return;
  reset();
};

// 缩放事件
const handlePinch = (evt: TransformElement) => {
  // 更新缩放比例 缩放比例在1-1.8之间
  target.scaleX = target.scaleY = Math.max(
    Math.min(initScale * evt.zoom, props.maxScale),
    props.minScale
  );
};

// 多指触碰开始事件
const handleMultipointStart = (evt: TouchEvent) => {
  // 1. 计算缩放中心点
  const scale_center_x = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
  const scale_center_y = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;

  // 2. 计算滚动容器中心点
  const client_rect = target.getBoundingClientRect();
  const center_x = client_rect.left + client_rect.width / 2;
  const center_y = client_rect.top + client_rect.height / 2;

  // 3. 计算缩放中心点距离滚动容器中心点的偏移量
  const offset_x = scale_center_x - center_x;
  const offset_y = scale_center_y - center_y;

  // 4. 获取上一次的偏移量
  const pre_offset_x = target.originX * target.scaleX;
  const pre_offset_y = target.originY * target.scaleY;

  // 5. 设置当前变形原点
  target.originX = offset_x / target.scaleX;
  target.originY = offset_y / target.scaleY;

  // 6. 重置滚动容器的水平垂直方向平移距离
  target.translateX = offset_x - pre_offset_x + target.translateX;
  target.translateY = offset_y - pre_offset_y + target.translateY;
};

// 多指触碰结束事件
const handleMultipointEnd = () => {
  initScale = target.scaleX;
};

// 处理上下左右最大移动距离
const handleMaxMoveDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  let innerWeight = window.innerWidth || document.documentElement.clientWidth;
  let innerHeight = window.innerHeight || document.documentElement.clientHeight;

  // 是否能向左移动元素
  if (rect.left >= innerWeight * props.movePercent) {
    canMoveLeft = false;
  } else {
    canMoveLeft = true;
  }

  // 是否能向右移动元素
  if (rect.right <= innerWeight * props.movePercent) {
    canMoveRight = false;
  } else {
    canMoveRight = true;
  }

  // 是否能向上移动元素
  if (rect.bottom < innerHeight * props.movePercent) {
    canMoveUp = false;
  } else {
    canMoveUp = true;
  }

  // 是否能向下移动元素
  if (rect.top >= innerHeight * props.movePercent) {
    canMoveDown = false;
  } else {
    canMoveDown = true;
  }
};

// 单指拖拽移动事件
const handlePressMove = (evt: any) => {
  // 1.缩放区域不在可视区使用translate属性拖动
  //   否则使用默认滚动行为

  handleMaxMoveDistance(target);
  canDrag = isElementOffViewport(target);
  if (!canDrag) return;

  let deltaX = evt.deltaX!;
  let deltaY = evt.deltaY!;
  // 处理X方向最大移动
  if (deltaX > 0) {
    if (canMoveLeft) {
      // 此时到达往右移动的边界，只能向左移动
      target.translateX += deltaX!;
    }
  } else {
    if (canMoveRight) {
      // 此时到达往左移动的边界，只能向右移动
      target.translateX += deltaX!;
    }
  }

  // 处理Y方向最大移动
  if (deltaY > 0) {
    if (canMoveDown) {
      // 此时到达往上移动的边界，只能向下移动
      target.translateY += deltaY;
    }
  } else {
    if (canMoveUp) {
      // 此时到达往下移动的边界，只能向上移动
      target.translateY += deltaY;
    }
  }

  // 2.阻止默认滚动行为
  evt.preventDefault();
};

// 元素是否不在可视区内
const isElementOffViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  let innerWeight = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.left < 0 ||
    rect.right > innerWeight ||
    rect.top < 0 ||
    rect.left < 0 ||
    rect.right > innerWeight
  );
};

// 重置
const reset = () => {
  // 1.还原变形原点
  target.originX = target.originY = 0;
  // 2.还原水平垂直方向平移距离
  target.translateX = target.translateY = 0;
  // 还原缩放比例
  initScale = target.scaleX = target.scaleY = 1;
};
</script>
