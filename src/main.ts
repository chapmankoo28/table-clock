import { createApp } from "vue";
import App from "@/App.vue";

import router from "@/router";
import { createPinia } from "pinia";
import i18n from "@/i18n";

import '@picocss/pico/css/pico.min.css'
import "@/assets/pico-custom.css";
import "@/assets/main.css";

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount("#app");

// disables the right-click menu when the it is not in development mode.
if (!import.meta.env.DEV) {
  document.oncontextmenu = (event) => {
    event.preventDefault();
  };
}
