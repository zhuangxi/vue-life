import axios from 'axios'
import { getToken } from './cookie'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: process.env.NODE_ENV === 'development' ? '/api': process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // let token = getToken()
    // if (token) {
    //   config.headers['authorization'] = token
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code == 0) {
      return res.data || res.message
    } else {
      return Promise.reject(res.message)
    }
  },
  error => {
    if (JSON.stringify(error.message).includes('timeout')) {
      return Promise.reject('请求连接超时！')
    }
    return Promise.reject('服务出错')
  }
)

export default service
