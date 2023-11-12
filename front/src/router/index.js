import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      props: {
        isLogin: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/LoginView.vue'),
      props: {
        isLogin: false
      }
    },
    {
      path: '/books/:id',
      name: 'book-details',
      component: () => import('../views/BookPage.vue')
    }
  ]
})

export default router
