//用来封装请求方法
import request from '@/api/request';

export default {
    //获取Revenue收入数据
    GetRevenueData() {
        return request({
            url: "/Home/GetRevenueData",
            method: "get",
            //mock: false
        })
    },
    GetOrderList() {
        return request({
            url:"/Home/GetOrderList",
            method:"get",
        })
    },
    GetTopProductList() {
        return request({
            url:"/Home/GetTopProductList",
            method:"get"
        })
    },
    Login(username, password) {
        return request({
            url:"/User/Login",
            method:"post",
            data:{
                username: username,
                password: password
            }
        })
    }
}