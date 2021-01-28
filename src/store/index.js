//引入核心库
import Vue from 'vue'
//引入 vuex 插件
import Vuex from 'vuex'

// menu模块
import menu from './menu'
// role模块
import role from './role'
// manger模块
import manger from './manger'
// sort模块
import sort from './sort'
import specs from './specs'
import goods from './goods'
import banner from './banner'
import seck from './seck'
import member from './member'

Vue.use(Vuex)

export default new Vuex.Store({
    //模块
    modules : {
        menu,
        role,
        manger,
        sort,
        specs,
        goods,
        banner,
        seck,
        member
    }
})