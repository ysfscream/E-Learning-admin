import ElementUI from 'element-ui'
import '@/assets/scss/e-learning-variables.scss'

import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

import Vue from 'vue'
import App from './App'
import router from './routes'

Vue.use(ElementUI)

Vue.use(VueTouchRipple, {
  opacity: 0.1,
  speed: 2,
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
