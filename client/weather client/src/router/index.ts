import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue' // Adjust path as needed
import WeatherPage from '../components/WeatherPage.vue' // Adjust path as needed
import HourlyForcast from '../components/HourlyForcast.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/weather',
    name: 'Weather',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: WeatherPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
