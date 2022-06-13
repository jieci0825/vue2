// 配置路由的文件
// 引入vue实例对象
import Vue from 'vue'
// 引入路由插件
import VueRouter from 'vue-router'
// 引入路由信息模块
import routes from './routes.js'
// 引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push

// 重写push | replace
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    originReplace.call(this, location, reslove, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 共享路由实例对象
let router = new VueRouter({
  // 配置路由 - 键值一样，简写
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

// 全局前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 登录时，就禁止跳转，同时返回首页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 登录去的不是login，是其他页面，需要进行判定name的值
      if (name) {
        // 如果有name，则进行跳转
        next()
      } else {
        // 如果没有，先派发actions请求。让仓库存储用户信息在跳转
        try {
          // 获取用户信息
          await store.dispatch('getUserInfo')
          // store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // 当时间太久，token失效之后，清空数据，回到登录
          store.dispatch('userLogOut')
          // 回到登录
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (
      // 只要路径中包含以下字符，则跳转登录页
      toPath.indexOf('trade') != -1 ||
      toPath.indexOf('pay') != -1 ||
      toPath.indexOf('center') != -1
    ) {
      next('/login?redirect=' + toPath)
    } else {
      // 其他页面放行
      next()
    }
  }
})

// 对外暴露
export default router
