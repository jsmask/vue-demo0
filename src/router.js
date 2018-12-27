import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import NotFound from './views/404'
import Register from './views/register'
import Login from './views/login'
import Home from './views/home'
import Infoshow from './views/infoshow'
import FundList from './views/fundlist'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'index',
        component: Index,
        children: [{
            path: "/",
            component: Home
        }, {
            path: "/home",
            name: "home",
            component: Home
        }, {
            path: "/infoshow",
            name: "infoshow",
            component: Infoshow
        }, {
            path: "/fundlist",
            name: "fundlist",
            component: FundList
        }]
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '*',
        name: 'notfound',
        component: NotFound
    }]
});

//路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = window.localStorage.getItem("kd_token") ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;