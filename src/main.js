import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from "vuetify";
import App from './app/App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
}).$mount('#app')
