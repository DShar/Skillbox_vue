import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/index';
import App from './App.vue';
// import { message1, message2 } from './messages';
// import Func from './func';

// Func(message1);
// Func(message2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
