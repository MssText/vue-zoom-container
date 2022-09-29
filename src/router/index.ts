import { createRouter, createWebHistory } from "vue-router";
import VueZoomContainer from "../components/vue-zoom-container.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "vueZoomContainer",
      component: VueZoomContainer,
    },
  ],
});

export default router;
