import {HYEventStore} from 'hy-event-store'
import {getRanking} from '../service/musicAPI'

export const rankingStore=new HYEventStore({
    state:{
        // 推荐歌曲
        ranking:[]
    },
    actions:{
        async rankingService(ctx){
            let res=await getRanking(1)
            ctx.ranking=res.playlist
        }
    }
})
