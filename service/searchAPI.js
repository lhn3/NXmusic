import NxRequest from './index'

//请求热门搜索词汇
export function getHotCard(){
   return NxRequest.get('/search/hot')
}

//输入关键字发送请求
export function getSearchSuggest(keywords){
   return NxRequest.get(`/search/suggest?keywords=${keywords}&type=mobile`)
}
