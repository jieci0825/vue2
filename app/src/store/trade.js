// 导入api
import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  // 用户地址
  address: [],
  // 商品清单
  orderInfo: {}
}

const mutations = {
  // 用户地址信息
  GETUSERADDRESS(state, address) {
    state.address = address
  },

  // 商品清单的数据
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

const actions = {
  // 获取用户地址信息
  getUserAddress({ commit }) {
    reqAddressInfo().then((res) => {
      // console.log(res)
      if (res.code == 200) {
        commit('GETUSERADDRESS', res.data)
      }
    })
  },

  // 获取商品清单的数据
  getOrederInfo({ commit }) {
    reqOrderInfo().then((res) => {
      if (res.code == 200) {
        commit('GETORDERINFO', res.data)
      }
    })
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
