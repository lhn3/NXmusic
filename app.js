// app.js
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
    },
    // 定义一个全局变量
    globalDate:{
        screenWidth:0,
        screenHeight:0,
        statusBarHeight:0,
        hw:0
    }
})
