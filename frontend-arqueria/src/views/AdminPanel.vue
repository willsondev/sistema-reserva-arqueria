<template>
  <div class="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-4xl font-bold mb-8 text-gray-900">Panel de Administración</h2>

    <!-- Formulario para agregar o editar una clase -->
    <form @submit.prevent="isEditing ? updateClass() : addClass()" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <input 
          v-model="newClass.title" 
          type="text" 
          id="title" 
          required 
          class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <input 
          v-model="newClass.description" 
          type="text" 
          id="description" 
          required 
          class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        />
      </div>
      <div class="mb-4">
        <label for="dateTime" class="block text-sm font-medium text-gray-700">Fecha y Hora</label>
        <input 
          v-model="newClass.dateTime" 
          type="datetime-local" 
          id="dateTime" 
          required 
          class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        />
      </div>
      <div class="mb-4">
        <label for="maxReservations" class="block text-sm font-medium text-gray-700">Máx. Reservas</label>
        <input 
          v-model="newClass.maxReservations" 
          type="number" 
          id="maxReservations" 
          required 
          class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        />
      </div>
      <button 
        type="submit" 
        class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        {{ isEditing ? 'Actualizar Clase' : 'Agregar Clase' }}
      </button>
    </form>

    <!-- Lista de clases existentes -->
    <h3 class="text-2xl font-semibold mt-12 mb-6 text-gray-900">Clases Existentes</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="cls in classes" 
        :key="cls._id" 
        class="bg-white p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h4 class="text-xl font-semibold text-gray-800 mb-2">{{ cls.title }}</h4>
        <p class="text-sm text-gray-600 mb-2">{{ cls.description }}</p>
        <p class="text-sm text-gray-600 mb-2">
          Fecha y hora: {{ new Date(cls.dateTime).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) }}
        </p>
        <p class="text-sm text-gray-600 mb-4">Máx. Reservas: {{ cls.maxReservations }}</p>
        <div class="mt-4 flex space-x-4">
          <button 
            @click="editClass(cls)" 
            class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Editar
          </button>
          <button 
            @click="deleteClass(cls._id)" 
            class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const newClass = ref({
  title: '',
  description: '',
  dateTime: '',
  maxReservations: ''
});
const classes = ref([]);
const isEditing = ref(false);
const editClassId = ref(null);

const showToast = (type, text) => {
  switch (type) {
    case 'success':
      toast.success(text);
      break;
    case 'error':
      toast.error(text);
      break;
    case 'info':
      toast.info(text);
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

const addClass = async () => {
  try {
    console.log('Datos que se enviarán para agregar la clase:', newClass.value);

    const token = localStorage.getItem('token');
    const response = await fetch('https://backed-mongo.onrender.com/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newClass.value)
    });

    console.log('Respuesta del servidor al agregar la clase:', await response.clone().json());

    if (response.ok) {
      fetchClasses();
      resetForm();
      showToast('success', 'Clase agregada con éxito');
    } else {
      const data = await response.json();
      showToast('error', data.error || 'Error al agregar la clase');
    }
  } catch (error) {
    showToast('error', 'Error al agregar la clase');
  }
};

const updateClass = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://backed-mongo.onrender.com/api/classes/${editClassId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newClass.value)
    });
    if (response.ok) {
      fetchClasses();
      resetForm();
      isEditing.value = false;
      showToast('success', 'Clase actualizada con éxito');
    } else {
      const data = await response.json();
      showToast('error', data.error || 'Error al actualizar la clase');
    }
  } catch (error) {
    showToast('error', 'Error al actualizar la clase');
  }
};

const deleteClass = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://backed-mongo.onrender.com/api/classes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      fetchClasses();
      showToast('success', 'Clase eliminada con éxito');
    } else {
      const data = await response.json();
      showToast('error', data.error || 'Error al eliminar la clase');
    }
  } catch (error) {
    showToast('error', 'Error al eliminar la clase');
  }
};

const editClass = (cls) => {
  newClass.value = { ...cls };
  isEditing.value = true;
  editClassId.value = cls._id;
};

const resetForm = () => {
  newClass.value = {
    title: '',
    description: '',
    dateTime: '',
    maxReservations: ''
  };
  isEditing.value = false;
  editClassId.value = null;
};

onMounted(() => {
  fetchClasses();
});
</script>

<style scoped>
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5); /* Sombra de enfoque */
}
</style>
