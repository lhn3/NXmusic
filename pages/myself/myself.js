// pages/myself/myself.js
import {getUserInfo} from '../../utils/login'
Page({
    data: {
        username:'',
        avatar:''
    },
    onLoad(options) {
        this.getUser()
    },

    //获取用户信息
    getUser(){
        let username = wx.getStorageSync('username')
        let avatar = wx.getStorageSync('avatar')
        this.setData({username,avatar})
    },
    async login(){
        await getUserInfo()
        this.getUser()
    }
})