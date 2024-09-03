<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Historial de Reservas</h2>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.classId" class="mb-4 p-4 border border-gray-200 rounded-lg">
        <h3 class="text-xl font-semibold">{{ reservation.title }}</h3>
        <p class="text-sm">{{ reservation.description }}</p>
        <p class="text-sm">Fecha y hora: {{ new Date(reservation.dateTime).toLocaleString() }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservations: []
    };
  },
  created() {
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/reservations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          this.reservations = data;
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error al obtener el historial de reservas:', error);
      }
    }
  }
};
</script>
