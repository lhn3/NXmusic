// pages/home/home.js
import {getBanner} from '../../service/musicAPI'
import {queryRect} from "../../utils/querySelect"
import {throttle} from "../../utils/throttle"
import {songStore} from "../../store/index" 


const _queryRect=throttle(queryRect,1000)
Page({
    data: { 
        banners:[], 
        swiperHeight:0,
        // 推荐、新歌、原创、飙升歌单
        hotRanking:[],
        // newRanking:[],
        // selfRanking:[],
        // upRanking:[],
        rankingList:[],
        // 热门、华语歌单
        hotMusicMenu:[],
        chinaMusicMenu:[]
    },

    //获取轮播图数据
    getBanner(){
        getBanner().then(res=>{
            this.setData({banners:res.banners})
        })
    },

    onLoad(options) {
        // 调用获取轮播图方法
        this.getBanner()
        // 调用获取推荐、新歌、原创、飙升歌单方法
        this.getRanking()
        //调用获取热门、华语歌单方法
        this.getHotChinaMusic()
    },
 
    // 获取推荐、新歌、原创、飙升歌单
    getRanking(){
         // 请求推荐、新歌、原创、飙升歌单
         songStore.dispatch('rankingAction',1)
         songStore.dispatch('rankingAction',0)
         songStore.dispatch('rankingAction',2)
         songStore.dispatch('rankingAction',3)

          //获取推荐、新歌、原创、飙升歌单
        let rankLis=['newRanking','selfRanking','upRanking']
        songStore.onState('hotRanking',res=>{
            this.setData({hotRanking:res.tracks?.slice(0,6)})
        }) 
        
        for(let item of rankLis){ 
            songStore.onState(item,res=>{
                if(Object.keys(res).length>0){
                    this.setData({rankingList:[...this.data.rankingList,{id:res.id,name:res.name,playCount:res.playCount,img:res.coverImgUrl,list:res.tracks?.slice(0,3)}]})
                }
            })
        }
        // songStore.onState('newRanking',res=>{
        //     this.data.rankingList.push({name:res.name,img:res.coverImgUrl,list:res.tracks?.slice(0,3)})
        // })
        // songStore.onState('selfRanking',res=>{ 
        //     this.data.rankingList.push({name:res.name,img:res.coverImgUrl,list:res.tracks?.slice(0,3)})
        // })
        // songStore.onState('upRanking',res=>{
        //     this.data.rankingList.push({name:res.name,img:res.coverImgUrl,list:res.tracks?.slice(0,3)})
        // })
    },

    // 获取热门，华语乐坛
    getHotChinaMusic(){
        // 请求热门、华语歌单
        songStore.dispatch('hotMusicMenuAction')
        songStore.dispatch('chinaMusicMenuAction')

        // 获取热门、华语歌单
        songStore.onState('hotMusicMenu',res=>{
            this.setData({hotMusicMenu:res})
        })
        songStore.onState('chinaMusicMenu',res=>{
            this.setData({chinaMusicMenu:res})
        })
    },

    //监听图片加载完成获取图片高度，再设置轮播图高度
    getImgInfo(){
        //获取图片组件方法 
        //节流 
        _queryRect('.swiperImg').then(res=>{
            this.setData({swiperHeight:res[0].height+'px'}) 
        })
    },

    //推荐点击更多按钮
    toMusicList(e){
        let id=e.currentTarget.dataset.id
        switch (id){
            case '1':
                this.toList('推荐更多')
                break;
            case '2':
                let rankName=e.detail  //发射事件传递的参数
                this.toList(rankName)
                break;
            }
        },
    //跳转到列表页
    toList(name){
        wx.navigateTo({
            url: `/pages/musicList/musicList?name=${name}`,
        })
    },

    //前往搜索页面
    handleSearch(){
        console.log(123)
        wx.navigateTo({
          url: '/pages/detail-search/detail-search',
        })
    }
})