// pages/music-player/music-player.js
import {getMusicDetail} from '../../service/musicAPI'
import {audio} from '../../utils/playStore'
Page({
    data: {
        id:null,
        musicInfo:{},
        current:0,         //点击歌词或是歌曲
        currentHeight:'', //滑动页面高度
        isShowLyric:true, //是否展示歌词
        currentTime:0,   //播放了多长时间
        playUrl:'',
    },

    onLoad(options) {
        this.setData({id:options.id})
        this.getMusicInfo(this.data.id)

        // 获取页面滑动的高度
        let gd=getApp().globalDate
        let currentHeight=gd.screenHeight-gd.statusBarHeight-44 //屏幕减去navbar高度
        let hw=gd.hw            //屏幕宽高比
        this.setData({currentHeight, isShowLyric: hw >= 2 ? true : false})

        audio.stop()            //先停止
        audio.src=`https://music.163.com/song/media/outer/url?id=${options.id}.mp3`
        // audio.autoplay=true  //自动播放
        audio.onCanplay(()=>{   //准备好了
            // audio.play()     //调用播放
        })
        audio.onTimeUpdate(()=>{  //监听时间变化
            let currentTime = audio.currentTime*1000
            this.setData({currentTime})
        })
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