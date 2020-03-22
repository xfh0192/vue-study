<template>
<div>
    <KForm :model="model" :rules="rules" ref="form">
        <KFormItem label="用户名" prop="username">
            <KInput v-model="model.username" placeholder="请输入用户名"/>
        </KFormItem>
        <KFormItem label="密码" prop="password">
            <KInput type="password" v-model="model.password" placeholder="请输入密码"/>
        </KFormItem>
        <KFormItem>
            <button @click="login">登录</button>
        </KFormItem>
    </KForm>
</div>
</template>

<script>
import KForm from './KForm'
import KFormItem from './KFormItem'
import KInput from './KInput'
import Notice from '../Notice'

export default {
    components: {
        KForm,
        KFormItem,
        KInput,
    },
    data() {
        return {
            model: {
                username: '',
                password: '',
            },
            rules: {
                username: [{required: true, message: '请输入用户名'}],
                password: [{required: true, message: '请输入密码'}],
            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate(isValid => {
                if (isValid) {
                    alert('校验通过')
                } else {
                    // alert('校验失败')
                    this.$create(Notice, {
                        title: '校验失败',
                        message: '校验错误，请重试',
                        duration: 3000
                    }).show()
                }
            })
        }
    }
}
</script>

<style>

</style>