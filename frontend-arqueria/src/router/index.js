import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import ClassView from '../views/ClassView.vue';
import ReservationView from '../views/ReservationView.vue';
import AdminPanel from '../views/AdminPanel.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/classes', component: ClassView },
  { path: '/reservations', component: ReservationView },
  { path: '/admin', component: AdminPanel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
