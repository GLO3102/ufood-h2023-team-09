import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import { createPinia } from "pinia";
import "../styles/style.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");
