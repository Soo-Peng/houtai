import { axiosGetSortList } from '../../util/axios'

const state = {
    sortList : []
}
const getters = {
    getSortList(state) {
        return state.sortList
    }
}

const mutations = {
    //获取商品列表
    REQ_SORTLIST(state, sortList) {
        state.sortList = sortList
    },
}
const actions = {
    getSortListAction({commit}) {
        axiosGetSortList()
            .then(res => {
                console.log(res.data, '商品分类列表');
                commit('REQ_SORTLIST',res.data.list)
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