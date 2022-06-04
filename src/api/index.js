/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
// import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'
// import jsonp from 'jsonp'
import qs from 'qs'
// const BASE = 'http://localhost:5000'
const BASE = 'http://127.0.0.1:8000'
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (email, password) => ajax(BASE + '/login', qs.stringify({email, password}), 'POST')
// export const fileUpload = (filename) => ajax(BASE + '/uploadVideo', {filename}, 'POST')
export const imageUpload = (file) =>ajax(BASE+'/liveRecord', file, 'bPOST')
export const fileUpload = (file) =>ajax(BASE+'/uploadVideo', file, 'POST')