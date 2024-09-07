<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MainView from './components/MainView.vue';
import { ArrowDownIcon } from '@heroicons/vue/24/solid';

// Estado de visibilidad del botón
const isButtonVisible = ref(true);

// Función para ocultar el botón cuando se hace scroll
const handleScroll = () => {
  isButtonVisible.value = window.scrollY < 200; // Ajusta el valor según sea necesario
};

// Función para ocultar el botón después de hacer clic
const handleClick = () => {
  isButtonVisible.value = false;
};

// Añadir y quitar el manejador de eventos de scroll
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Obtener la ruta actual
const route = useRoute();

// Computar si ocultar MainView y Footer
const hideMainViewAndFooter = computed(() => {
  return ['/login', '/register', '/classes','/reservations','/admin'].includes(route.path);
});

// Observar cambios en la ruta para actualizar el estado
watch(route, () => {
  // Actualizar el estado de hideMainViewAndFooter al cambiar la ruta
  // Esto asegura que la lógica se ejecute correctamente
  hideMainViewAndFooter.value = ['/login', '/register', '/classes','/reservations','/admin'].includes(route.path);
});
</script>

<template>
  <div>
    <!-- Header siempre se renderiza -->
    <Header />

    <!-- Vista principal -->
    <router-view />

    <!-- MainView y Footer solo se renderizan si no estamos en /login o /register -->
    <MainView v-if="!hideMainViewAndFooter" />
    <Footer v-if="!hideMainViewAndFooter" />

    <!-- Botón para desplazarse hacia abajo -->
    <transition name="fade-slide">
      <div v-if="isButtonVisible && !hideMainViewAndFooter" class="fixed bottom-8 right-8 flex justify-center">
        <a href="#footer" @click="handleClick">
          <button class="bg-white hover:bg-green-600 text-black font-semibold p-2 rounded-full shadow-lg transition ease-in-out duration-300 flex items-center justify-center">
            <ArrowDownIcon class="h-6 w-6 text-black" />
          </button>
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Animación para el botón */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Animación para el footer */
.fade-slide-footer-enter-active,
.fade-slide-footer-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-footer-enter,
.fade-slide-footer-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>