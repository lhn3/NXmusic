// pages/home/home.js
Page({

    data: {

    },

    onLoad: function (options) {

    },

    //前往搜索页面
    handleSearch(){
        console.log(123)
        wx.navigateTo({
          url: '/pages/detail-search/detail-search',
        })
    }
})