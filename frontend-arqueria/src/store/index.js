import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    classes: [],
    reservations: [],
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true', // Estado de admin desde localStorage
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_CLASSES(state, classes) {
      state.classes = classes;
    },
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
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
      localStorage.setItem('isAdmin', isAdmin); // Guardar estado de admin en localStorage
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      localStorage.clear();
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/api/auth/register', userData);
        commit('SET_TOKEN', response.data.token);
        commit('SET_USER', response.data.user);
        commit('SET_AUTHENTICATED', true);
        commit('SET_ADMIN', response.data.user.isAdmin); // Asegúrate de que `isAdmin` esté en `user`
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials);
        commit('SET_TOKEN', response.data.token);
        commit('SET_USER', response.data.user);
        commit('SET_AUTHENTICATED', true);
        commit('SET_ADMIN', response.data.user.isAdmin); // Asegúrate de que `isAdmin` esté en `user`
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
  },
});

export default store;
