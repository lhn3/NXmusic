import {HYEventStore} from 'hy-event-store'
import {getRanking,getMusicMenu} from '../service/musicAPI'

export const songStore=new HYEventStore({
    state:{
        // 推荐歌曲
        ranking:[],
        //热门歌单
        hotMusicMenu:[],
        //华语歌单
        chinaMusicMenu:[]
    },
    actions:{
        // 获取推荐歌曲
        async rankingAction(ctx){
            let res=await getRanking(1)
            ctx.ranking=res.playlist
        },
        // 获取热门歌曲
        async hotMusicMenuAction(ctx){
            let res=await getMusicMenu('全部')
            ctx.hotMusicMenu=res.playlists
        },
        // 获取热门歌曲 
        async chinaMusicMenuAction(ctx){
            let res=await getMusicMenu('华语')
            console.log(res.playlists)
            ctx.chinaMusicMenu=res.playlists
        },
    }
})
