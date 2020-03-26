import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home'

// 1. 使用一个插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes,
})

export default router;