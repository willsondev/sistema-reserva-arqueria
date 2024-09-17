<template>
  <header class="p-4">
    <div class="container flex justify-between h-16 mx-auto">
      <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" class="flex items-center p-2">
        <h1 class="text-3xl font-bold text-white">Clases de Arquería</h1>
      </a>
      <ul class="items-stretch hidden space-x-3 lg:flex">
        <li class="flex">
          <RouterLink to="/" class="flex items-center px-4 -mb-1 border-b-2 font-bold text-white">Inicio</RouterLink>
        </li>
        <li class="flex">
          <RouterLink to="/classes" class="flex items-center px-4 -mb-1 border-b-2 font-bold text-white">Clases</RouterLink>
        </li>
        <li class="flex" v-if="isAuthenticated">
          <RouterLink to="/reservations" class="flex items-center px-4 -mb-1 border-b-2 font-bold text-white">Tus Reservaciones</RouterLink>
        </li>
        <li class="flex" v-if="isAdmin">
          <RouterLink to="/admin" class="flex items-center px-4 -mb-1 border-b-2 font-bold text-white">Admin</RouterLink>
        </li>
      </ul>

      <div class="items-center flex-shrink-0 hidden lg:flex">
        <!-- Mostrar botón de Cerrar Sesión solo si el usuario está autenticado -->
        <template v-if="isAuthenticated">
          <button class="self-center px-8 py-3 rounded dark:bg-red-500 dark:text-gray-50" @click="logout">Cerrar sesión</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="self-center px-8 py-3 font-semibold rounded dark:bg-white dark:text-gray-700">Ingresar</RouterLink>
          <RouterLink to="/register" class="self-center px-8 py-3 font-semibold rounded dark:bg-green-600 dark:text-gray-50">Registrarse</RouterLink>
        </template>
      </div>
      <button class="p-4 lg:hidden" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div :class="{
      'block': isMenuOpen,
      'hidden': !isMenuOpen,
      'lg:hidden': true,
      'absolute': true,
      'left-0': true,
      'w-full': true,
      'bg-white': true,
      'p-4': true,
      'z-50': true,
    }">
      <RouterLink to="/" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Inicio</RouterLink>
      <RouterLink to="/classes" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Clases</RouterLink>
      <RouterLink to="/reservations" v-if="isAuthenticated" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Tus Reservaciones</RouterLink>
      <RouterLink to="/admin" v-if="isAdmin" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Admin</RouterLink>
      <template v-if="!isAuthenticated">
        <RouterLink to="/login" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Ingresar</RouterLink>
        <RouterLink to="/register" class="block py-2 px-4 hover:bg-green-600 text-sm font-medium text-gray-700">Registrarse</RouterLink>
      </template>
      <template v-if="isAuthenticated">
        <button class="block w-full py-2 px-4 bg-red-500 text-white hover:bg-red-700" @click="logout">Cerrar sesión</button>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const isMenuOpen = ref(false);

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isAdmin = computed(() => store.getters.isAdmin);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = async () => {
  try {
    await store.dispatch('logout');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style scoped>
/* Puedes añadir estilos adicionales aquí si es necesario */
</style>