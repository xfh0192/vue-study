import Vue from 'vue'
import Vuex from './kvuex'

// $store挂载
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    },
    actions: {
        asyncAdd({commit}) {
            setTimeout(() => {
                commit('add')
            }, 1000)
        }
    }
})

export default store