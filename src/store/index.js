import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import * as modules from './modules';
import { BASE_URL, API_TOKEN } from '../const.js';

Vue.use(Vuex);
export let client = null;
let errorInterceptor;

export default new Vuex.Store({
  strict: true,
  mutations: {
    init(_) {
      if (errorInterceptor) {
        client.interceptors.response.eject(errorInterceptor);
      }
      client = Axios.create({
        baseURL: `${BASE_URL}`,
        headers: { Authorization: `Bearer ${API_TOKEN}` }
      });
      errorInterceptor = client.interceptors.response.use(
        (config) => config,
        (error) => {
          if (error?.response?.status === 401) {
            //
          }
          return Promise.reject(error.response);
        },
      );
    },
  },
  modules
});
