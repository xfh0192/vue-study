export default {

    render(h) {
        let component = null
        
        const route = this.$router.routeMap[this.$router.current]
        if (route) {
            component = route.component
        }
        return h(component)
    },
}