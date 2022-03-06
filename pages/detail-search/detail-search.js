// pages/detail-search/detail-search.js
import {getHotCard,getSearchSuggest} from '../../service/searchAPI'
Page({
    data: {
        hotCard:[],
        suggest:[],
        keywords:''
    },

    onLoad(options) {
        this.getHot()
    },

    //获取热门搜索
    async getHot(){
        let res = await getHotCard()
        if(res.code==200){
            this.setData({hotCard:res.result.hots})
        }
    },

    //输入关键字发送请求
    async getSuggest(e){
        let keywords=e.detail
        this.setData({keywords:keywords})
        // 搜索内容删除后列表清空
        if(!keywords.lenght){
            this.setData({suggest:[]})
        }
        let res = await getSearchSuggest(keywords)
        if(res.code==200){
            this.setData({suggest:res.result.allMatch})
        }
    }
})