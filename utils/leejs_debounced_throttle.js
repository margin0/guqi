// 使用方法debounced,throttle
// leeBtnClick: throttle(function () {
//   //console.log(this)
//   //console.log("执行需要触发事件得函数方法")
// }, 3000),

/**
 * 防抖函数
 * 1、N秒内的多次触发仅执行最后一次
 * 2、在不断的触发事件时以最后一次触发为*标准*准进行调用执行
 * 3、判断连续触发事件的标准为(N秒内触发则重新计算时间直至取最后一次)
 * @param fn 需要防抖处理的回调函数
 * @param delay 防抖处理的延迟标准时间
 * @param immediate 是否默认 立即执行(去除延迟时间影响)
 */
function debounced(fn, delay = 1000, immediate = false) {
  let timer = null
  return function () {
    if (immediate) {
      //console.log("立即执行参数 执行一次方法")
      fn.apply(this, arguments)
      immediate = false
      return
    }
    if (timer) {
      //console.log("当前正在重复点击，准备重置时间，重新计算后等待N秒触发最后一次事件执行")
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      //console.log("进入类启用定时器防抖执行了一次方法咯！！！")
      clearTimeout(timer)
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流函数
 * N秒内仅执行第一次
 * @param fn 需要节流处理的回调函数
 * @param delay 节流处理的延迟标准时间
 * @param immediate 是否默认 立即执行(去除延迟时间影响)
 */
function throttle(fn, delay = 1000, immediate = false) {
  //console.log("进入节流对象")
  let timer;
  let status = false // 是否为重复点击状态
  return function () {
    let _this = this
    let args = arguments

    if (immediate) {
      //console.log("立即执行参数 执行一次方法")
      fn.apply(_this, args)
      immediate = false
      return
    }
    if (status) {
      //console.log("当前点击状态为正在重复点击，请稍等片刻后在点击执行")
      return
    }
    //console.log("执行节流：当前执行了一次点击方法")
    fn.apply(_this, args)
    status = true // 修改状态
    timer = setTimeout(() => {
      //console.log("规定时间到,重置状态，可以重新调用")
      status = false
    }, delay)
  }
}

export {
  debounced,
  throttle
}