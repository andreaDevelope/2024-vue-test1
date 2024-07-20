import { createRouter, createWebHistory } from 'vue-router'
import FarmerView from '../views/FarmerView.vue'
import FarmView from '../views/FarmView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'farmerView',
      component: FarmerView
    },
    {
      path: '/farm',
      name: 'farmView',
      component: FarmView
    }
  ]
})

export default router
