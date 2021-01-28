import http from './axios'


// 登录接口
export function axiosUserLogin(data) {
    return http.post('/api/userlogin', data)
}


// <=====  菜单列表接口   =======>
// 获取列表
export function axiosGetMenuList() {
    return http.get('/api/menulist')
}
// 菜单列表树
export function axiosGetMenuListTree() {
    let params = {
        istree: true
    }
    return http.get('/api/menulist', { params })
}

// 添加菜单
export function axiosAddMenu(data) {
    return http.post('/api/menuadd', data)
}

// 删除菜单
export function axiosDeleMenu(id) {
    return http.post('/api/menudelete', { id })
}

// 查询一条记录
export function axiosSearchOneMenu(id) {
    let params = {
        id
    }
    return http.get('/api/menuinfo', { params })
}

// 修改菜单
export function axiosEditMenu(data) {
    return http.post('/api/menuedit', data)
}


// <=====  封装角色接口   =======>
// 添加觉色
export function axiosAddRole(data) {
    return http.post('/api/roleadd', data)
}

// 获取角色列表
export function axiosGetRoleList() {
    return http.get('/api/rolelist')
}

// 删除角色
export function axiosDeleRole(id) {
    return http.post('/api/roledelete', { id })
}

// 根据id查询角色信息
export function axiosSearchOneRole(id) {
    let params = {
        id
    }
    return http.get('/api/roleinfo', { params })
}

// 根据id修改角色信息
export function axiosEditRole(data) {
    return http.post('/api/roleedit', data)
}



// <=====  封装管理员接口   =======>

// 添加管理员
export function axiosAddManger(data) {
    return http.post('/api/useradd', data)
}

// 获取管理员列表
export function axiosGetMangerList(data) {
    let params = data;
    return http.get('/api/userlist', { params })
}

// 获取管理员列表总条目
export function axiosGetMangerListCount() {
    return http.get('/api/usercount')
}

// 删除管理员
export function axiosDeleManger(uid) {
    return http.post('/api/userdelete', { uid })
}

// 根据 uid 查询管理员
export function axiosSearchOneManger(uid) {
    let params = {
        uid
    }
    return http.get('/api/userinfo', { params })
}

// 修改管理员
export function axiosEditManger(data) {
    return http.post('/api/useredit', data)
}


// <=====  商品列表接口   =======>
export function axiosGetSortList() {
    let params = {
        istree: true
    }
    return http.get('/api/catelist', { params })
}

// 提交商品信息
export function axiosAddSort(data) {
    let file = new FormData();
    console.log(data);
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/cateadd', file)
}


// 删除商品分类
export function axiosDeleSort(id) {
    return http.post('/api/catedelete', { id })
}

// 通过id查询分类
export function axiosSearchOneSort(id) {
    let params = {
        id
    }
    return http.get('/api/cateinfo', { params })
}

// 修改商品分类
export function axiosEditSort(data) {
    let file = new FormData();
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/cateedit', file)
}


// <=====  商品规格接口   =======>
// 添加商品规格
export function axiosAddSpecs(data) {
    return http.post('/api/specsadd', data)
}

// 获取商品规格列表
export function axiosGetSpecsList(data) {
    let params = data;
    return http.get('/api/specslist', { params })
}

// 获取商品规格列表总条目
export function axiosGetSpecsListCount() {
    return http.get('/api/specscount')
}

// 删除商品规格
export function axiosDeleSpecs(id) {
    return http.post('/api/specsdelete', { id })
}

// 根据 id 商品规格
export function axiosSearchOneSpecs(id) {
    let params = {
        id
    }
    return http.get('/api/specsinfo', { params })
}

// 修改商品规格
export function axiosEditSpecs(data) {
    return http.post('/api/specsedit', data)
}


// <=====  商品接口   =======>
// 添加商品
export function axiosAddGoods(data) {
    let file = new FormData();
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/goodsadd', file)
}

// 获取商品列表
export function axiosGetGoodsList(data) {
    let params = data;
    return http.get('/api/goodslist', { params })
}

// 获取商品总条目
export function axiosGetGoodsListCount() {
    return http.get('/api/goodscount')
}

// 删除商品
export function axiosDeleGoods(id) {
    return http.post('/api/goodsdelete', { id })
}

// 根据 id 商品
export function axiosSearchOneGoods(id) {
    let params = {
        id
    }
    return http.get('/api/goodsinfo', { params })
}

// 修改商品
export function axiosEditGoods(data) {
    let file = new FormData();
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/goodsedit', file)
}


// <=====  轮播图接口   =======>
// 添加轮播图
export function axiosAddBanner(data) {
    let file = new FormData();
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/banneradd', file)
}

// 获取轮播图列表
export function axiosGetBannerList() {
    return http.get('/api/bannerlist')
}

// 删除轮播图
export function axiosDeleBanner(id) {
    return http.post('/api/bannerdelete', { id })
}

// 根据 id 轮播图
export function axiosSearchOneBanner(id) {
    let params = {
        id
    }
    return http.get('/api/bannerinfo', { params })
}

// 修改轮播图
export function axiosEditBanner(data) {
    let file = new FormData();
    for (let idx in data) {
        file.append(idx, data[idx])
    }
    return http.post('/api/banneredit', file)
}


// <=====  轮播图接口   =======>
// 添加秒杀
export function axiosAddSeck(data) {
    return http.post('/api/seckadd', data)
}

// 获取秒杀列表
export function axiosGetSeckList() {
    return http.get('/api/secklist')
}

// 删除秒杀
export function axiosDeleSeck(id) {
    return http.post('/api/seckdelete', { id })
}

// 根据 id 秒杀
export function axiosSearchOneSeck(id) {
    let params = {
        id
    }
    return http.get('/api/seckinfo', { params })
}

// 修改秒杀
export function axiosEditSeck(data) {
    return http.post('/api/seckedit', data)
}

// <=====  会员接口   =======>
// 获取会员列表
export function axiosGetMemberList() {
    return http.get('/api/memberlist')
}


// 根据 id 会员
export function axiosSearchOneMember(uid) {
    let params = {
        uid
    }
    return http.get('/api/memberinfo', { params })
}

// 修改 会员
export function axiosEditMember(data) {
    return http.post('/api/memberedit', data)
}
