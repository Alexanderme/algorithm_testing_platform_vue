import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Algo = () => import('views/algo/Algo')
const Platform = () => import('views/platform/Platform')
const Login = () => import('views/login/Login')

Vue.use(VueRouter)
const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/algo',
        component:Algo
    },
    {
        path:'/platform',
        component:Platform
    },
    {
        path:'/login',
        component:Login
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



export default router