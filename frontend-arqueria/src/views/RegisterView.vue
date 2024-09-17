<template>
  <div class="register flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
    <div
      class="hidden lg:block lg:w-1/2 bg-cover bg-center"
      style="background-image:url('../../public/img/foto-login.jpeg')"
    ></div>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Registro</h1>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            v-model="name"
            id="name"
            placeholder="Ingresa tu Nombre"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm bg-white"
          />
        </div>
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
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
          <select
            v-model="role"
            id="role"
            required
            class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Registrar
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
      name: '',
      email: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    async registerUser() {
      const toast = useToast(); // Inicializa el toast para las notificaciones

      try {
        // Llama a la acción 'registerUser' y pasa los datos de registro
        const response = await this.$store.dispatch('registerUser', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        });

        // Notificación de éxito
        toast.success(`Te has registrado como ${this.role === 'admin' ? 'Administrador' : 'Usuario'}`, {
          position: 'top-right',
        });

        // Si el rol es 'admin', mostrar advertencia adicional
        if (this.role === 'admin') {
          toast.info('Este registro como administrador es solo para prueba, ya que es un proyecto de portafolio.', {
            position: 'top-right',
          });
        }

        // Redirige al login
        this.$router.push('/login');

        // Imprime la información de registro en la consola
       

      } catch (error) {
        // Manejo de errores basado en las respuestas del backend
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error, {
            position: 'top-right',
          });
        } else {
          toast.error('Error al registrar el usuario. Inténtalo de nuevo.', {
            position: 'top-right',
          });
        }
        console.error('Error al registrar usuario:', error);
      }
    },
  },
};
</script>

<style scoped>
/* No es necesario agregar estilos personalizados aquí, ya que Tailwind CSS cubre el diseño */
</style>
