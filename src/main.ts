import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import loading from "./directive/loading";

const app = createApp(App);
app.directive("my-loading", loading);
app.use(router).mount("#app");
