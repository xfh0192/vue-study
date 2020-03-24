import Vue from 'vue'

export function create(component, props) {

    // 创建组件的构造函数
    // let vmConstruct = Vue.extend(Object.assign({}, component, {data: () => props}))
    let vmConstruct = Vue.extend(component)

    // 实例化，生成dom
    let comp = new vmConstruct({propsData: props}).$mount()
    
    // 插入body
    document.body.appendChild(comp.$el);
    
    // 因为用Vue.extend生成的是组件构造函数，实例化之后就是根组件（并不是根实例，不需要comp.$children[0]）
    // 销毁方法
    comp.remove = () => {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }

    return comp;
}