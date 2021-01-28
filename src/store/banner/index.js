import { axiosGetBannerList } from '../../util/axios'

const state = {
    bannerList : []
}
const getters = {
    getBannerList(state) {
        return state.bannerList
    }
}

const mutations = {
    //获取商品列表
    REQ_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
}
const actions = {
    getBannerListAction({commit}) {
        axiosGetBannerList()
            .then(res => {
                console.log(res.data, '轮播图列表');
                commit('REQ_BANNERLIST',res.data.list)
            })
    },
}
export default {
    state,
    getters,
    mutations,
    actions,
    // 命名空间
    namespaced: true
}