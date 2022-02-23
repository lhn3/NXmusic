// pages/home/home.js
import {getBanner} from '../../service/musicAPI'
import {queryRect} from "../../utils/querySelect"
import {throttle} from "../../utils/throttle"
import {rankingStore} from "../../store/index" 


const _queryRect=throttle(queryRect,1000)
Page({
    data: { 
        banners:[], 
        swiperHeight:0,
        ranking:[]
    },

    //获取页面数据
    getInfo(){
        getBanner().then(res=>{
            this.setData({banners:res.banners})
        })
    },

    onLoad(options) {
        // 获取轮播图
        this.getInfo()
        // 请求推荐歌曲
        rankingStore.dispatch('rankingService')
        //获取推荐歌曲数据 
        rankingStore.onState('ranking',res=>{
            this.setData({ranking:res.tracks?.slice(0,6)})
        })
    },

    //监听图片加载完成获取图片高度，再设置轮播图高度
    getImgInfo(){
        //获取图片组件方法 
        //节流 
        _queryRect('.swiperImg').then(res=>{
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