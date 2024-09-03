<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Clases Disponibles</h2>
    <ul>
      <li v-for="cls in classes" :key="cls.id" class="mb-4 p-4 border border-gray-200 rounded-lg">
        <h3 class="text-xl font-semibold">{{ cls.title }}</h3>
        <p class="text-sm">{{ cls.description }}</p>
        <p class="text-sm">Fecha y hora: {{ new Date(cls.dateTime).toLocaleString() }}</p>
        <p class="text-sm">Máx. Reservas: {{ cls.maxReservations }}</p>
        <button @click="reserveClass(cls.id)" class="mt-2 bg-green-500 text-white py-2 px-4 rounded">Reservar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classes: []
    };
  },
  created() {
    this.fetchClasses();
  },
  methods: {
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
    async reserveClass(id) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/classes/${id}/reserve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId: 'user-id' }) // Reemplazar con el ID del usuario actual
        });
        if (response.ok) {
          alert('Clase reservada con éxito');
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al reservar la clase:', error);
      }
    }
  }
};
</script>
