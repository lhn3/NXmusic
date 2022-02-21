// pages/video/video.js

import videoAPI from '../../service/videoAPI'
Page({
    //页面的初始数据
    data: {
        mv:[],
        hasMore:true,
    },

    //封装方法，类似于methods
    async getVideoInfo(offset){
        // 请求加载动画
        wx.showNavigationBarLoading()
        let res=await videoAPI(offset)
        if(res.code==200){
            if(offset==0){
                this.setData({mv:res.data})
            }else{
                this.setData({mv:[...this.data.mv,...res.data]})
            }
            this.setData({hasMore:res.hasMore})
        }
        // 数据请求完后停止加载动画和下拉
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },

    //生命周期函数--监听页面加载
    onLoad(options) {
       this.getVideoInfo(0)
    },

    //下拉刷新
    onPullDownRefresh() {
        // 重新请求数据
        this.getVideoInfo(0)
    },

    //页面上拉触底事件的处理函数
    onReachBottom: async function () {
        if(!this.data.hasMore) return;
        this.getVideoInfo(this.data.mv.length)
    },

    //前往详情页
    toVideoDetail(e){
        // info为data-info信息
        let id = e.currentTarget.dataset.info.id
        // 页面跳转
        wx.navigateTo({
          url: '/pages/detail-video/detail-video?id='+id,
        })
    },

    //生命周期函数--监听页面初次渲染完成
    onReady() {

    },

    //生命周期函数--监听页面显示
    onShow() {

    },

    //生命周期函数--监听页面隐藏
    onHide() {

    },

    //生命周期函数--监听页面卸载
    onUnload() {

    },

    //用户点击右上角分享
    onShareAppMessage() {

    }
})