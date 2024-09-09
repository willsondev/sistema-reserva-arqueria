<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Clases Disponibles</h2>
    <div v-if="isLoadingClasses">Cargando clases...</div>
    <ul v-else>
      <li v-for="cls in classes" :key="cls.id" class="mb-4 p-4 border border-gray-200 rounded-lg">
        <h3 class="text-xl font-semibold">{{ cls.title }}</h3>
        <p class="text-sm">{{ cls.description }}</p>
        <p class="text-sm">Fecha y hora: {{ new Date(cls.dateTime).toLocaleString() }}</p>
        <p class="text-sm">Máx. Reservas: {{ cls.maxReservations }}</p>
        <button @click="reserveClass(cls.id)" class="mt-2 bg-green-500 text-white py-2 px-4 rounded">
          Reservar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const classes = computed(() => store.state.classes);
const isLoadingClasses = computed(() => store.state.isLoadingClasses);

const fetchClasses = async () => {
  try {
    await store.dispatch('fetchClasses');
    console.log('Clases obtenidas:', store.state.classes);
  } catch (error) {
    console.error('Error al obtener las clases:', error);
  }
};

const reserveClass = async (classId) => {
  try {
    if (!store.getters.isAuthenticated) {
      alert('Debes estar autenticado para reservar una clase.');
      return;
    }
    await store.dispatch('reserveClass', classId);
    alert('Clase reservada con éxito');
  } catch (error) {
    console.error('Error al reservar la clase:', error);
    alert('Error al reservar la clase');
  }
};

// Llamada a la función cuando el componente es montado
onMounted(() => {
  fetchClasses();
});
</script>