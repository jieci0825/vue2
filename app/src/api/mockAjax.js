//对于axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
let requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done()
    //相应成功做的事情
    return res.data
  },
  (err) => {
    alert('服务器响应数据失败')
  }
)
export default requests
