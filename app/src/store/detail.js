// 请求数据，导入相应的接口
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  // 初始化产品信息的值
  goodsInfo: {},
  // 游客的临时身份
  uuid_token: getUUID()
}
const mutations = {
  // 产品信息
  GETGOODSInfo(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取产品信息
  getGoodsInfo({ commit }, skuid) {
    reqGoodsInfo(skuid).then((res) => {
      if (res.code == 200) {
        commit('GETGOODSInfo', res.data)
      }
    })
  },

  // 添加到购物车按钮
  addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = reqAddOrUpdateShopCart(skuId, skuNum).then((res) => {
      if (res.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    })
    return result
  }
}
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },

  // 产品详细数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },

  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
