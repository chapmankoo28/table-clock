import { createRouter, createWebHashHistory } from "vue-router";

import SettingView from "@/views/SettingView.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: MainLayout,
    },
    {
      path: "/setting",
      name: "Setting",
      component: SettingView,
    },
  ],
});

export default router;
