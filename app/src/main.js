import Vue from 'vue'
import App from './App.vue'
// 引入仓库
import store from '@/store'
// 按需引入elementUI组件
import { Button, MessageBox } from 'element-ui'
// 引入懒加载
import VueLazyload from 'vue-lazyload'
// 引入懒加载的默认图片（图片和json数据默认对外暴露）
import atm from '@/assets/1.gif'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图组件--全局组件
import Carsousel from '@/components/Carsousel'
// 分页器组件--全局组件
import Pagination from '@/components/Pagination'
// 注册为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 全局注册懒加载
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: atm
})

// 引入mock模拟数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口文件夹里面的统一函数
import * as API from '@/api'

// 引入路由
import router from '@/router'

Vue.config.productionTip = false

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
// 全局注册自定义插件,可以传参
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus 配置
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将API挂载到vue的原型身上
    Vue.prototype.$API = API
  },

  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route, $router属性
  router,
  store
}).$mount('#app')
