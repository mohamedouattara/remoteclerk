import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/call',
        name: 'Call',
        component: () => import(/* webpackChunkName: "about" */ '../views/Call.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue')
    }



]

const router = new VueRouter({
    routes
})

export default router
