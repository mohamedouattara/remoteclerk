import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile";

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
        component: () => import('../views/Call.vue')
    },
    {
        path: '/cockpit',
        name: 'Cockpit',
        component: () => import('../views/Cockpit.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import('../views/Registration.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = new VueRouter({
    routes
})

export default router
