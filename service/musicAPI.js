import NxRequest from './index'

export function getBanner(){
    return NxRequest.get('/banner',{type:2})
}