// components/navBar/index.js
Component({
    options:{
        //具名插槽
        multipleSlots:true
    },
    data:{
        statusBarHeight:getApp().globalDate.statusBarHeight
    },
    lifetimes:{

    },
    methods:{
        handleLeft(){
            this.triggerEvent('leftClick')
        }
    }
})