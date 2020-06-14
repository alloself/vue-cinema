import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.scss'
import '@mdi/font/css/materialdesignicons.min.css';
import './components';


Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
  async created() {
    await this.$store.commit('init');
  }
}).$mount('#app');
