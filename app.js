// app.js
import {getCode, getOpenIdToToken,checkToken,checkSessionKey} from './utils/login'
App({
    // app加载就执行
    onLaunch(){
        // 获取设备信息
        let res=wx.getSystemInfoSync()
        this.globalDate.screenWidth=res.screenWidth
        this.globalDate.screenHeight=res.screenHeight
        // 状态栏高度
        this.globalDate.statusBarHeight=res.statusBarHeight
        //记录屏幕宽高比
        let hw=res.screenHeight/res.screenWidth
        this.globalDate.hw=hw
        this.checkSessionKeyAction()
    },
    // 定义一个全局变量
    globalDate:{
        screenWidth:0,
        screenHeight:0,
        statusBarHeight:0,
        hw:0
    },

    //判断session_key
    async checkSessionKeyAction(){
        let res=await checkSessionKey()
        if(res){
            // 没过期再判断token
            this.checkTokenAction()
        }else{
            // 过期直接登录
            this.loginAction()
        }
    },

    // 判断token
    async checkTokenAction(){
        let token=wx.getStorageSync('token') 
        let res=await checkToken(token)
        if(res.message !=='已登录') this.loginAction()
    },

    // 登录
    async loginAction(){
        //获取code
        let code = await getCode()
        // 获取openid换得token
        let res= await getOpenIdToToken(code)
        let token=res.token
        wx.setStorageSync('token', token) 
        console.log('登陆成功')
    }
})
