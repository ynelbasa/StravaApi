import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.moment = moment;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
