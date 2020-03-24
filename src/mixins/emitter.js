export default {
    methods: {
        // 冒泡派发事件
        dispatch(componentName, eventName, payload) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;

            while (parent && name !== componentName) {
                parent = this.$parent;

                if (parent) {
                    name = parent.$options.componentName
                }
            }
            parent && parent.$emit.apply(parent, [eventName].concat(payload));
        },

        // 
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    },
}

function broadcast(componentName, eventName, params) {
    let children = this.$children;
    children.forEach(child => {
        let name = child.$options.componentName

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))    
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params))
        }
    });
}