<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
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
    methods: {
        validate(cb) {
            // 全局校验

            // 1. 遍历所有FormItem，执行他们的validate方法
            const tasks = this.$children
                .filter(item => item.prop)
                .map(child => child.validate())

            return Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false))
        }
    }
}
</script>

<style>

</style>