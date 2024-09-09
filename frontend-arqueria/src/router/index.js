import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import ClassView from '../views/ClassView.vue';
import ReservationView from '../views/ReservationView.vue';
import AdminPanel from '../views/AdminPanel.vue';
import store from '../store/index'; // Importa tu store de Vuex

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/classes', component: ClassView }, // Ruta pública
  {
    path: '/reservations',
    component: ReservationView,
    meta: { requiresAuth: true }, // Protección de autenticación
  },
  {
    path: '/admin',
    component: AdminPanel,
    meta: { requiresAuth: true, isAdmin: true }, // Marca la ruta como protegida y requiere rol de administrador
  },
  { path: '/logout', name: 'logout' }, // Ruta para cerrar sesión
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'logout') {
    store.commit('LOGOUT'); // Llama a la mutación LOGOUT en el store
    next('/login'); // Redirige a la página de inicio de sesión
  } else if (to.meta.requiresAuth) {
    if (store.getters.isAuthenticated) { // Usa el getter isAuthenticated del store
      if (to.meta.isAdmin) {
        if (store.getters.isAdmin) { // Usa el getter isAdmin del store
          next(); // Permite el acceso si es administrador
        } else {
          next('/'); // Redirige a la página principal si no es administrador
        }
      } else {
        next(); // Permite el acceso si está autenticado y no requiere rol de administrador
      }
    } else {
      next('/login'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  } else {
    next(); // Permite el acceso a rutas públicas
  }
});

export default router;