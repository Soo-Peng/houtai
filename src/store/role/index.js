import { axiosGetRoleList } from '../../util/axios'

const state = {
    roleList : []
}
const getters = {
    getRoleList(state) {
        return state.roleList
    }
}

const mutations = {
    //获取角色列表
    REQ_ROLELIST(state, roleList) {
        state.roleList = roleList
    },
}
const actions = {
    getRoleListAction({commit}) {
        axiosGetRoleList()
            .then(res => {
                console.log(res.data, '角色列表');
                commit('REQ_ROLELIST',res.data.list)
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