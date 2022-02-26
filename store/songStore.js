import {HYEventStore} from 'hy-event-store'
import {getRanking,getMusicMenu} from '../service/musicAPI'

let ranking={0:'newRanking',1:'hotRanking',2:'selfRanking',3:'upRanking'}
export const songStore=new HYEventStore({
    state:{
        hotRanking:[],  // 推荐歌曲
        newRanking:[], //新歌榜
        selfRanking:[],//原创榜
        upRanking:[],  //飙升榜
        hotMusicMenu:[],//热门歌单
        chinaMusicMenu:[]//华语歌单
    },
    actions:{ 
        // 获取推荐歌曲
        async rankingAction(ctx,payload){
            // 0新歌、1推荐(热歌)、2原创、3飙升
            //获取歌单名
            let rankName=ranking[payload]
            let res=await getRanking(payload)
            // 通过歌单明存储数据
            ctx[rankName]=res.playlist
        },
        // 获取热门歌曲
        async hotMusicMenuAction(ctx){
            let res=await getMusicMenu('全部')
            ctx.hotMusicMenu=res.playlists
        },
        // 获取华语歌曲 
        async chinaMusicMenuAction(ctx){
            let res=await getMusicMenu('华语')
            ctx.chinaMusicMenu=res.playlists
        },
    }
})
