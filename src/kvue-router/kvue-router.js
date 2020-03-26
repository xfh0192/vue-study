import Vue from 'vue'
import KRouterView from './krouter-view'
import KRouterLink from './krouter-link'

// 1. 实现一个插件。挂载$router，生命两个全局组件
// 2. 实现一个KVueRouter类，管理url变化

class KVueRouter {
    constructor(options) {
        // 保存选项
        this.$options = options

        // 设置一个响应式的current属性  【mark】
        Vue.util.defineReactive(this, 'current', '/')
        
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))

        // 对路由数组做预处理：转换为map
        this.routeMap = {}
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route
        })
    }

    onHashChange() {
        let hash = window.location.hash.slice(1)
        this.current = hash
    }
}

KVueRouter.install = function (_Vue) {
    const Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            // router只有在根实例中才存在
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        },
    })

    Vue.component('router-view', KRouterView)
    Vue.component('router-link', KRouterLink)
}

export default KVueRouter;