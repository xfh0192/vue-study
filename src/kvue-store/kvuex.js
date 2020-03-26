import Vue from 'vue'

class Store {
    constructor(options) {
        this.$options = options

        // 使state中的数据成为响应式数据
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        })

        // 保存mutations
        this._mutations = options.mutations
        this._actions = options.actions
        
        // 绑定commit、dispatch方法中的this到Store实例上
        const store = this;
        const {commit, dispatch} = store
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload)
        }
        this.dispatch = function boundDispatch(type, payload) {
            dispatch.call(store, type, payload)
        }
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.log('state不允许直接修改，想改请使用replaceState()')
    }

    // type-mutation类型, payload-参数
    commit(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
            console.error('unknown mutation type:'+type);
            return
        }
        // 此处可做拦截

        // 传递state执行
        entry(this.state, payload)
    }

    // 
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error('unknown action type:'+type);
            return
        }
        entry(this, payload)
    }
}

function install(_Vue) {
    const Vue = _Vue

    // 全局混入
    Vue.mixin({
        beforeCreate() {
            // this是Vue实例
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}

export default {Store, install}