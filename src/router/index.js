import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Book from '@/views/Book.vue'
import User from '@/views/System/User.vue'
import SystemBook from '@/views/System/Book.vue'
import Reader from '@/views/Reader.vue'
import Profile from '@/views/Profile.vue'
import TieBaLogin from '@/views/TieBaLogin.vue'
import TieBa from '@/views/TieBa.vue'
import TieBaInfo from '@/views/TieBaInfo.vue'

Vue.use(VueRouter)

const routes = [{
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
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/book',
        name: 'Book',
        component: Book
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/sysbook',
        name: 'SysBook',
        component: SystemBook
      },
      {
        path: '/reader',
        name: 'Reader',
        component: Reader
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/tiebalogin',
        name: 'TieBaLogin',
        component: TieBaLogin
      },
      {
        path: '/tiebainfo',
        name: 'TieBaInfo',
        component: TieBaInfo
      },
      {
        path: '/tieba',
        name: 'TieBa',
        component: TieBa
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router