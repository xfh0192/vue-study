<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import emitter from '@/mixins/emitter.js'

export default {
    componentName: 'KForm',
    mixins: [emitter],
    provide() {
        return {
            form: this,
        }
    },
    props: {
        model: Object,
        rules: Object,
    },
    data() {
        return {
            
        }
    },
    created() {
        this.fields = []
        this.$on('kkb.form.addField', (item) => {
            this.fields.push(item)
        })

        // 移除
        // ...
    },
    methods: {
        validate(cb) {
            // 全局校验

            // 1. 遍历所有FormItem，执行他们的validate方法
            // const tasks = this.$children    // 需要改
            //     .filter(item => item.prop)
            //     .map(child => child.validate())

            // 假如formitem中注册会通知，则不需要filter
            const tasks = this.fields.map(item => item.validate());

            return Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false))
        }
    }
}
</script>

<style>

</style>