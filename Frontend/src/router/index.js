import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'   // импорт страницы
import PlayerView from '../views/PlayerView.vue' 
import MasterView from '../views/MasterView.vue' 
import RegisterView from '../views/RegisterView.vue' 
import AuthorView from '../views/AuthorView.vue' 

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
    component: MasterView,
    meta: { requiresAuth: true }
  },
      {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
      {
    path: '/auth',
    name: 'auth',
    component: AuthorView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Проверка авторизации перед переходом
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/auth'
  }
})

export default router