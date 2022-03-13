let BASE_URL='http://123.207.32.32:9001'
let LOGIN_BASE_URL='http://123.207.32.32:3000'
// 封装请求
class MyRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl
    }
    request(url,method,data,header={}){
        return new Promise((resolve,reject)=>{
            wx.request({
                url: this.baseUrl+url,
                method:method,
                data:data,
                header:header,
                success:(res)=>{
                    resolve(res.data)
                },
                fail:reject
              })
        })
    }
// get请求
    get(url,data,header){
        return this.request(url,'GET',data,header)
    }
// post请求
    post(url,data,header){
        return this.request(url,'POST',data,header)
    }
}

let NxRequest=new MyRequest(BASE_URL)
let LoginRequest=new MyRequest(LOGIN_BASE_URL)

export default NxRequest
export {
    LoginRequest
}
