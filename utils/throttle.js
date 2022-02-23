
//节流函数
//默认第一次触发，最后一次不触发
export function throttle(fn, time, first = true, last = false) {
    //上一次执行后的时间
    let lastTime = 0
    //最后一次是否触发设置定时器
    let timer = null
  
    //传入要节流的函数返回一个被节流的pormise函数
    return function (...args) {
      return new Promise((resolve, reject)=>{
        if (timer) clearTimeout(timer)
  
        //这次执行的时间
        let nowTime = new Date().getTime()
        //第一次若是不执行
        if (!first && !lastTime) lastTime = nowTime
        //两次触发的时间差与节流时间差(剩余时间)
        let remainTime = time - (nowTime - lastTime)
    
        if (remainTime <= 0) {
          let res=fn.apply(this, args)
          lastTime = nowTime
          resolve(res)
        } else if (last) {
          //最后一次是否执行
          timer = setTimeout(() => {
            let res=fn.apply(this, args)
            lastTime = first ? nowTime : new Date().getTime()
            resolve(res)
          }, remainTime)
        }
      })
      
    }
  }