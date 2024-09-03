<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex flex-col items-center p-4 max-h-screen">
    <img alt="Vue logo" class="block mb-8" src="@/assets/logo.svg" width="125" height="125" />

    <div class="flex flex-col items-center text-center">
      <nav class="w-full text-sm mt-8 flex flex-wrap justify-center space-x-4">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/classes" class="nav-link">Classes</RouterLink>
        <RouterLink to="/reservations" class="nav-link">Reservations</RouterLink>
        <RouterLink to="/admin" class="nav-link">Admin</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </nav>
    </div>
  </header>

  <main class="flex-1">
    <RouterView />
  </main>
</template>

<style scoped>
.nav-link {
  @apply inline-block px-4 py-2 border-l border-gray-300 text-gray-700 no-underline;
}

.nav-link:first-of-type {
  @apply border-0;
}

.nav-link.router-link-exact-active {
  @apply text-blue-500;
}

.nav-link.router-link-exact-active:hover {
  @apply bg-transparent;
}
</style>
