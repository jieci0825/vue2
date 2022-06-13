// 对于axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  // 代表请求的时间
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }

  if (store.state.user.token) {
    // 在请求头添加token
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})

requests.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  (error) => {
    alert('服务器响应数据失败')
  }
)

// 对外分享
export default requests
