// pages/detail-search/detail-search.js
import {getHotCard} from '../../service/searchAPI'
Page({
    data: {
        hotCard:[]
    },

    onLoad(options) {
        this.getInfo()
    },

    async getInfo(){
        let res = await getHotCard()
        this.setData({hotCard:res.result.hots})
    }
})