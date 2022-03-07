// pages/music-player/music-player.js
import {getMusicDetail} from '../../service/musicAPI'
Page({
    data: {
        id:null,
        musicInfo:{}
    },

    onLoad(options) {
        this.setData({id:options.id})
        this.getMusicInfo(this.data.id)
    },

    //获取歌曲详情
    async getMusicInfo(id){
        let res=await getMusicDetail(id)
        if(res.code==200){
            this.setData({musicInfo:res.songs[0]})
        }
    }
})