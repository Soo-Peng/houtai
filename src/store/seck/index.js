import { axiosGetSeckList } from '../../util/axios'

const state = {
    seckList : []
}
const getters = {
    getSeckList(state) {
        return state.seckList
    }
}

const mutations = {
    //获取商品列表
    REQ_SECKLIST(state, seckList) {
        state.seckList = seckList
    },
}
const actions = {
    getSeckListAction({commit}) {
        axiosGetSeckList()
            .then(res => {
                console.log(res.data, '秒杀列表');
                commit('REQ_SECKLIST',res.data.list)
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