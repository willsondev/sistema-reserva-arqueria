<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Panel de Administración</h2>
    <!-- Formulario para agregar una clase -->
    <form @submit.prevent="addClass">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium">Título</label>
        <input v-model="newClass.title" type="text" id="title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium">Descripción</label>
        <input v-model="newClass.description" type="text" id="description" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="dateTime" class="block text-sm font-medium">Fecha y Hora</label>
        <input v-model="newClass.dateTime" type="datetime-local" id="dateTime" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div class="mb-4">
        <label for="maxReservations" class="block text-sm font-medium">Máx. Reservas</label>
        <input v-model="newClass.maxReservations" type="number" id="maxReservations" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <button type="submit" class="w-full bg-green-500 text-white py-2 rounded">Agregar Clase</button>
    </form>

    <!-- Lista de clases existentes -->
    <h3 class="text-xl font-bold mt-8 mb-4">Clases Existentes</h3>
    <ul>
      <li v-for="cls in classes" :key="cls.id" class="mb-4 p-4 border border-gray-200 rounded-lg">
        <h4 class="text-lg font-semibold">{{ cls.title }}</h4>
        <p class="text-sm">{{ cls.description }}</p>
        <p class="text-sm">Fecha y hora: {{ new Date(cls.dateTime).toLocaleString() }}</p>
        <p class="text-sm">Máx. Reservas: {{ cls.maxReservations }}</p>
        <button @click="deleteClass(cls.id)" class="mt-2 bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newClass: {
        title: '',
        description: '',
        dateTime: '',
        maxReservations: ''
      },
      classes: []
    };
  },
  created() {
    this.fetchClasses();
  },
  methods: {
    async addClass() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/classes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(this.newClass)
        });
        if (response.ok) {
          this.fetchClasses();
          this.newClass = {
            title: '',
            description: '',
            dateTime: '',
            maxReservations: ''
          };
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al agregar la clase:', error);
      }
    },
    async fetchClasses() {
      try {
        const response = await fetch('http://localhost:5000/api/classes');
        const data = await response.json();
        if (response.ok) {
          this.classes = data.classes;
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error al obtener las clases:', error);
      }
    },
    async deleteClass(id) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          this.fetchClasses();
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al eliminar la clase:', error);
      }
    }
  }
};
</script>
