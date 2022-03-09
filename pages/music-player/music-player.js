// pages/music-player/music-player.js
import {getMusicDetail,getMusicLyric} from '../../service/musicAPI'
import {audio} from '../../utils/playStore'
import lyricUtils from '../../utils/lyricUtils'
Page({
    data: {
        id:null,
        musicInfo:{},
        lyricList:[],      //歌词
        totalTime:0,      //歌曲总时长
        current:0,        //点击歌词或是歌曲
        currentHeight:'', //滑动页面高度
        isShowLyric:true, //是否展示歌词
        currentTime:0,   //播放了多长时间
        lyric:'',          //正在展示的歌词
        sliderValue:0,    //滑块的值
        isSlider:false    //是否正在滑动
    },

    onLoad(options) {
        this.setData({id:options.id})
        this.getMusicInfo(this.data.id)
        //适配
        this.listenPage()
        // 音乐播放
        this.audioCurrent()
    },

    //配置页面
    listenPage(){
        // 获取页面滑动的高度
        let gd=getApp().globalDate
        let currentHeight=gd.screenHeight-gd.statusBarHeight-44 //屏幕减去navbar高度
        let hw=gd.hw            //屏幕宽高比
        this.setData({currentHeight, isShowLyric: hw >= 2 ? true : false})
    },

    //数据请求----------------------------------------------------------------------------------------
    //获取歌曲详情
    async getMusicInfo(id){
        let detail=await getMusicDetail(id)
        let lyric=await getMusicLyric(id)
        if(detail.code==200){
            this.setData({musicInfo:detail.songs[0],totalTime:detail.songs[0].dt})
        } 
        if(lyric.code==200){
            let lyricList = lyricUtils(lyric.lrc.lyric)
            this.setData({lyricList})
        }
    },

    //根据时间匹配歌词
    lyricToShow(){
        let lyricList=this.data.lyricList
        let currentTime=this.data.currentTime
        for(let i=0; i<lyricList.length; i++){
            //如果歌词时间大于当前播放的时候就使用上一次的歌词
            if(lyricList[i].time > currentTime){
                if(this.data.lyric == lyricList[i-1].lyric) return;
                this.setData({lyric:lyricList[i-1].lyric})
                return;
            }
        }
    },

     // 音乐播放功能
     audioCurrent(){
        audio.stop()            //先停止
        audio.src=`https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
        // audio.autoplay=true  //自动播放
        audio.onCanplay(()=>{   //准备好了
            audio.play()     //调用播放
        }) 
        audio.onTimeUpdate(()=>{//监听时间变化
            if(!this.data.isSlider){
                let currentTime = audio.currentTime*1000                //播放了的时间
                let sliderValue = (currentTime/this.data.totalTime)*100 //进度条的位置
                this.setData({currentTime,sliderValue})
            }
            this.lyricToShow()
        })
    },

    //事件监听----------------------------------------------------------------------------------------
    // 滑动选择歌曲或歌词
    currentChange(e){
        let current = e.detail.current
        this.setData({current})
    },

    //监听进度条点击和滑动后松开
    sliderChange(e){
        let value = e.detail.value  //获取滑块的值
        let clickCurrentTime = this.data.totalTime*value/100   //计算点击后的播放时间
        audio.pause()              //暂停播放
        audio.seek(clickCurrentTime/1000)//跳转播放
        this.setData({sliderValue:value,currentTime:clickCurrentTime})
        this.setData({isSlider:false})
    },

    //监听进度条拖拽过程中
    sliderChanging(e){
        let value=e.detail.value         
        let changeCurrentTime=this.data.totalTime*value/100         //计算滑动时的播放时间
        this.setData({isSlider:true,currentTime:changeCurrentTime}) //只需设置跟随变动的时间
    },

    // 暂停开始播放
    pause(){
        audio.pause()
    }
})