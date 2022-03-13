// pages/music-player/music-player.js
import {playStore} from '../../store/index'
Page({
    data: {
        // 定值
        id:null,           //歌曲id
        musicInfo:{},     //歌曲详情
        totalTime:0,      //歌曲总时长
        lyricList:[],      //歌词
        playList:[],      //歌曲列表 
        playIndex:0,      //歌曲索引

        // 动值
        currentTime:0,   //播放了多长时间
        lyric:'',          //正在展示的歌词
        sliderValue:0,    //滑块的值
        isSlider:false,    //是否正在滑动
        isPlay:true,        //是否正在播放
        lyricIndex:0,      //歌词索引
        playStyle:0,        //播放模式

        // 此页面数据
        currentHeight:'', //滑动页面高度
        isShowLyric:true, //是否展示歌词
        current:0,        //点击歌词或是歌曲
    },

    onLoad(options) {
        this.setData({id:options.id})
        // 获取歌曲信息
        playStore.dispatch('getMusicInfoAction',this.data.id)
        this.getMusicInfo()
        //适配
        this.listenPage()
    },

    //配置页面
    listenPage(){
        // 获取页面滑动的高度
        let gd=getApp().globalDate
        let currentHeight=gd.screenHeight-gd.statusBarHeight-44 //屏幕减去navbar高度
        let hw=gd.hw            //屏幕宽高比
        this.setData({currentHeight, isShowLyric: hw >= 2 ? true : false})
    },
    // 点击歌词或歌曲
    handle_song(){
        this.setData({current:0})
    },
    handle_lyric(){
        this.setData({current:1})
    },
    
    // 监听数据变化赋值
    getMusicInfo(){ 
        playStore.onStates(['musicInfo','totalTime','lyricList','currentTime', 'lyric',      'sliderValue', 'isSlider','isPlay','lyricIndex','playStyle','playList','playIndex'],({
            musicInfo,totalTime,lyricList,currentTime,lyric,sliderValue,isSlider,isPlay,lyricIndex,playStyle,playList,playIndex
        })=>{
            if(musicInfo != undefined) this.setData({musicInfo});
            if(totalTime != undefined) this.setData({totalTime});
            if(lyricList != undefined) this.setData({lyricList});
            if(currentTime != undefined) this.setData({currentTime});
            if(lyric != undefined) this.setData({lyric});
            if(sliderValue != undefined) this.setData({sliderValue});
            if(isSlider != undefined) this.setData({isSlider});
            if(lyricIndex != undefined) this.setData({lyricIndex});
            if(isPlay != undefined) this.setData({isPlay});
            if(playStyle != undefined) this.setData({playStyle});
            if(playList != undefined) this.setData({playList});
            if(playIndex != undefined) this.setData({playIndex});
        })
    },

    //事件监听----------------------------------------------------------------------------------------
    //返回按钮
    back(){
        wx.navigateBack()
    }, 
    // 滑动选择歌曲或歌词
    currentChange(e){
        let current = e.detail.current
        this.setData({current})
    },

    //监听进度条点击和滑动后松开
    sliderChange(e){
        playStore.dispatch('sliderChangeAction',e.detail.value)
    },

    //监听进度条拖拽过程中
    sliderChanging(e){
        playStore.dispatch('sliderChangingAction',e.detail.value)
    },

    //监听播放模式点击
    changePlayStyle(){
        playStore.dispatch('changePlayStyleAction')
    }, 

    // 暂停开始播放
    pauseOrresume(){
        playStore.dispatch('pauseOrresumeAction')
    },

    // 监听上一首下一首点击
    prevClick(){
        playStore.dispatch('pnPlayAction','prev')
        this.getMusicInfo()
    },
    nextClick(){
        playStore.dispatch('pnPlayAction','next')
        this.getMusicInfo()
    }
})