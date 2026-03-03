import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'   // импорт страницы
import PlayerView from '../views/PlayerView.vue' 
import MasterView from '../views/MasterView.vue' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list-players',
    name: 'player',
    component: PlayerView
  },
    {
    path: '/list-master',
    name: 'master',
    component: MasterView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router