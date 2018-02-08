import Vue from 'vue'
import Vuex from 'vuex'

import teacher from './modules/teacher'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account: teacher,
  },
})

export default store
