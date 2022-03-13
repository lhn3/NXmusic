// pages/music-player/music-player.js
import {playStore} from '../../store/index'
Component({
    data: {
        // 定值
        id:null,           //歌曲id
        musicInfo:{},     //歌曲详情
        playList:[],      //歌曲列表 
        // 动值
        isPlay:true,        //是否正在播放
    },
    lifetimes:{
        async created() {
            let id =await wx.getStorageSync('musicId')
            playStore.dispatch('getMusicInfoAction',id)
            this.getMusicInfo()
        },
    },
    methods:{
        // 监听数据变化赋值
        getMusicInfo(){ 
            playStore.onStates(['id','musicInfo','isPlay','playList'],({
                musicInfo,isPlay,playList,id
            })=>{
                if(id != undefined) this.setData({id});
                if(musicInfo != undefined) this.setData({musicInfo});
                if(playList != undefined) this.setData({playList});
                if(isPlay != undefined) this.setData({isPlay});
            })
        },
         //事件监听----------------------------------------------------------------------
        // 暂停开始播放
        pauseOrresume(){
            playStore.dispatch('pauseOrresumeAction')
        },
        //进入歌曲详情
        toMusicPlayer(){
            wx.navigateTo({
              url: `/pages/music-player/music-player?id=${this.data.id}`,
            })
        }
    }
})