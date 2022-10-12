# vue-zoom-container

A vue3-based mobile two-finger zoom in/out component(基于vue3的移动端双指缩放容器组件)


## 组件介绍

基于[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger)和`transfomjs`,有缩放需求的同学可以拿着用用试试

## 功能

- 支持以双指为中心放大和缩小，特别适用于文字特别小，需要放大缩小的场景
- 双击恢复初始未缩放状态
- 禁用了IOS自带的缩放功能
- 支持最大放大比例和最小缩放比例配置
- 缩放状态下，支持单指拖动，最大拖动距离是屏幕尺寸的一半

## 使用方式

1.安装

```bash
$ npm install vue-zoom-container --save
```

```bash
$ yarn add vue-zoom-container
```

2.注册组件
```ts
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import * as VueZoomContainer from "vue-zoom-container";

const app = createApp(App);

app.use(router);

app.use(VueZoomContainer);

app.mount("#app");
```

3.使用组件

`<ZoomDemo />`组件是你想添加缩放功能的组件，用`vue-zoom-container`作为它的父亲级组件即可：
```vue
<vue-zoom-container><ZoomDemo /></vue-zoom-container>
```

这样，你的缩放需求就实现了，啦啦啦！！

## 扫码体验

[在线Demo](https://zoom.masongsong.cn/)

或者直接扫码体验：

<img src="https://cdn.staticaly.com/gh/MssText/learn@master/qrcode.50pj6yl01ig0.webp" width="50%">

或者clone该项目到本地跑起来进行体验：

```bash
$ git clone git@github.com:MssText/vue-zoom-container.git

$ npm install

$ npm run dev
```
使用类似草料二维码的网站生成一个二维码。扫码体验即可

## 组件 props

| name | Description | default |
| --- | --- |
| touchList | AlloyFinger支持手势事件 | - |
| minScale | 最小缩小比例 | 1 |
| maxScale | 最大放大比例 | 1.8 |
| movePercent | 单指最大拖动比例 | 0.5 |
