import {HYEventStore} from 'hy-event-store'
import {getMusicDetail,getMusicLyric} from '../service/musicAPI'
import lyricUtils from '../utils/lyricUtils'

const audio=wx.createInnerAudioContext()

const playStore=new HYEventStore({
    state:{
        musicInfo:{},     //歌曲详情
        totalTime:0,      //歌曲总时长
        lyricList:[],      //歌词
    },
    actions:{
        // 请求音乐数据和歌词
        async getMusicInfoAction(ctx,id){
            if(id==ctx.id) return;  //如果进入正在播放的页面，继续播放
            ctx.id=id
            let detail=await getMusicDetail(id)
            let lyric=await getMusicLyric(id)
            if(detail.code==200){
                ctx.musicInfo=detail.songs[0]
                ctx.totalTime=detail.songs[0].dt
            } 
            if(lyric.code==200){
                let lyricList = lyricUtils(lyric.lrc.lyric)
                ctx.lyricList=lyricList
            }

            //开启播放
            audio.stop()            //先停止
            audio.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
            audio.autoplay=true  //自动播放
            audio.onCanplay(()=>{//准备好了
                audio.play()     //调用播放
            }) 
        },
    }
})

export {
    audio,
    playStore
}