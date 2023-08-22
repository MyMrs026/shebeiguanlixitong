/** 
 * vue路由文件
*/
import Vue from 'vue'
import Router from "vue-router";

const Home = () => import('@/views/home/Home')
const Project = () => import('@/views/projectManagement/projectManagement')
const Equp = () => import('@/views/equManagement/equManagement')
const Book = () => import('@/views/bookManagement/bookManagement')
const Train = () => import('@/views/trainManagement/trainManagement')
const System = () => import('../views/systemManagement/systemManagement')
const Test = () => import('../views/testingTasks/testingTasks.vue')
const LabInform = () => import('../views/labInformation/labInformation.vue')
const EquList = () => import('../views/equList/equList.vue')
const InformationDisplay = () => import('../views/informationDisplay/informationDisplay.vue')
const PersonalInfo = () => import('../views/personalInfo/personalInfo.vue')
const OrganizationInfo = () => import('../views/organizationInfo/organizationInfo.vue')
const Craft = () => import('@/views/craftManagement/craftManagement')
const Equcraft = () => import('../views/craftManagement/equpCraft.vue')
const Craftparams = () => import('../views/craftManagement/craftParams.vue')

const Login = () => import('@/views/login/index.vue')
const Register = () => import('@/views/register/register.vue')
const Error = () => import('../components/common/error/Error.vue')

const Notice = () => import('../views/notice/notice')
const NoticeDetail = () => import('../views/notice/noticeDetail.vue')
const Message = () => import('../views/message/message')
const MessageDetail = () => import('../views/message/messageDetail.vue')
const TrainBooksDetail = () => import('../views/message/trainBooksDetail.vue')
//1.安装插件
Vue.use(Router)
//创建router
const routes = [
  {
    path: '/',
    redirect: '/login', //路由重定向，就是默认跳到的路由
  },
  {
    path: '/404',
    name: 'index-notFount',
    component: Error
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/equp',
    name: 'Equp',
    component: Equp
  },
  {
    path: '/craft',
    name: 'Craft',
    redirect:'/craft/equcraft',
    component: Craft,
    children: [{
      //子路由
      path: '/craft/equcraft',
      name: 'Equcraft',
      component: Equcraft
    },
    {
      path: '/craft/craftparams',
      name: 'Craftparams',
      component: Craftparams
    }
    ]
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/train',
    name: 'Train',
    component: Train
  },
  {
    path: '/system',
    name: 'System',
    component: System
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/labinform',
    name: 'LabInform',
    component: LabInform
  },
  {
    path: '/equlist',
    name: 'EquList',
    component: EquList
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/organizationInfo',
    name: 'OrganizationInfo',
    component: OrganizationInfo
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: NoticeDetail
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/message/:id',
    name: 'MessageDetail',
    component: MessageDetail
  },
  {
    path: '/trainBook/:id',
    name: 'TrainBooksDetail',
    component: TrainBooksDetail
  },
  {
    path: '/informationDisplay',
    name: 'InformationDisplay',
    component: InformationDisplay
  }
]
const router = new Router({
  routes,
  mode: 'history'
})

//添加路由守卫，它的作用就是，如果没有登录就无法直接跳转指定页面
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if ((to.name !== 'Login' && to.name !== 'Register') && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
