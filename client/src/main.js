import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import VueEllipseProgres from 'vue-ellipse-progress'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(VueEllipseProgres);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
