import Vue from 'vue'
import Vuex from 'vuex'
import datas from './modules/datas'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    datas
  },
  getters
})

export default store
