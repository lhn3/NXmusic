// pages/musicList/musicList.js
import {songStore,playStore} from '../../store/index'
import {getMusicList} from '../../service/musicAPI'
Page({
    data: {
        name:'',
        id:'',
        type:'',
        musicInfo:{}
    },

    onLoad(options) {
        //如果点击的是ranking或是更多
        this.setData({name:options.name}) 
        //如果点击的是热门和华语乐坛的音乐列表
        this.setData({id:options.id}) 
        
        if(this.data.name){
            switch(this.data.name){
                case '推荐更多':
                    this.getMusicRankingList('hotRanking')
                    break;
                case '新歌榜': 
                    this.getMusicRankingList('newRanking')
                    break;
                case '原创榜':
                    this.getMusicRankingList('selfRanking')
                    break;
                case '飙升榜':
                    this.getMusicRankingList('upRanking')
                    break;
                }
                this.setData({type:'ranking'})
        }else if(this.data.id){
            this.musicList(this.data.id)
            this.setData({type:'other'})
        }
    },
    getMusicRankingList(rankName){
        // 获取ranking音乐列表信息
        songStore.onState(rankName,res=>{
            this.setData({musicInfo:res})
        })
    },
    //获取热门和华语乐坛音乐列表
    async musicList(id){
        let res = await getMusicList(id)
        this.setData({musicInfo:res.playlist})
    },

    //前往播放页携带播放列表
    handleClick(e){
        let playIndex = e.currentTarget.dataset.index
        playStore.setState("playList",this.data.musicInfo.tracks)
        playStore.setState("playIndex",playIndex)
    }
})