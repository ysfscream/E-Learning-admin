import ElementUI from 'element-ui'
import '@/assets/scss/e-learning-variables.scss'

import Vue from 'vue'
import App from './App'
import router from './routes'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
