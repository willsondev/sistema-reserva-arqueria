<template>
  <div class="mr-4">
    <div class="flex justify-end px-6 -mt-9">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <router-link to="/reservations" class="px-4 py-2 text-sm font-bold text-gray-900 border border-gray-900 rounded-s-lg hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white hover:bg-green-600">
          Perfil
        </router-link>

        <router-link to="/reservations" class="px-3 py-2 text-sm font-bold text-gray-900 bg-white border rounded-e-lg hover:bg-green-600 hover:text-white focus:z-10 focus:bg-gray-900">
          Reservacion
        </router-link>
      </div>
    </div>

    <div class="flex justify-end px-6 mt-2">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <router-link to="/classes" class="px-4 py-2 text-sm font-bold text-gray-900 bg-transparent border border-green-600 rounded-s-lg hover:bg-green-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white">
          Tus clases
        </router-link>

        <router-link to="/classes" class="font-bold px-3 py-2 text-sm text-gray-900 bg-white border rounded-e-lg hover:bg-green-600 hover:text-white focus:z-10 focus:bg-gray-900">
          Clases
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Botones',
};
</script>
