// pages/detail-video/detail-video.js
import {getVideoPlay,getVideoDetail,getRelateVideo} from '../../service/videoAPI'
Page({
    data: {
        id:null,
        videoPlay:{},
        videoDetail:{},
        relateVideo:[]
    },

    //网络请求
    getVideoInfo(){
        //视频播放地址请求
        getVideoPlay(this.data.id).then(res=>{
            this.setData({videoPlay:res.data,})
        })
        //播放的视频详细信息
        getVideoDetail(this.data.id).then(res=>{
            this.setData({videoDetail:res.data,})
        })
        //播放视频的推荐视频
        getRelateVideo(this.data.id).then(res=>{
            this.setData({relateVideo:res.data,})
        })
        
    },
    
    onLoad(options) {
        //获取id
        this.setData({id:options.id})
        //发送请求
        this.getVideoInfo()
    },

    //点击推荐视频进入详情
    toVideoDetail(e){
        let id=e.currentTarget.dataset.info.vid
        // wx.navigateTo({
        //   url: `/pages/detail-video/detail-video?id=${id}`,
        // })
    }
})