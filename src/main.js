import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import {create} from '@/utils/create'
import {create} from '@/utils/create-extend'

import router from './kvue-router'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create

// new Vue结果是根实例  $root
// App是根组件  $children[0]
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
