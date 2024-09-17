<template>
  <div class="flex flex-col md:flex-row md:justify-between w-full px-10 gap-4">

    <!-- Card de ver clases -->
    <div class="w-full md:w-80 mb-4 text-center md:text-right border border-glass p-6 rounded-lg backdrop-blur-md">
      <h1 class="text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Clases para Principiantes
      </h1>
      <p class="text-base md:text-lg font-normal text-white mt-2">
        ¿Interesado en aprender arquería? Nuestras clases para principiantes te enseñarán las bases, desde cómo sujetar el arco hasta afinar tu puntería. ¡Empieza tu camino en el tiro con arco!
      </p>

      <RouterLink
        to="/register"
        class="block text-center bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Inscríbete
      </RouterLink>
    </div>

    <!-- Card de reservación -->
   <div class=" flex items-center justify-between w-full md:w-64  h-10  text-center md:text-right border border-glass rounded-lg  bg-white">
  <!-- Título de Reservación -->
  <h1 class="text-xl mr-2 md:text-2xl font-extrabold leading-tight text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
    Reservación
  </h1>

  <!-- Botón de registro -->
  <RouterLink
    to="/register"
    class="h-10 backdrop-blur-sm border border-glass focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  >
    Registrate
  </RouterLink>
</div>


    <!-- Otra card de ver clases -->
    <div class="w-full md:w-80 mb-10 text-center md:text-right bg-glass backdrop-blur-md border border-glass p-6 rounded-lg">
      <h1 class="text-xl md:text-4xl font-extrabold leading-tight text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Clases Avanzadas de Arquería
      </h1>
      <p class="text-base md:text-lg font-normal text-white mt-2">
        Si ya tienes experiencia, nuestras clases avanzadas te ayudarán a perfeccionar tu técnica y rendimiento. Eleva tu habilidad al siguiente nivel con entrenadores expertos.
      </p>

      <RouterLink
        to="/register"
        class="block bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Regístrate para Acceder
      </RouterLink>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Card',
};
</script>
