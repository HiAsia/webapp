import axios from 'axios'
import QS from 'qs'

const Axios = axios.create({
  // baseURL: process.env.VUE_APP_HOST,    //  设置 axios 默认路径
  timeout: 10000,   //  设置超时时间为10s
  responseType: "json",
  // withCredentials: true,  // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"   //  post 请求头设置
  }
})


// 请求拦截器
/* Axios.interceptors.request.use(
  config => {
    // 在发送请求指前做的事情        例如序列化数据等；
  },

  error => {
    // 错误回调
    // 可以进行统一的弹窗管理
    return Promise.reject(err);
  }
)


*/
//  返回状态判断
Axios.interceptors.response.use(
  response => {
    // 如果返回状态码为200，说明接口请求成功
    // 否则抛出错误
    if (response.status === 200) {
      if (response.data.errCode === 0) {
        return Promise.resolve(response.data.data);
      }
      // Message.warning(response.data.errMsg);
      return Promise.resolve([]);
    } else {
      return Promise.reject(response);
    }
  },

  // 服务器状态码不是2开头的情况
  error => {
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     case 404:
    //     Message.error("找不到该请求")
    //     break;
    //     default:
    //   }
        // Message.error(error.toString());
      return Promise.reject(error);
    // }
  }
)

export default Axios;
