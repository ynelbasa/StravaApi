import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment';
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.moment = moment
Vue.prototype.$accessCode = 'aa73dc83b4afd6e36f6d12a15a23137facf5a615'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
