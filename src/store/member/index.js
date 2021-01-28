import { axiosGetMemberList } from '../../util/axios'

const state = {
    memberList : []
}
const getters = {
    getMemberList(state) {
        return state.memberList
    }
}

const mutations = {

    REQ_MEMBERLIST(state, memberList) {
        state.memberList = memberList
    },
}
const actions = {
    getMemberListAction({commit}) {
        axiosGetMemberList()
            .then(res => {
                console.log(res.data, '会员列表');
                commit('REQ_MEMBERLIST',res.data.list)
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