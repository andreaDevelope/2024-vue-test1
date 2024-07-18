import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CiaoView from '../views/CiaoView.vue'
import CiaoFarm from '../views/CiaoFarm.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/ciao',
      name: 'ciao',
      component: CiaoView
    },
    {
      path: '/farm',
      name: 'farm',
      component: CiaoFarm
    }
  ]
})

export default router
