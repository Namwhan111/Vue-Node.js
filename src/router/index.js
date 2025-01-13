import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/create',
      name:'create',
      component: () => import('../views/Create.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/edit/:id',
      name:'edit',
      component: () => import('../views/EditStudent.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authtoken');

  if (token && to.name === 'login') {
    // If the user has a token and tries to access the login page, redirect them to the home page
    next({ name: 'home' }); // Adjust 'home' to the name of your main/home route
  } else if (!token && to.name !== 'login') {
    // If the user does not have a token and tries to access any page other than the login page, redirect them to the login page
    next({ name: 'login' });
  } else {
    // Allow access to the requested page
    next();
  }
});


export default router