<template>
    <div>
        <input :value="value" @input="onInput" v-bind="$attrs"/>
    </div>
</template>

<script>
import mixin from '@/utils/mixin'

export default {
    name: 'KInput',
    inheritAttrs: false,
    mixins: [mixin],
    props: {
        value: {
            type: String,
            default: '',
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)

            // 实时校验，通知父组件
            // this.$parent.$emit('validate')      // 作业1：不用$parent降低耦合
            this.dispatch('KFormItem', 'validate')
        }
    }
}
</script>

<style>

</style>