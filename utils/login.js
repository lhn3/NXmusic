import {LoginRequest} from '../service/index'

//获取code
export function getCode(){
    return new Promise((resolve,reject)=>{
        wx.login({
          timeout: 1000,
          success:(res)=>{
            resolve(res.code)
          },
          fail:(err)=>{
            reject(err)
          }
        })
    })
}

//获取token
export function getOpenIdToToken(code){
  return LoginRequest.post('/login',{code})
}

//判断token是否过期
export function checkToken(token){
  return LoginRequest.post('/auth',{},{token})
}

//判断session_key是否过期
export function checkSessionKey(){
  return new Promise((resolve,reject)=>{
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail:()=>{
        reject(false)
      }
    })
  })
}