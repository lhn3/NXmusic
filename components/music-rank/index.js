// components/music-rank/index.js
Component({
    properties:{
        item:{
            type:Object,
            value:{}
        }
    },
    methods:{
        toMusicPlayer(e){
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
              url: `/pages/music-player/music-player?id=${id}`,
            })
        }
    }
})