// components/music-menu/index.js
//获取app实例，可以取出全局定义的变量
let app=getApp()

Component({
    properties:{
        title:{
            type:String,
            value:''
        },
        songList:{
            type:Array,
            value:[]
        }
    },
    methods:{
        handleClick(e){
            // 热门和华语乐坛的音乐列表跳转
            const item = e.currentTarget.dataset.info
            wx.navigateTo({
                url: `/pages/musicList/musicList?id=${item.id}`,
            })
        }
    }
})