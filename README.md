# vue-zoom-container

A vue3-based mobile two-finger zoom in/out component(基于vue3的移动端双指缩放容器组件)


## 为什么写这个组件

之前实现过一个对文字进行双指放大和缩小的功能，在移动端上这个功能感觉挺常用的。但是在github上搜索了一波Vue3+TS的缩放组件，发现并没有找到很符合自己需求的包，所以自己就实现了这个功能，同时开源了这个小组件，造福社区

## 功能

- 支持以双指为中心放大和缩小，特别适用于文字特别小，需要放大缩小的场景
- 双击恢复初始未缩放状态
- 禁用了IOS自带的缩放功能
- 支持最大放大比例和最小缩放比例配置
- ......
### 使用方式

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
## 在线扫码体验

[在线体验](https://vue-zoom-container-14ez7ygu2-msstext.vercel.app/)
