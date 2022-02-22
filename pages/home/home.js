// pages/home/home.js
import {getBanner} from '../../service/musicAPI'
Page({

    data: {
        banners:[],
        swiperHeight:0
    },

    //获取页面数据
    getInfo(){
        getBanner().then(res=>{
            this.setData({banners:res.banners})
        })
    },

    onLoad: function (options) {
        this.getInfo()
    },

    //监听图片加载完成获取图片高度，再设置轮播图高度
    getImgInfo(){
        //获取图片组件方法
        const query = wx.createSelectorQuery()
        query.select('.swiperImg').boundingClientRect()
        // query.selectViewport().scrollOffset()
        query.exec((res)=>{
            console.log(res)
            this.setData({swiperHeight:res[0].height*2+'rpx'})
        })
    },

    //前往搜索页面
    handleSearch(){
        console.log(123)
        wx.navigateTo({
          url: '/pages/detail-search/detail-search',
        })
    }
})