// pages/musicBox/musicBox.js
import {getMusicMenu} from '../../service/musicAPI'
Page({
    data: {
        title:'',
        musicBox:[],
        isHas:0
    },

    onLoad(options) {
        this.setData({title:options.title})
        if(this.data.title == '热门歌单'){
            this.getMusicBox('全部',0)
        }else if(this.data.title == '华语乐坛'){
            this.getMusicBox('华语',0)
        }
    },

    //获取音乐box
    async getMusicBox(title,offset){
        // 请求加载动画
        wx.showNavigationBarLoading()
        // let res=await getMusicMenu(title,10,offset)
        let res=await getMusicMenu(title,100,offset)
        if(res.code==200){
            if(offset==0){
                this.setData({musicBox:res.playlists})
            }else{
                this.setData({musicBox:[...this.data.musicBox,...res.playlists]})
            }
            this.setData({isHas:res.playlists.length})
        }
        // 数据请求完后停止加载动画和下拉
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },

    //下拉刷新
    onPullDownRefresh() {
        // 重新请求数据
        let title = this.data.title
        this.getMusicBox(title,0)
    },

    //页面上拉触底事件的处理函数
    //没登录无法请求更多
    onReachBottom() {
        let title = this.data.title
        if(this.data.isHas<10) return;
        this.getMusicBox(title,this.data.musicBox.length)
    },

    //点击进入音乐列表
    handleClick(e){
        // 热门和华语乐坛的音乐列表跳转
        const item = e.currentTarget.dataset.info
        wx.navigateTo({
            url: `/pages/musicList/musicList?id=${item.id}`,
        })
    },
})