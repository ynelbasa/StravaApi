import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment';
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.moment = moment
Vue.prototype.$googleApiKey = 'AIzaSyAYYWSEDiyx7lomBF9IX-lZdASo4C8G9S4'

axios.post("https://www.strava.com/api/v3/oauth/token?client_id=51311&client_secret=182e267e5d263a569a8b56c1755563af7f87e8a1&grant_type=refresh_token&refresh_token=223f998757623581acc1c7183c764bf8149399d4")
  .then((response) => {
    Vue.prototype.$accessCode = response.data.access_token;

    new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  });