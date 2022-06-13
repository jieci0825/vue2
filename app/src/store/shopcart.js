// 导入api接口
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  // 购物车初始数据
  cartList: []
}

const mutations = {
  // 购物车
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 购物车列表数据
  getCartList({ commit }) {
    reqCartList().then((res) => {
      if (res.code == 200) {
        commit('GETCARTLIST', res.data)
      }
    })
  },

  // 删除购物车产品
  deleteCartListBySkuId({ commit }, skuId) {
    let result = reqDeleteCartById(skuId).then((res) => {
      if (res.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    return result
  },

  // 修改购物车某一产品的选中状态
  updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = reqUpdateCheckedById(skuId, isChecked).then((res) => {
      if (res.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    return result
  },

  // 删除所有选中的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },

  // 修改全部产品的选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
