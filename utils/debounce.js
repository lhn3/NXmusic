//防抖函数
export function debounce(fn, time, immediate = false) {
    let timer = null
    //作为每一次输入的第一次立即执行标识
    let num = 1
  
    //为绑定this，不能使用箭头函数
    return function (...args) {
        return new Promise((resolve,reject)=>{
            if (timer) clearTimeout(timer)
            //是否需要立即执行
            if (immediate && num) {
              let res = fn.apply(this, args)
              num = 0
              resolve(res)
            } else {
              timer = setTimeout(() => {
                let res = fn.apply(this, args)
                num = 1
                resolve(res)
              }, time)
            }
        })
    }
  }