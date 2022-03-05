import NxRequest from './index'

// 请求轮播图数据
export function getBanner(){
    return NxRequest.get(`/banner?type=${2}`)
}

// 请求推荐/飙升/热门歌曲数据
export function getRanking(idx){
    return NxRequest.get(`/top/list?idx=${idx}`)
}

// 请求歌单
export function getMusicMenu(cat,limit=6,offset=0){
    return NxRequest.get(`/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`)
}

// 根据ID请求歌曲列表
export function getMusicList(id){
    return NxRequest.get(`/playlist/detail/dynamic?id=${id}`)
}