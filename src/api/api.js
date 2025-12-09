//用来封装请求方法
import request from '@/api/request';

export default {
    //获取Revenue收入数据
    getRevenueData() {
        return request({
            url: "/Home/GetRevenueData",
            method: "get",
            //mock: false
        })
    },
    getOrderList() {
        return request({
            url:"/Home/GetOrderList",
            method:"get",
        })
    }
}