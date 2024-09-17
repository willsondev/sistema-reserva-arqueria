<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-center">Instructores de Arquería</h1>

    <!-- Grid para mostrar las tarjetas de instructores -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
      <div 
        v-for="(instructor, index) in instructores" 
        :key="instructor.email" 
        class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <!-- Imagen personalizada del instructor -->
        <img 
          :src="getInstructorImage(index)" 
          alt="Instructor de arquería" 
          class="w-full h-56 object-cover"
        />
        
        <!-- Información del instructor -->
        <div class="p-4">
          <h2 class="text-lg font-bold text-gray-900">
            {{ instructor.name.first }} {{ instructor.name.last }}
          </h2>
          <p class="text-gray-700">Instructor de arquería</p>
          <p class="text-gray-500">Edad: {{ instructor.dob.age }} años</p>
          <p class="text-gray-500">Correo: {{ instructor.email }}</p>

          <!-- Botón de contacto -->
          <div class="mt-4 text-center">
            <a 
              :href="'#:' + instructor.email" 
              class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      instructores: [], // Almacena los datos de los instructores
      // Imágenes personalizadas para los instructores
      imagenesInstructores: [
          '../../public/img/img-profesores/1.jpeg',
          '../../public/img/img-profesores/2.jpeg',
          '../../public/img/img-profesores/3.jpeg',
          '../../public/img/img-profesores/4.jpeg',
          '../../public/img/img-profesores/5.jpeg',
          '../../public/img/img-profesores/6.jpeg',
        '../../public/img/img-profesores/7.jpeg',
        '../../public/img/img-profesores/8.jpeg',
        
      ]
    };
  },
  mounted() {
    this.fetchInstructores();
  },
  methods: {
    async fetchInstructores() {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=8');
        this.instructores = response.data.results; // Guardar los resultados de la API
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    },
    getInstructorImage(index) {
      // Devuelve la imagen personalizada correspondiente al índice del instructor
      return this.imagenesInstructores[index % this.imagenesInstructores.length];
    },
  },
};
</script>

<style  scoped>
/* Puedes personalizar los estilos aquí si es necesario */
</style>
