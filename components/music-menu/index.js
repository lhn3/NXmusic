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
})