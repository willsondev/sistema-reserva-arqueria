<template>
  <nav class="w-full flex justify-between text-sm mt-4 space-x-2">
    <RouterLink to="/" class="nav-link text-white">Inicio</RouterLink>

    <div class="flex justify-end space-x-4">
      <!-- Enlace siempre visible -->
      <RouterLink to="/classes" class="nav-link">Classes</RouterLink>

      <!-- Enlaces que solo aparecen cuando el usuario está autenticado -->
      <template v-if="isAuthenticated">
        <RouterLink to="/reservations" class="nav-link">Reservations</RouterLink>
        <RouterLink v-if="isAdmin" to="/admin" class="nav-link">Admin</RouterLink>
        <RouterLink to="/logout" class="nav-link" @click.prevent="logout">Cerrar sesión</RouterLink>
      </template>

      <!-- Enlaces que solo aparecen cuando el usuario NO está autenticado -->
      <template v-else>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isAdmin = computed(() => store.getters.isAdmin);

const logout = () => {
  store.commit('LOGOUT'); // Usar la mutación LOGOUT
  router.push('/login');
};
</script>
