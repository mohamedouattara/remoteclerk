import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from "./store/store";
import('./styles/style.scss');
import VueSocketIO from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue';

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
}))

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (location.protocol != 'https:' && location.hostname !== "localhost") {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}