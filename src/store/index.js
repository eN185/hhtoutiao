import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)
// vuex
// -vuex就是一个仓库，存放数据
// -vuex的数据是响应式的
// 怎么修改vuex数据
// -vuex的数据是自产自销
// -vuex的数据必须在vuex里面修改
// -mutations定义方法去修改，在外面调用这个方法
// -mutations方法建议大写
// -mutations方法可以接收两个参数，一个是 state，第二个是：payload
// - $store。commit('方法名')用于触发mutations里面的方法
export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
    tokenObj: getToken() || {}
  },

  mutations: {
    STE_TOKE (state, payload) {
      // 将token 存入 vuex
      state.tokenObj = payload
      // token 存入本地存储中
      // 本地存储 操作的是JSON字符串
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOKEN', payload)
      setToken(payload)
    }
  }
})
