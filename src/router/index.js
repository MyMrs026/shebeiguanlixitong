import Vue from 'vue'
import Router from "vue-router";

const Home = () => import('@/views/home/Home')
const Project = () => import('@/views/projectManagement/projectManagement')
const Equp = () => import('@/views/equManagement/equManagement')
const Craft = () => import('@/views/craftManagement/craftManagement')
const Book = () => import('@/views/bookManagement/bookManagement')
const Train = () => import('@/views/trainManagement/trainManagement')
const Information = () => import('../views/informationManagement/informationManagement')
const System = () =>import('../views/systemManagement/systemManagement')

const Login =() => import('@/views/login/index.vue')
const Register =() => import('@/views/register/register.vue')
//1.安装插件
Vue.use(Router)
//创建router
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/project',
    component:Project
  },
  {
    path: '/equp',
    component:Equp
  },
  {
    path: '/craft',
    component:Craft
  },
  {
    path: '/book',
    component:Book
  },
  {
    path: '/train',
    component:Train
  },
  {
    path: '/information',
    component:Information
  },
  {
    path: '/system',
    component:System
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/register',
    component: Register
  }

]
const router = new Router({
  routes,
  mode: 'history'
})

export default router
