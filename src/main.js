import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'
// 引入 flexible
import 'amfe-flexible'
// 引入所有vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
