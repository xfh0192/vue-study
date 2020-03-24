<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/emitter.js'

export default {
    name: 'KFormItem',
    componentName: 'KFormItem',
    mixins: [emitter],
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: '',
        },
        prop: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            error: '',
        }
    },
    methods: {
        validate() {
            // 1. 获取校验规则和值
            let rules = this.form.rules[this.prop]
            let value = this.form.model[this.prop]

            // 2. 获取校验器，Schema参数，key是校验字段名，值是校验规则
            const validator = new Schema({[this.prop]: rules});

            // 3. 执行校验，参数1是校验目标
            return new Promise((resolve, reject) => {
                validator.validate({[this.prop]: value}, (errors) => {
                    if (errors) {
                        // 校验失败
                        this.error = errors[0].message
                        reject()
                    } else {
                        // 校验通过
                        this.error = ''
                        resolve()
                    }
                })
            })
        }
    },
    mounted() {
        this.$on('validate', () => {
            this.validate()
        })

        // 派发事件通知KForm，新增一个formItem实例
        if (this.prop) {
            this.dispatch('KForm', 'kkb.form.addField', [this])
        }
    }
}
</script>

<style>

</style>