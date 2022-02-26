// pages/musicList/musicList.js
Page({
    data: {
        name:''
    },

    onLoad(options) {
        this.setData({name:options.name})
        console.log(this.data.name)
    },

})