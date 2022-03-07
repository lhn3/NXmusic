// components/musicList-item/index.js
Component({
    properties:{
        item:{
            type:Object,
            value:{}
        },
        index:{
            type:Number,
            value:1
        }
    },
    methods:{
        //点击前往播放页面
        toMusicPlayer(e){
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
              url: `/pages/music-player/music-player?id=${id}`,
            })
        }
    }
})