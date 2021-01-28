import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const indexRouter = [
  {
    path: '/menu',
    component: () => import('../components/system/menu'),
    name: '菜单管理'
  },
  {
    path: '/role',
    component: () => import('../components/system/role'),
    name: '角色管理'
  },
  {
    path: '/manger',
    component: () => import('../components/system/manger'),
    name: '管理员管理'
  },
  {
    path: '/sort',
    component: () => import('../components/system/sort'),
    name: '商品分类'
  },
  {
    path: '/specs',
    component: () => import('../components/system/specs'),
    name: '商品规格'
  },
  {
    path: "/goods",
    component: () => import("../components/system/goods"),
    name: "商品管理"
  },
  {
    path: "/banner",
    component: () => import("../components/system/banner"),
    name: "轮播图管理"
  }, 
  {
    path: "/seck",
    component: () => import("../components/system/seck"),
    name: "秒杀管理"
  },
  {
    path: "/member",
    component: () => import("../components/system/member"),
    name: "会员管理"
  }
]


const router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import('../components/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../components/index'),
      children: [
        {
          path: '/home',
          component: () => import('../components/system/home'),
          name: '首页'
        },
        ...indexRouter,
        {
          path: '',
          redirect: '/menu'
        }
      ]
    },
    {
      path: '*',
      name: 'login',
      redirect: 'login'
    },
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(from,'3333333333333333333333333333');
  if (to.path == '/login') {
    return next()
  } else if (window.sessionStorage.getItem('loginInfo')) {

    if(hasUrl(to.path)||to.path=='/home'){
      return next();
    }
    return next('/home');
  }
  next('/login')
})

function hasUrl(url){
  let data =JSON.parse(window.sessionStorage.getItem('loginInfo'));
  return data.menus_url.some(item=>item==url)
}



export default router