<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Correo electrónico</label>
        <input v-model="email" type="email" id="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input v-model="password" type="password" id="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Iniciar sesión</button>
      <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index'; // Verifica que la ruta sea correcta

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    async function login() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email.value, password: password.value })
        });
        const data = await response.json();
        if (response.ok) {
          store.commit('SET_TOKEN', data.token);
          store.commit('SET_AUTHENTICATED', true);
          store.commit('SET_ADMIN', data.isAdmin !== undefined ? data.isAdmin : false); // Maneja la ausencia de `isAdmin`
          router.push({ name: 'home' });
          alert('Logged in successfully!');
        } else {
          error.value = data.error || 'An error occurred';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        error.value = 'Error al iniciar sesión';
      }
    }

    return {
      email,
      password,
      error,
      login,
    };
  },
};
</script>
