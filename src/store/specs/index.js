import { axiosGetSpecsList, axiosGetSpecsListCount } from '../../util/axios'

const state = {
    specsList: [],
    specsListCount: 0,
    pages: {
        size: 4,
        page: 1,
    },
}
const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getSpecsListCount(state) {
        return state.specsListCount
    },
    getSpecsPages(state){
        return state.pages
    }
}

const mutations = {
    //获取角色列表
    REQ_SPECSIST(state, specsList) {
        state.specsList = specsList
    },
    // 获去管理
    REQ_SPECSISTCOUNT(state, specsListCount) {
        state.specsListCount = specsListCount
    },
    SET_SPECSPAGESPAGE(state,page){
        state.pages.page = page
    }
}
const actions = {
    getSpecsListAction(plyload) {
        axiosGetSpecsList(plyload.state.pages)
            .then(res => {
                console.log(res.data, '商品规格列表');
                plyload.commit('REQ_SPECSIST', res.data.list)
            })
    },
    getSpecsListCountAction({ commit }) {
        axiosGetSpecsListCount()
            .then(res => {
                console.log(res.data.list[0].total, '商品规格列表条目');
                commit('REQ_SPECSISTCOUNT', res.data.list[0].total)
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