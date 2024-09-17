<template>
  <div id="footer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 bg-[#C6C7BE] mt-36 px-4 md:px-6">

    <!-- 1 -->
    <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-between min-h-[300px]">
      <img src="../../public/img/logo-inicio.png" alt="" class="mb-4 w-24 h-auto">
      <div class="text-center flex flex-col flex-grow">
        <h1 class="text-xl md:text-2xl lg:text-2xl font-bold">Arqueria</h1>
        <RouterLink
          to="/login"
          class="bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mx-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </RouterLink>
      </div>
    </div>

    <!-- 2 -->
    <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-between min-h-[300px]">
      <img src="../../public/img/logo-clases.png" alt="" class="mb-4 w-24 h-auto">
      <div class="text-center flex flex-col flex-grow">
        <h1 class="text-xl md:text-2xl lg:text-2xl font-bold">Ver Clases</h1>
       
        <RouterLink
          to="/classes"
          class="bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mx-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Clases
        </RouterLink>
      </div>
    </div>

    <!-- 3 -->
    <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-between min-h-[300px]">
      <img src="../../public/img/logo-instructores.png" alt="" class="mb-4 w-24 h-auto">
      <div class="text-center flex flex-col flex-grow">
        <h1 class="text-xl md:text-2xl lg:text-2xl font-bold">Instructores</h1>
        
        <RouterLink
          to="/instructores"
          class="bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mx-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Ver
        </RouterLink>
      </div>
    </div>

    <!-- 4 -->
    <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-between min-h-[300px]">
      <img src="../../public/img/logo-futuro.png" alt="" class="mb-4 w-24 h-auto">
      <div class="text-center flex flex-col flex-grow">
        <h1 class="text-xl md:text-2xl lg:text-2xl font-bold ">Futuros Instructores</h1>
        
        <RouterLink
          to="/futuros-instructores"
          class="bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mx-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Conocer
        </RouterLink>
      </div>
    </div>

    <!-- 5 -->
    <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-between min-h-[300px]">
      <img src="../../public/img/logo-candado.png" alt="" class="mb-4 w-24 h-auto">
      <div class="text-center flex flex-col flex-grow">
        <h1 class="text-xl md:text-2xl lg:text-2xl font-bold">Inscribirse</h1>
        
        <RouterLink
          to="/register"
          class="bg-glass backdrop-blur-sm border border-glass focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mx-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Registrarse
        </RouterLink>
      </div>
    </div>

    <!-- 6 -->
     <div class="border border-glass p-6 rounded-lg bg-glass backdrop-blur-md flex flex-col items-center justify-center min-h-[300px]">
    <div class="flex  space-x-2">
      <img src="../../public/img/logo-facebbok.png" alt="" class="w-12 h-10 mt-20">
      <img src="../../public/img/logo-X.png" alt="" class="w-12 h-10 mt-20">
      <img src="../../public/img/logo-instagram.png" alt="" class="w-12 h-10 mt-20">
      <img src="../../public/img/logo-linkedin.png" alt="" class="w-12 h-10 mt-20">
    </div>
    <div class="text-center flex flex-col justify-center flex-grow">
      <h1 class="text-xl md:text-2xl lg:text-2xl font-bold mb-4">Encuéntranos</h1>
      
    </div>
  </div>

  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
