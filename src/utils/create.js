// 1. 创建一个create函数，可以动态生成组件实例，并且挂载至body上

import Vue from 'vue'

export function create(component, props) {
    // 借用Vue的构造函数来动态生成这个组件实例
    // Vue.extend(props)

    let vm = new Vue({
        render(h) {
            return h(component, {props})
        }
    })

    // 通过挂载得到真实dom
    vm.$mount()

    // 通过$el属性获取真实dom
    document.body.appendChild(vm.$el)

    // 返回组件实例
    const comp = vm.$children[0]
    
    // 销毁方法
    comp.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp;
}