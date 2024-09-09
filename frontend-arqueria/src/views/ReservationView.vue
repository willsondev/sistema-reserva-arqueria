<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Historial de Reservas</h2>
    <ul v-if="reservations.length > 0">
      <li v-for="reservation in reservations" :key="reservation.classId" class="mb-4 p-4 border border-gray-200 rounded-lg">
        <h3 class="text-xl font-semibold">{{ reservation.title }}</h3>
        <p class="text-sm">{{ reservation.description }}</p>
        <p class="text-sm">Fecha y hora: {{ new Date(reservation.dateTime).toLocaleString() }}</p>
      </li>
    </ul>
    <p v-else>No hay reservas disponibles.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const reservations = computed(() => store.state.reservations);

// Función para obtener reservas del store
const getReservations = async () => {
  if (!store.getters.isAuthenticated) {
    console.error('Usuario no autenticado');
    return;
  }

  try {
    await store.dispatch('fetchReservations');
  } catch (error) {
    console.error('Error al obtener el historial de reservas:', error.message || error);
  }
};

// Llamada a la función cuando el componente es montado
onMounted(() => {
  getReservations();
});
</script>
