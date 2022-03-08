// pages/music-player/music-player.js
import {getMusicDetail} from '../../service/musicAPI'
Page({
    data: {
        id:null,
        musicInfo:{},
        current:0,         //点击歌词或是歌曲
        currentHeight:'' //滑动页面高度
    },

    onLoad(options) {
        this.setData({id:options.id})
        this.getMusicInfo(this.data.id)
        // 获取页面滑动的高度
        let gd=getApp().globalDate
        let currentHeight=gd.screenHeight-gd.statusBarHeight-44
        this.setData({currentHeight})
    },

    //获取歌曲详情
    async getMusicInfo(id){
        let res=await getMusicDetail(id)
        if(res.code==200){
            this.setData({musicInfo:res.songs[0]})
        }
    },

    // 滑动选择歌曲或歌词
    currentChange(e){
        let current = e.detail.current
        this.setData({current})
    }
})