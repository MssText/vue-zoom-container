import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import VueZoomContainer from "../dist/vue-zoom-container.mjs";

const app = createApp(App);

app.use(router);

app.use(VueZoomContainer);

app.mount("#app");
