import NxRequest from './index'

// 请求轮播图数据
export function getBanner(){
    return NxRequest.get('/banner',{type:2})
}

// 请求推荐/飙升/热门歌曲数据
export function getRanking(idx){
    return NxRequest.get('/top/list',{idx:idx})
}