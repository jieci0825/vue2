// 登录与注册模块
// 引入api接口
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  // 验证码的初始值
  code: '',
  // token
  token: getToken(),
  // 用户信息
  userInfo: {}
}

const mutations = {
  // 接收到的验证码
  GETCODE(state, code) {
    state.code = code
  },

  // token
  USERLOGIN(state, token) {
    state.token = token
  },

  // 用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },

  // 退出登录清空数据
  CLEAR(state) {
    // 仓库数据清空
    state.token = ''
    state.userInfo = {}
    // 本地存储数据清空
    removeToken()
  }
}

const actions = {
  // 获取验证码
  getCode({ commit }, phone) {
    // 获取验证码的这个接口，把验证码返回，但是正常情况下，这个验证码是要返回到用户手机上的[需要收费]
    let result = reqGetCode(phone).then((res) => {
      // console.log(res)
      if (res.code == 200) {
        commit('GETCODE', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    return result
  },

  // 注册用户
  userRegister({ commit }, user) {
    let result = reqUserRegister(user).then((res) => {
      console.log(res)
      if (res.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    console.log(result)
    return result
  },

  // 登录业务
  uesrLogin({ commit }, data) {
    let result = reqUserLogin(data)
      .then((res) => {
        // console.log(res)
        // 服务器下发的token是用户唯一标识
        if (res.code == 200) {
          commit('USERLOGIN', res.data.token)
          // 调用外部封装的函数，持久存储token
          setToken(res.data.token)
          return 'ok'
        }
        // else {
        //   // return Promise.reject(new Error('faile'))
        //   return Promise.reject(res.data)
        // }
      })
      .catch((err) => {
        // 使用 catch 捕获错误，防止控制台报错
        console.log(err)
      })
    // console.log(result)
    return result
  },

  // 获取用户信息
  getUserInfo({ commit }) {
    let result = reqUserInfo().then((res) => {
      // console.log(res)
      if (res.code == 200) {
        // 提交用户信息
        commit('GETUSERINFO', res.data)
        return 'ok'
      } else {
        // return Promise.reject(new Error(''))
      }
    })
    return result
  },

  // 退出登录
  userLogOut({ commit }) {
    // 向服务器发起一次请求，
    let result = reqLogout().then((res) => {
      // console.log(res)
      if (res.code == 200) {
        // 如果请求成功，则提交请求(因为actions里面不能操作state)，清空数据
        commit('CLEAR')
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    return result
  }
}

const getters = {}

// 导出
export default {
  state,
  mutations,
  actions,
  getters
}
