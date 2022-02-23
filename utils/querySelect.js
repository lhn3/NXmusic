
//获取document对象返回相应信息
export function queryRect(seletor){
    return new Promise(resolve=>{
        const query = wx.createSelectorQuery()
        query.select(seletor).boundingClientRect()
        query.exec(res=>{
            resolve(res)
        })
    })
   
}