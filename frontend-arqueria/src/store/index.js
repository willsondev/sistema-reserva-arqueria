import { createStore } from 'vuex';
import axios from 'axios'; // Asegúrate de que axios está instalado

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    classes: [],
    reservations: [],
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    isLoadingClasses: false, // Estado para la carga de clases
    isLoadingReservations: false, // Estado para la carga de reservas
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_CLASSES(state, classes) {
      state.classes = classes;
      state.isLoadingClasses = false; // Actualiza el estado de carga
    },
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
      state.isLoadingReservations = false; // Actualiza el estado de carga
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
      localStorage.setItem('isAdmin', isAdmin.toString()); // Asegúrate de que isAdmin sea una cadena
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
    SET_LOADING_CLASSES(state, isLoading) {
      state.isLoadingClasses = isLoading;
    },
    SET_LOADING_RESERVATIONS(state, isLoading) {
      state.isLoadingReservations = isLoading;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/api/auth/register', userData);
        commit('SET_TOKEN', response.data.token);
        commit('SET_USER', response.data.user);
        commit('SET_AUTHENTICATED', true);
        commit('SET_ADMIN', response.data.user.isAdmin);
      } catch (error) {
        console.error('Error registering user:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials);
        commit('SET_TOKEN', response.data.token);
        commit('SET_USER', response.data.user);
        commit('SET_AUTHENTICATED', true);
        commit('SET_ADMIN', response.data.user.isAdmin);
      } catch (error) {
        console.error('Error logging in:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    },
    async fetchClasses({ commit }) {
  commit('SET_LOADING_CLASSES', true); // Establece el estado de carga
  try {
    const response = await axios.get('/api/classes');
    commit('SET_CLASSES', response.data); // Corrección: acceder a la data directamente
  } catch (error) {
    console.error('Error fetching classes:', error);
    // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
  } finally {
    commit('SET_LOADING_CLASSES', false); // Actualiza el estado de carga
  }
},
    async fetchReservations({ commit, getters }) {
      commit('SET_LOADING_RESERVATIONS', true); // Establece el estado de carga
      try {
        const response = await axios.get('/api/users/reservations', {
          headers: {
            'Authorization': `Bearer ${getters.token}`,
          },
        });
        commit('SET_RESERVATIONS', response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      } finally {
        commit('SET_LOADING_RESERVATIONS', false); // Actualiza el estado de carga
      }
    },
    async reserveClass({ state, dispatch }, classId) {
      try {
        if (!state.user) {
          console.error('No hay usuario autenticado');
          return;
        }

        const userId = state.user.id;
        await axios.post(`/api/classes/${classId}/reserve`, { userId }, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
        dispatch('fetchReservations');
      } catch (error) {
        console.error('Error reservando clase:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    token(state) {
      return state.token;
    },
    isLoadingClasses(state) {
      return state.isLoadingClasses;
    },
    isLoadingReservations(state) {
      return state.isLoadingReservations;
    },
  },
});

export default store;