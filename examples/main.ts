import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import * as VueZoomContainer from "../packages/vue-zoom-container/index";

const app = createApp(App);

app.use(router);

app.use(VueZoomContainer);

app.mount("#app");
