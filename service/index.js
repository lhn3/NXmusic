let BASE_URL='http://123.207.32.32:9001'
// 封装请求
class MyRequest{
    request(url,method,data){
        console.log(data)
        return new Promise((resolve,reject)=>{
            wx.request({
                url: BASE_URL+url,
                method:method,
                data:data,
                success:(res)=>{
                    resolve(res.data)
                },
                fail:reject
              })
        })
    }
// get请求
    get(url,data){
        return this.request(url,'GET',data)
    }
// post请求
    get(url,data){
        return this.request(url,'POST',data)
    }
}

let NxRequest=new MyRequest()
export default NxRequest
