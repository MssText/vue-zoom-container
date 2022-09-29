import VueZoomContainer from "./index.vue";

const install = function (Vue: any) {
  Vue.component(VueZoomContainer.name, VueZoomContainer);
};

export default {
  VueZoomContainer,
  install,
};
