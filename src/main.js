import ElementUI from 'element-ui'
import '@/assets/scss/e-learning-variables.scss'

import 'vue-touch-ripple/dist/vue-touch-ripple.css'

import router from '@/routes'
import store from '@/store'

import Vue from 'vue'
import App from './App'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
