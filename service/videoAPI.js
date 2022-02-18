import NxRequest from './index'

//视频的请求
//每次请求只改变offset
export default function(offset=0){
   return NxRequest.get('/top/mv',{offset:offset,limit:10})
}