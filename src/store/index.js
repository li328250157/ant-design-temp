import Vue from 'vue'
import Vuex from 'vuex'
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
import app from './modules/app'
import global from './modules/global'
// default router permission control
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    global
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
}, )