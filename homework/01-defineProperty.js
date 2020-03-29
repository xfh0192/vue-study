
class KVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        // 1. data响应式处理
        observe(this.$data)

        // 2. 数据代理
        proxy(this, '$data')

        // 3. 编译
        
    }
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return;
    }
    
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive(obj, key, val) {
    // 递归遍历，如果val是对象
    observe(val)

    Object.defineProperty(obj, key, {
        // 读拦截
        get() {
            console.log(`get: ${key}`, val)
            return val
        },
        
        // 写拦截
        set(newVal) {
            if (newVal !== val) {
                console.log(`set: ${key} ${newVal}`)
                val = newVal
            }
        }
    })
}

function proxy(obj, prop) {
    Object.keys(obj[prop]).forEach(key => {
        Object.defineProperty(obj, key, {
            get() {
                return obj[prop][key]
            },
            set(newVal) {
                obj[prop][key] = newVal
            }
        })
    })
}

// export default KVue;

// ====

let vm = new KVue({
    data: {
        foo: 'foo',
        baz: {a: 1}
    }
})

vm.foo
vm.foo = 'foooo1'
vm.baz.a
vm.baz.a = 2