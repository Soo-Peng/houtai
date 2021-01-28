import { axiosGetMenuList ,axiosGetMenuListTree} from '../../util/axios'

const state = {
    menuList: [],
    menuListTree:[]
}
const getters = {
    getMenuList(state) {
        return state.menuList
    },
    getMenuListTree(state) {
        return state.menuListTree
    }
}

const mutations = {
    //获取菜单列表
    REQ_MENULIST(state, menuList) {
        state.menuList = menuList
    },
    REQ_MENULISTTREE(state, menuList) {
        state.menuListTree = menuList
    }
}
const actions = {
    getMenuListAction({commit}) {
        axiosGetMenuList()
            .then(res => {
                console.log(res.data, '菜单列表');
                commit('REQ_MENULIST',res.data.list)
            })
    },
    getMenuListTreeAction({commit}) {
        axiosGetMenuListTree()
            .then(res => {
                console.log(res.data, '菜单列表树');
                commit('REQ_MENULISTTREE',res.data.list)
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