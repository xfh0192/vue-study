

// ==== 作业1： 数组 ====
// 1. 保存数组原型
const arrayPropto = Array.prototype
// 2. 备份，修改备份
const arrayMethods = Object.create(null)
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
]

methodsToPatch.forEach(method => {
    arrayMethods[method] = function (...args) {
        // 数组原始操作
        arrayPropto[method].apply(this, args)
        console.log(`数组更新，执行方法：${method}`)
        // // 通知更新
        // if (this.__ob__) {
        //     // 触发setter
        //     this.__ob__.value    // 暂时想不到怎么触发。。
        // }
    }
})

// ===

function isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

// 
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return
    }
  
    // 创建一个Observer实例
    new Observer(obj)
    
    // 每次遍历一个对象属性就创建一个Ob实例
    // if (!obj.__ob__) {
    //     obj.__ob__ = new Observer(obj)
    // }
}

// 分辨响应式数据对象是对象还是数组
class Observer {
    constructor(obj) {
        this.value = obj
        this.walk(obj)
    }

    walk(obj) {
        if (isObj(obj)) {
            Object.keys(obj).forEach(key => {
                defineReactive(obj, key, obj[key])
            })
        } else if (Array.isArray(obj)) {
            // 1. 重写原型上的push等方法
            // obj.prototype = methodsToPatch
            obj.__proto__ = arrayMethods

            // 漏了对数组中每个元素响应式处理，参考答案更新
            for (let i = 0; i < obj.length; i++) {
                observe(obj[i])
            }
        }
    }
}

function defineReactive(obj, key, val) {
    // 递归遍历，如果val是对象
    observe(val)

    // 创建Dep实例和key一一对应
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            // 读拦截
            // console.log(`get: ${key}`, val)

            // 依赖收集
            Dep.target && dep.addDep(Dep.target)

            return val
        },

        set(newVal) {
            // 写拦截
            if (newVal !== val) {
                // 如果val是对象，还需要做响应式处理
                observe(val);

                val = newVal
                console.log(`set: ${key}`, val)

                // 更新
                // watchers.forEach(w => w.update())
                dep.notify()
            }
        }
    })
}

// 代理
function proxy(vm, prop) {
    Object.keys(vm[prop]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[prop][key]
            },
            set(newVal) {
                vm[prop][key] = newVal
            }
        })
    })
}

class KVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        // 1. data响应式处理
        observe(this.$data)

        // 2. 数据代理
        proxy(this, '$data')

        // 3. 编译
        new Compile(options.el, this)
    }
}

// Dep 管理watcher
class Dep {
    constructor() {
        this.watchers = []
    }

    addDep(dep) {
        this.watchers.push(dep)
    }

    notify() {
        this.watchers.forEach(w => w.update())
    }
}

// Watcher 和模板中的依赖1对1对应，如果某个key发生变化，则执行更新函数
class Watcher {
    constructor(vm, key, updater) {
        this.vm = vm
        this.key = key
        this.updater = updater

        // watchers.push(this)

        // 和Dep建立关系
        Dep.target = this
        this.vm[this.key]  // 触发get,可以做依赖收集
        Dep.target = null
    }

    // 更新方法是让Dep调用
    update() {
        this.updater.call(this.vm, this.vm[this.key])
    }
}

// 编译器：解析模板中的插值表达式或者指令
class Compile {
    // vm是KVue实例，用于初始化和更新页面
    // el是选择器，用于获取模板dom
    constructor(el, vm) {
        this.$vm = vm
        // 获取模板
        this.$el = document.querySelector(el)

        this.compile(this.$el)
    }

    compile(el) {
        const childNodes = el.childNodes

        // 遍历所有子节点
        Array.from(childNodes).forEach(node => {
            // 元素类型
            if (this.isElement(node)) {
                console.log('编译元素', node.nodeName);
                this.compileElement(node)
            } else if (this.isInter(node)) {
                console.log('编译插值', node.textContent);
                this.compileText(node)
            }

            // 递归
            if (node.childNodes) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }

    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileElement(node) {
        let attrs = node.attributes

        Array.from(attrs).forEach(attr => {
            // attr对象 {name:'k-text', value:'counter'}
            let attrName = attr.name    // k-text
            let exp = attr.value    // count

            if (this.isDir(attrName)) {
                // 获取指令处理函数
                let dir = attrName.slice(2) // text
                this[dir] && this[dir](node, exp)
            }
            
            // 作业2-2：处理事件
            if (this.isEvent(attrName)) {
                // @click="clickHandler"
                let eventName = attrName.slice(1)
                // node.addEventListener('eventName', function(...args) {
                //     this[eventName].apply(this.$vm, args)
                // })

                // 参考解答更改
                this.eventHandler(node, exp, eventName)
            }
        }) 
    }

    // 是否指令
    isDir(attr) {
        return attr.indexOf('k-') >= 0
    }

    // 是否事件
    isEvent(attr) {
        return attr.indexOf('@') == 0
    }

    // 编译插值文本{{}}，初始化
    compileText(node) {
        // node.innerText = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }

    // k-text指令执行
    text(node, exp) {
        // node.innerText = this.$vm[exp]
        this.update(node, exp, 'text')
    }
    
    // k-html
    html(node, exp) {
        // node.innerHTML = this.$vm[exp]
        this.update(node, exp, 'html')
    }

    // event
    eventHandler(node, exp, eventName) {
        const fn = this.$vm.$options.methods[exp]
        node.addEventListener(eventName, fn.bind(this.$vm))
    }

    // k-model="xx"
    // model
    model(node, exp) {
        // update只完成赋值和更新
        this.update(node, exp, 'model')

        // 事件监听
        // node.addEventListener('input', function(e) {
        //     // 新的值进行赋值
        //     this.$vm[exp] = e.target.value
        // }.bind(this))   // 切记需要绑定this

        node.addEventListener('input', (e) => {
            // 新的值进行赋值
            this.$vm[exp] = e.target.value
        })   // 或者箭头函数就不用绑了
    }

    // 更新方法
    update(node, exp, dir) {
        const fn = this[dir + 'Updater']
        // 初始化
        fn && fn(node, this.$vm[exp])
        
        // 【重点】在这个地方为每一个模板插值 创建一个watcher
        // 更新
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }

    // 文本实操函数
    textUpdater(node, val) {
        // 具体操作
        node.textContent = val
    }

    htmlUpdater(node, val) {
        node.innerHTML = val
    }

    // model
    modelUpdater(node, val) {
        node.value = val

        // 不能在这里处理，因为每次更新都会绑定一次监听，没办法移除
        // node.addEventListener('input', function(...args) {
        //     this.modelUpdater.apply(this, [node].concat(args))
        // })
    }
}


// export default KVue;
