import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Registra el store y el router en la aplicación Vue
app.use(store);
app.use(router);

app.mount('#app');
