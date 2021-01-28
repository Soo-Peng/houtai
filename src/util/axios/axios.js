import axios from 'axios'
import router from '../../router'
let http = axios.create({
    // baseURL : 'htt0p://localhost:3000',
    baseURL: '/api',
})

// 拦截器
http.interceptors.request.use(req => {
    const LoginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'));
    if (LoginInfo) {
        req.headers.authorization = LoginInfo.token;
        // console.log(LoginInfo.token);
    }
    return req
})

// 响应拦截
http.interceptors.response.use( res => {
    // if(res.data.code === 500){
    //     router.push("/login")
    // }else 
    if(res.data.code === 403){
        // token过期重新登录
        router.push('/login')
    }
    // 可以二次拆分数据  res.data我
    return res
})



export default http