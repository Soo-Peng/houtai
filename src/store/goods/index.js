import { axiosGetGoodsList, axiosGetGoodsListCount } from '../../util/axios'

const state = {
    goodsList: [],
    goodsListCount: 0,
    pages: {
        size: 2,
        page: 1,
    },
}
const getters = {
    getGoodsList(state) {
        return state.goodsList
    },
    getGoodsListCount(state) {
        return state.goodsListCount
    },
    getGoodsPages(state){
        return state.pages
    }
}

const mutations = {
    //获取角色列表
    REQ_GOODSIST(state, goodsList) {
        state.goodsList = goodsList
    },
    // 获去管理
    REQ_GOODSISTCOUNT(state, goodsListCount) {
        state.goodsListCount = goodsListCount
    },
    SET_GOODSPAGESPAGE(state,page){
        state.pages.page = page
    }
}
const actions = {
    getGoodsListAction(plyload) {
        axiosGetGoodsList(plyload.state.pages)
            .then(res => {
                console.log(res.data, '商品列表');
                plyload.commit('REQ_GOODSIST', res.data.list)
            })
    },
    getGoodsListCountAction({ commit }) {
        axiosGetGoodsListCount()
            .then(res => {
                console.log(res.data.list[0].total, '商品列表条目');
                commit('REQ_GOODSISTCOUNT', res.data.list[0].total)
            })
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    // 命名空间
    namespaced: true
}