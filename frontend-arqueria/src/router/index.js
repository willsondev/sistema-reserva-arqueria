import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import ClassView from '../views/ClassView.vue';
import ReservationView from '../views/ReservationView.vue';
import AdminPanel from '../views/AdminPanel.vue';
import InstructoresView from '../views/InstructoresView.vue';
import FuturosInstructoresView from '../views/FuturosInstructoresView.vue';
import store from '../store/index';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/classes', name: 'classes', component: ClassView },
  { path: '/reservations', name: 'reservations', component: ReservationView, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: AdminPanel, meta: { requiresAdmin: true } },
  { path: '/instructores', name: 'instructores', component: InstructoresView },
  { path: '/futuros-instructores', name: 'futuros-instructores', component: FuturosInstructoresView },
  // Eliminado: { path: '/:pathMatch(.*)*', name: '404', component: NotFound },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const isAdmin = store.getters.isAdmin;

  if (to.name === 'logout') {
    store.dispatch('logout').then(() => {
      next('/login');
    }).catch(() => {
      next('/login');
    });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next('/');
  } else {
    next();
  }
});

export default router;
