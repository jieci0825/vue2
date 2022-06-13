module.exports = {
  productionSourceMap: false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      // 这里的 '/api' 表示如果发起请求的地址中带有/api就会往其他服务器请求数据
      api: {
        // target表示其他服务器的地址
        target: 'http://gmall-h5-api.atguigu.cn'
        // pathRewrite: { '^/api': '' }  路径重写(因为这里都是带有/api的，所以不需要)
      }
    }
  }
}
