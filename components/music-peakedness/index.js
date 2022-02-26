// components/music-peakedness/index.js
Component({
    properties:{
        title:{
            type:String,
            value:"默认标题"
        },
        isMore:{
          type:Boolean,
          value:true  
        },
        musicList:{
            type:Array,
            value:[] 
        }
    },
})