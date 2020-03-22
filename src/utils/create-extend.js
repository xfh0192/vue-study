import Vue from 'vue'

export function create(component, props) {

    // 创建组件的构造函数
    let vmConstruct = Vue.extend(Object.assign({}, component, {data: () => props}))

    // 实例化，生成dom
    let comp = new vmConstruct().$mount()

    // 插入body
    document.body.appendChild(comp.$el);
    
    // 销毁方法
    comp.remove = () => {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }

    return comp;
}