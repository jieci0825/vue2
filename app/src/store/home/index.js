import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'

// home 模块
const state = {
  categoryList: [],
  // 轮播图数据初始值
  bannerList: [],
  // floor数据初始值
  floorList: []
}
const mutations = {
  // 三级列表
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },

  // 轮播图
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },

  // floor
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  categoryList({ commit }) {
    reqCategoryList().then((res) => {
      if (res.code == 200) {
        commit('CATEGORYLIST', res.data)
      }
    })
  },

  // 获取首页轮播图的数据
  getBannerList({ commit }) {
    reqGetBannerList().then((res) => {
      // console.log(res)
      if (res.code == 200) {
        commit('GETBANNERLIST', res.data)
      }
    })
  },

  // 获取 floor 数据
  getFlootList({ commit }) {
    reqGetFloorList().then((res) => {
      if (res.code == 200) {
        commit('GETFLOORLIST', res.data)
      }
    })
  }
}
const getters = {}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}
