import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// En main.js o main.ts
import './assets/styles/vue3-datepicker.css';



const app = createApp(App);

// Registra el store y el router en la aplicación Vue
app.use(store);
app.use(router);



// Configura y usa Toast
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  // otras opciones de configuración si es necesario
});

app.mount('#app');
