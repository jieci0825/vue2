// 引入一级路由组件
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 路由配置的信息
export default [
  // 首页
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  // 搜索
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
    props: ($router) => {
      return { keyword: $router.params.keyword, k: $router.query.k }
    }
  },
  // 登录
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  // 注册
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  // 详情
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true }
  },
  // 添加商品到购物车成功页面
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  // 购物车页面
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  // 交易页面
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 订单页面
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 支付成功页面
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 个人订单页面
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: 'myorder'
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
