<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Registrarse</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium">Nombre</label>
        <input v-model="name" type="text" id="name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Correo electrónico</label>
        <input v-model="email" type="email" id="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input v-model="password" type="password" id="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Registrarse</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password, role: 'user' })
        });
        const data = await response.json();
        if (response.ok) {
          // Guarda el token en el localStorage si es necesario
          localStorage.setItem('token', data.token);
          // Redirige a HomeView después del registro exitoso
          this.$router.push({ name: 'login' });
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al registrarse:', error);
      }
    }
  }
};
</script>
