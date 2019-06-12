import Vue from 'vue'
import './app/plugins/vuetify'
import Vuetify from "vuetify";
import App from './app/App.vue'
import router from "./router";
import AuthPlugin from "./app/plugins/auth";

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(AuthPlugin);
Vue.use(Vuetify);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
