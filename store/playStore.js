import {HYEventStore} from 'hy-event-store'
import {getMusicDetail,getMusicLyric} from '../service/musicAPI'
import lyricUtils from '../utils/lyricUtils'

const audio=wx.createInnerAudioContext()
// const audio=wx.getBackgroundAudioManager()

const playStore=new HYEventStore({
    state:{
        // 定值
        id:null,
        musicInfo:{},     //歌曲详情 
        totalTime:0,      //歌曲总时长
        lyricList:[],      //歌词
        playList:[],       //播放列表
        playIndex:0,       //播放索引
        onAudio:false,     //监听标记

        // 动值        
        currentTime:0,   //播放了多长时间
        lyric:'',          //正在展示的歌词
        sliderValue:0,    //滑块的值
        isSlider:false,    //是否正在滑动
        isPlay:true,        //是否正在播放
        lyricIndex:0,      //歌词索引
        playStyle:0        //0顺序播放，1单曲循环，2随机播放
    },
    actions:{
        // 请求音乐数据和歌词
        async getMusicInfoAction(ctx,id){
            if(id==ctx.id) {return};  //如果进入正在播放的页面，继续播放
            // 清空上一首哥所有信息
            ctx.musicInfo={}
            ctx.totalTime=0
            ctx.lyricList=[]
            ctx.currentTime=0
            ctx.lyric=''    
            ctx.sliderValue=0
            ctx.lyricIndex=0

            ctx.id=id
            wx.setStorageSync('musicId',id)   //歌曲Id储存到本地
            let detail=await getMusicDetail(id)
            let lyric=await getMusicLyric(id)
            if(detail.code==200){
                ctx.musicInfo=detail.songs[0] 
                ctx.totalTime=detail.songs[0].dt
                // audio.title=detail.songs[0].name
            } 
            if(lyric.code==200){
                let lyricList = lyricUtils(lyric.lrc.lyric)
                ctx.lyricList=lyricList
            }
            //开启播放
            this.dispatch('playAction')
        },

        // 播放
        playAction(ctx){
            audio.stop()            //先停止
            audio.src=`https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
            // audio.title='123'
            audio.onCanplay(()=>{//准备好了
                audio.play()     //调用播放
            }) 
            if (ctx.onAudio) return;//如果添加过监听了就返回
            ctx.onAudio=true
            audio.onTimeUpdate(()=>{//监听时间变化
                if(!ctx.isSlider){
                    ctx.currentTime = audio.currentTime*1000           //播放了的时间
                    ctx.sliderValue = (ctx.currentTime/ctx.totalTime)*100 //进度条的位置
                }
                this.dispatch('lyricToShowAction')
            })
            audio.onPlay(()=>{// 监听播放
                ctx.isPlay=true
            })
            audio.onPause(()=>{
                ctx.isPlay=false
            })
            audio.onEnded(()=>{ //监听播放完了
                this.dispatch('pnPlayAction','next')
            })
        },

        //获取当前播放的歌词
        lyricToShowAction(ctx){
            let lyricList=ctx.lyricList
            let currentTime=ctx.currentTime
            for(let i=0; i<lyricList.length; i++){
                //如果歌词时间大于当前播放的时候就使用上一次的歌词
                if(lyricList[i].time > currentTime){
                    if(ctx.lyric == lyricList[i-1].lyric) return;
                    ctx.lyric=lyricList[i-1].lyric
                    ctx.lyricIndex=i-1
                    return;
                }
            }
        },

        //监听进度条点击和滑动后松开
        sliderChangeAction(ctx,value){
            let clickCurrentTime = ctx.totalTime*value/100   //计算点击后的播放时间
            audio.pause()              //暂停播放
            audio.seek(clickCurrentTime/1000)//跳转播放
            ctx.sliderValue=value
            ctx.currentTime=clickCurrentTime
            ctx.isSlider=false
        },

        //监听进度条拖拽过程中
        sliderChangingAction(ctx,value){
            let changeCurrentTime=ctx.totalTime*value/100//计算滑动时的播放时间
            ctx.isSlider=true
            ctx.currentTime=changeCurrentTime            //只需设置跟随变动的时间
        },

        //播放模式改变
        changePlayStyleAction(ctx){
            if(ctx.playStyle==0){
                ctx.playStyle=1
            }else if(ctx.playStyle==1){
                ctx.playStyle=2
            }else{
                ctx.playStyle=0
            }
        },

        // 暂停开始播放
        pauseOrresumeAction(ctx){
            // 监听播放
            ctx.isPlay?audio.pause():audio.play()
        },

        // 上一首下一首
        pnPlayAction(ctx,pn){
            // 先判断播放模式
            if(ctx.playStyle != 2){
                if (pn === 'prev'){
                    // 上一首
                    ctx.playIndex == 0 ? ctx.playIndex = ctx.playList.length - 1 : ctx.playIndex -= 1
                }else if(pn === 'next'){
                    // 下一首
                    ctx.playIndex == ctx.playList.length - 1 ? ctx.playIndex = 0 : ctx.playIndex += 1
                }
            }else{
                // 随机播放
                let index=Math.floor(Math.random()*ctx.playList.length)
                if(ctx.playIndex == index){
                    this.dispatch('prevPlayAction')
                    return
                }else{
                    ctx.playIndex=index
                }
            }
            let id=ctx.playList.length != 0?ctx.playList[ctx.playIndex].id:ctx.id
            this.dispatch('getMusicInfoAction',id)
        },
    }
})

export {
    audio,
    playStore
}