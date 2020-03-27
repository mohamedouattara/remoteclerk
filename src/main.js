import Vue from 'vue'
import App from './App.vue'
import router from './router'
import('./styles/style.scss');
import VueSocketIO from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue';

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
}))

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
