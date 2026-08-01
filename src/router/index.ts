import { createRouter, createWebHashHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import SettingView from '@/views/SettingView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainLayout,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: SettingView,
    },
  ],
})

export default router
