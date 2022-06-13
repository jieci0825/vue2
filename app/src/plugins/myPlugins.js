// 自定义插件暴露一定是一个对象
let myPlugins = {}

// 可以接收传递过来的参数
myPlugins.install = function (Vue, options) {
  // 全局指令
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
