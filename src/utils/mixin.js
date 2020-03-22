export default {
    methods: {
        
        dispatch(targetCompName, eventName, payload) {
            let parentComp = this.$parent;
            while (this.$parent && this.$parent.$options.componentName !== targetCompName) {
                parentComp = this.$parent;
            }
            parentComp && parentComp.$emit(eventName, payload);
        },
    },
}