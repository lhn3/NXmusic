import NXrequest from './index'

//视频的请求
//每次请求只改变offset
export default function(offset=0){
   return NXrequest.get('/top/mv',{offset:offset,limit:10})
}