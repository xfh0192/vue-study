export default {

    // render(h) {
    //     let component = null
        
    //     const route = this.$router.routeMap[this.$router.current]
    //     if (route) {
    //         component = route.component
    //     }
    //     return h(component)
    // },

    name: 'RouterView',
    // functional: true,
    props: {
        name: String,
        default: 'default',
    },

    render(h) {
        // 标记当前router-view深度
        this.$vnode.data._routerView = true

        let depth = 0
        let parent = this.$parent
        while(parent) {
            let vnodeData = parent.$vnode && parent.$vnode.data
            if (vnodeData) {
                if (vnodeData._routerView) {
                    depth++
                }
            }

            parent = parent.$parent
        }

        let component = null
        const route = this.$router.matched[depth]
        if (route) {
            component = route.component
        }
        return h(component)
    }
}