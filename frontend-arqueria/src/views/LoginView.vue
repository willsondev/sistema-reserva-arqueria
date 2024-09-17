<template>
  <div class="login flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
    <div
      class="hidden lg:block lg:w-1/2 bg-cover bg-center"
      style="background-image:url('../../public/img/foto-login.jpeg')"
    ></div>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Inicio de Sesión</h1>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="example@gmail.com"
            required
            class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="********"
            required
            class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useToast } from 'vue-toast-notification'; // Importa Vue Toast Notification

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    async loginUser() {
      const toast = useToast(); // Inicializa el toast para las notificaciones

      try {
        // Llama a la acción 'loginUser' y pasa los datos de inicio de sesión
        const response = await this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password,
        });

        // Notificación de éxito
        toast.success('Inicio de sesión exitoso', {
          position: 'top-right',
        });

        // Guarda el token en localStorage o en el estado global
        localStorage.setItem('token', response.token);

        // Imprime la información de inicio de sesión en la consola
        console.log('Inicio de sesión exitoso!');
        console.log('Token:', response.token); // Debería estar presente en la respuesta
        console.log('Usuario:', response.user); // Debería estar presente en la respuesta

        // Redirige a la página principal o a donde sea necesario
        this.$router.push('/home');

      } catch (error) {
        // Manejo de errores basado en las respuestas del backend
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error, {
            position: 'top-right',
          });
        } else {
          toast.error('Error al iniciar sesión. Inténtalo de nuevo.', {
            position: 'top-right',
          });
        }
        console.error('Error al iniciar sesión:', error);
      }
    },
  },
};
</script>

<style scoped>
/* No es necesario agregar estilos personalizados aquí, ya que Tailwind CSS cubre el diseño */
</style>
