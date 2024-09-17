<template>
  <div class="py-16 px-4">
    <!-- Lista de clases existentes -->
    <h3 class="text-2xl font-semibold mb-8 text-gray-800 text-center">Clases Existentes</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cls in classes" :key="cls._id" class="bg-white p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h4 class="text-xl font-semibold text-gray-800 mb-2">{{ cls.title }}</h4>
        <p class="text-sm text-gray-600 mb-4">{{ cls.description }}</p>
        <p class="text-sm text-gray-600 mb-2">
          Fecha y hora: {{ new Date(cls.dateTime).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) }}
        </p>
        <p class="text-sm text-gray-600 mb-4">Máx. Reservas: {{ cls.maxReservations }}</p>
        <div class="flex justify-between items-center">
          <button 
            @click="reserveClass(cls)" 
            class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Reservar
          </button>
          <span v-if="reservedClasses.some(reserved => reserved._id === cls._id)" 
                class="text-green-600 font-medium text-sm">Reservada</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const classes = ref([]);
const reservedClasses = ref([]);
const toast = useToast();
const store = useStore();

const getUser = () => store.getters.getUser; // Asegúrate de que 'getUser' devuelva el estado de autenticación

const showToast = (type, text) => {
  switch (type) {
    case 'success':
      toast.success(text);
      break;
    case 'error':
      toast.error(text);
      break;
    default:
      toast(text);
  }
};

const fetchClasses = async () => {
  try {
    const response = await fetch('https://backed-mongo.onrender.com/api/classes');
    const data = await response.json();
    if (response.ok) {
      classes.value = data.classes;
    } else {
      showToast('error', data.error || 'Error al obtener las clases');
    }
  } catch (error) {
    showToast('error', 'Error al obtener las clases');
  }
};

const reserveClass = (cls) => {
  const user = getUser();
  if (!user) {
    showToast('error', 'Debes estar logueado para reservar una clase');
    return;
  }

  const userId = user._id; // Suponiendo que el objeto de usuario tiene un campo '_id'
  const key = `reservedClasses_${userId}`;
  const reserved = JSON.parse(localStorage.getItem(key)) || [];

  if (!reserved.some(reservedClass => reservedClass._id === cls._id)) {
    reserved.push(cls);
    localStorage.setItem(key, JSON.stringify(reserved));
    reservedClasses.value = reserved;
    showToast('success', 'Clase reservada con éxito');
  } else {
    showToast('info', 'Esta clase ya está reservada');
  }
};

const cancelReservation = (id) => {
  const user = getUser();
  if (!user) {
    showToast('error', 'Debes estar logueado para cancelar una reserva');
    return;
  }

  const userId = user._id; // Suponiendo que el objeto de usuario tiene un campo '_id'
  const key = `reservedClasses_${userId}`;
  const reserved = JSON.parse(localStorage.getItem(key)) || [];

  const index = reserved.findIndex(cls => cls._id === id);
  if (index !== -1) {
    reserved.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(reserved));
    reservedClasses.value = reserved;
    showToast('success', 'Reserva cancelada con éxito');
  } else {
    showToast('error', 'No se encontró la reserva a cancelar');
  }
};

onMounted(() => {
  fetchClasses();
  const user = getUser();
  if (user) {
    const userId = user._id; // Suponiendo que el objeto de usuario tiene un campo '_id'
    const storedReservations = localStorage.getItem(`reservedClasses_${userId}`);
    if (storedReservations) {
      reservedClasses.value = JSON.parse(storedReservations);
    }
  }
});
</script>


<style scoped>
/* Estilos personalizados adicionales para las tarjetas */
.card {
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
</style>
