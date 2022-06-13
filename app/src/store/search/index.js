import { reqGetSearchInfo } from '@/api'
// search 模块
const state = {
  // search模块初始值
  searchList: {}
}
const mutations = {
  // search模块的数据
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块数据
  getSearchList({ commit }, params = {}) {
    reqGetSearchInfo(params).then((res) => {
      // console.log(res)
      if (res.code == 200) {
        commit('GETSEARCHLIST', res.data)
      }
    })
  }
}

// 计算属性
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },

  trademarkList(state) {
    return state.searchList.trademarkList || []
  },

  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}
