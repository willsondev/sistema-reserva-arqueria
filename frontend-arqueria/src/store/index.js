import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
  state: {
    user: null,
    classes: [],
    reservations: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CLASSES(state, classes) {
      state.classes = classes;
    },
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/api/auth/register', userData);
        localStorage.setItem('token', response.data.token);
        commit('SET_USER', response.data.user);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        commit('SET_USER', response.data.user);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async fetchClasses({ commit }) {
      try {
        const response = await axios.get('/api/classes');
        commit('SET_CLASSES', response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    },
    async fetchReservations({ commit }) {
      try {
        const response = await axios.get('/api/users/reservations');
        commit('SET_RESERVATIONS', response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async reserveClass({ dispatch }, { classId, userId }) {
      try {
        await axios.post(`/api/classes/${classId}/reserve`, { userId });
        dispatch('fetchReservations');
      } catch (error) {
        console.error('Error reserving class:', error);
      }
    },
  },
});

export default store;
