import NxRequest from './index'

//视频首页请求
//每次请求只改变offset
export function getVideoList(offset){
   return NxRequest.get(`/top/mv?offset=${offset}&limit=${10}`)
}

//视频播放地址请求
export function getVideoPlay(id){
   return NxRequest.get(`/mv/url?id=${id}`)
}

//播放的视频详细信息
export function getVideoDetail(mvid){
   return NxRequest.get(`/mv/detail?mvid=${mvid}`)
}

//播放视频的推荐视频
export function getRelateVideo(id){
   return NxRequest.get(`/related/allvideo?id=${id}`)
}