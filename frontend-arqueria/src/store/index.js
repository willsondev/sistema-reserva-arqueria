import { createStore } from 'vuex';
import axios from 'axios';

// Configuración del cliente API
const apiClient = axios.create({
  baseURL: 'https://backed-mongo.onrender.com/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` || '',
  },
});

// Función para actualizar el token en apiClient
function updateApiClientToken(token) {
  apiClient.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
}

// Creación del store de Vuex
export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    token: null,
    classes: [],
    reservations: [],
    isLoadingClasses: false,
    isLoadingReservations: false,
  },
  mutations: {
    // Autenticación
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      updateApiClientToken(token); // Actualizar el token en el cliente API
    },
    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      updateApiClientToken(''); // Limpiar el token en el cliente API
    },
    CLEAR_USER(state) {
      state.user = null;
    },

    // Clases
    SET_CLASSES(state, classes) {
      state.classes = classes;
    },
    SET_LOADING_CLASSES(state, isLoading) {
      state.isLoadingClasses = isLoading;
    },

    // Reservas
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
    },
    SET_LOADING_RESERVATIONS(state, isLoading) {
      state.isLoadingReservations = isLoading;
    },
    ADD_RESERVATION(state, reservation) {
      state.reservations.push(reservation);
    },
    REMOVE_RESERVATION(state, reservationId) {
      state.reservations = state.reservations.filter(reservation => reservation._id !== reservationId);
    },
    UPDATE_CLASSES(state, updatedClasses) {
      state.classes = updatedClasses;
    },
  },
  actions: {
    // Autenticación
    async registerUser({ commit }, userData) {
      try {
        const response = await apiClient.post('/auth/register', userData);
        const { token, user } = response.data;

        // No autenticamos al usuario automáticamente después de registrarse
        // commit('SET_AUTHENTICATED', true);
        // commit('SET_USER', user);
        // commit('SET_TOKEN', token);

        return response.data;
      } catch (error) {
        console.error('Error al registrar:', error.response ? error.response.data : error.message);
        throw error;
      }
    },

    async loginUser({ commit, dispatch }, credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        const { token, user } = response.data;

        commit('SET_AUTHENTICATED', true);
        commit('SET_TOKEN', token);
        commit('SET_USER', user);

        await dispatch('fetchUser');

        return response.data;
      } catch (error) {
        console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
        throw error;
      }
    },

    async fetchUser({ commit, state }) {
      if (!state.token) {
        return;
      }
      try {
        const response = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        commit('SET_USER', response.data);

        return response.data;
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error.response ? error.response.data : error.message);
        commit('CLEAR_AUTH');
        throw error;
      }
    },

    async logout({ commit }) {
      commit('CLEAR_AUTH');
      updateApiClientToken(''); // Limpiar el token en el cliente API
    },

    // Clases
    async fetchClasses({ commit }) {
      commit('SET_LOADING_CLASSES', true);
      try {
        const response = await apiClient.get('/classes');
        commit('SET_CLASSES', response.data.classes);
      } catch (error) {
        console.error('Error al obtener las clases:', error.response ? error.response.data : error.message);
      } finally {
        commit('SET_LOADING_CLASSES', false);
      }
    },

    // Reservas
    async fetchReservations({ commit }) {
      commit('SET_LOADING_RESERVATIONS', true);
      try {
        const response = await apiClient.get('/reservations'); // Cambiar el endpoint si es necesario
        commit('SET_RESERVATIONS', response.data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error.response ? error.response.data : error.message);
      } finally {
        commit('SET_LOADING_RESERVATIONS', false);
      }
    },

    async addReservation({ commit }, { classId, reservationData }) {
      try {
        const response = await apiClient.post(`/classes/${classId}/reserve`, reservationData);
        commit('ADD_RESERVATION', response.data);
        // Actualiza la lista de clases después de agregar una reserva
        await this.dispatch('fetchClasses');
      } catch (error) {
        console.error('Error al agregar la reserva:', error.response ? error.response.data : error.message);
        throw error;
      }
    },

    async removeReservation({ commit, dispatch, state }, reservationId) {
      if (!state.isAuthenticated) {
        console.error('No autenticado. No se puede eliminar la reserva.');
        return;
      }

      try {
        const response = await apiClient.delete(`/reservations/${reservationId}`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        if (response.status === 200) {
          commit('REMOVE_RESERVATION', reservationId);
          await dispatch('fetchClasses');
          await dispatch('fetchReservations');
          console.log('Reserva eliminada correctamente');
        } else {
          throw new Error(`Error al eliminar la reserva: ${response.data.message || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error al eliminar la reserva:', error.response ? error.response.data : error.message);
      }
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    isAdmin: state => state.user?.role === 'admin',
    user: state => state.user,
    token: state => state.token,
    classes: state => state.classes,
    isLoadingClasses: state => state.isLoadingClasses,
    getUser: state => state.user,
    isLoadingReservations: state => state.isLoadingReservations,
    reservations: state => state.reservations,
  },
});