import { axiosGetMangerList, axiosGetMangerListCount } from '../../util/axios'

const state = {
    mangerList: [],
    mangerListCount: 0,
    pages: {
        size: 4,
        page: 1,
    },
}
const getters = {
    getMangerList(state) {
        return state.mangerList
    },
    getMangerListCount(state) {
        return state.mangerListCount
    },
    getMangerPages(state){
        return state.pages
    }
}

const mutations = {
    //获取角色列表
    REQ_MANGERIST(state, mangerList) {
        state.mangerList = mangerList
    },
    // 获去管理
    REQ_MANGERISTCOUNT(state, mangerListCount) {
        state.mangerListCount = mangerListCount
    },
    SET_MANGERPAGESPAGE(state,page){
        state.pages.page = page
    }
}
const actions = {
    getMangerListAction(plyload) {
        axiosGetMangerList(plyload.state.pages)
            .then(res => {
                console.log(res.data, '管理员列表');
                plyload.commit('REQ_MANGERIST', res.data.list)
            })
    },
    getMangerListCountAction({ commit }) {
        axiosGetMangerListCount()
            .then(res => {
                console.log(res.data.list[0].total, '管理员列表条目');
                commit('REQ_MANGERISTCOUNT', res.data.list[0].total)
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