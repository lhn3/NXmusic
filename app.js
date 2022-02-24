// app.js
App({
    // app加载就执行
    onLaunch(){
        // 获取设备信息
        let res=wx.getSystemInfoSync()
        this.globalDate.screenWidth=res.screenWidth
        this.globalDate.screenHeight=res.screenHeight
    },
    // 定义一个全局变量
    globalDate:{
        screenWidth:0,
        screenHeight:0
    }
})
