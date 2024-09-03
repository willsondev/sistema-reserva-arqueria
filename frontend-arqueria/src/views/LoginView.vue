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
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push({ name: 'home' });
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
};
</script>
