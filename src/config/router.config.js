// eslint-disable-next-line
import {
  BasicLayout,
  UserLayout
} from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [{
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'menu.home'
    },
    redirect: '/home',
    children: [
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/home'),
            meta: {
                title: 'menu.home',
                icon:'ordered-list',
                permission:['user','admin']
            }
        },
      {
        path: '/content',
        name: 'Content',
        component: () => import('@/views/content/index'),
        meta: {
          title: 'menu.content',
          icon:'copy',
          permission:['user','admin']
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/accounts/index'),
        meta: {
          title: 'menu.account',
          icon:'ie',
          permission:['user','admin']
        }
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: {
          title: 'menu.comment',
          icon:'aliwangwang',
          permission:['user','admin']
        }
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: {
          title: 'menu.tag',
          icon:'tags',
          permission:['user','admin']
        }
      },
      {
        path: '/domain',
        name: 'Domain',
        component: () => import('@/views/domain/index'),
        meta: {
          title: 'menu.domain',
          icon:'linkedin',
          permission:['user','admin']
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
      },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import( /* webpackChunkName: "user" */ '@/views/user/Register')
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      // }
    ]
  },

  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
