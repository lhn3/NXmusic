// pages/musicList/musicList.js
import {songStore} from '../../store/index'
Page({
    data: {
        name:'',
        musicInfo:{}
    },

    onLoad(options) {
        this.setData({name:options.name}) 
        switch(this.data.name){
            case '推荐更多':
                this.getMusicInfo('hotRanking')
                break;
            case '新歌榜': 
                this.getMusicInfo('newRanking')
                break;
            case '原创榜':
                this.getMusicInfo('selfRanking')
                break;
            case '飙升榜':
                this.getMusicInfo('upRanking')
                break;
        }
    },
    // 获取音乐列表信息
    getMusicInfo(rankName){
        songStore.onState(rankName,res=>{
            this.setData({musicInfo:res})
        })
    }

})