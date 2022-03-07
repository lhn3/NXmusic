// pages/detail-search/detail-search.js
import {getHotCard,getSearchSuggest,getSearchValue} from '../../service/searchAPI'
import {debounce} from '../../utils/debounce'
import {stringNode} from '../../utils/stringNode'

//返回一个防抖函数
let de_getSearchSuggest=debounce(getSearchSuggest,300)
Page({
    data: {
        hotCard:[],
        suggest:[],
        keywords:'',
        suggestNodes:[],
        searchValue:[],
        hasMore:true,
        showList:false
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
        this.setData({keywords:keywords,showList:false,searchValue:[]})
        // 搜索内容删除后列表清空
        if(!this.data.keywords.length){
            this.setData({suggest:[],suggestNodes:[]})
        }
        let res = await de_getSearchSuggest(keywords)
        if(res.code==200){
            this.setData({suggest:res.result.allMatch})

            // 获取所有建议关键字字符串列表
            let suggestKeywords=this.data.suggest.map(item=>{
                return item.keyword
            })
            //每次搜索清空节点
            this.setData({suggestNodes:[]})
            // 获取过滤后的富文本节点
            let suggestNodes=stringNode(keywords,suggestKeywords)
            this.setData({suggestNodes})
        }
    },

    // 搜索框enter键发送请求
    async searchAction(offset = 0){
        this.setData({showList:true})
        let keywords = this.data.keywords
        wx.showNavigationBarLoading()
        let res = await getSearchValue(keywords,offset)
        if(res.code == 200){
            if(offset == 0){
                this.setData({searchValue:res.result.songs})
            }else{
                this.setData({searchValue:[...this.data.searchValue,...res.result.songs]})
            }
            this.setData({hasMore:res.result.hasMore})
        }
        wx.hideNavigationBarLoading()
    },

    //点击热门词汇或搜索出来的关键词进行搜索
    titleSearch(e){
        let keywords=e.currentTarget.dataset.keywords
        this.setData({keywords})
        this.searchAction()
    },

    //页面上拉触底事件的处理函数
    // onReachBottom() {
    //     if(!this.data.hasMore) return;
    //     this.searchAction(this.data.searchValue.length)
    // },
})