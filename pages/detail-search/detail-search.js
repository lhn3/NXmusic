// pages/detail-search/detail-search.js
import {getHotCard,getSearchSuggest} from '../../service/searchAPI'
import {debounce} from '../../utils/debounce'
//返回一个防抖函数
let de_getSearchSuggest=debounce(getSearchSuggest,300)
Page({
    data: {
        hotCard:[],
        suggest:[],
        keywords:'',
        suggestNodes:[]
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
        let res = await de_getSearchSuggest(keywords)
        if(res.code==200){
            this.setData({suggest:res.result.allMatch})

            // 获取所有建议关键字字符串列表
            let suggestKeywords=this.data.suggest.map(item=>{
                return item.keyword
            })
            this.setData({suggestNodes:[]})
            //全部行节点
            let suggestNodes=[]
            for(let word of suggestKeywords){
                //一行的节点
                let nodes=[]
                // 如果是以输入的内容开头
                if(word.startsWith(keywords)){
                    // 切割出相同的部分
                    const k1=word.slice(0,keywords.length)
                    //建立一个node
                    const node1={
                        name:'span',
                        attrs:{style:'color: #26ce8a;'},
                        children:[{type:'text',text:k1}]
                    }
                    nodes.push(node1)
                    // 切割出不同的部分
                    const k2=word.slice(keywords.length)
                    const node2={
                        name:'span',
                        attrs:{style:'color: #000;'},
                        children:[{type:'text',text:k2}]
                    }
                    nodes.push(node2)
                }else{
                    const node={
                        name:'span',
                        attrs:{style:'color:#000;'},
                        children:[{type:'text',text:word}]
                    }
                    nodes.push(node)
                }
                suggestNodes.push(nodes)
            }
            this.setData({suggestNodes})
        }
    }
})