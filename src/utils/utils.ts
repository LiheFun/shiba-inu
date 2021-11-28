import Taro from '@tarojs/taro'

export function isFunction(val) {
  return typeof val === 'function'
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function when(value, fulfilled, rejected) {
  var promise = Promise.resolve(value)

  if (arguments.length < 2) {
    return promise
  }

  return promise.then(fulfilled, rejected)
}

export function setStorageSync(key, value) {
  try {
    Taro.setStorageSync(key, value)
  } catch (e) {
    console.log(e)
  }
}

export function getStorageSync(key) {
  try {
    var value = Taro.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}

export function removeStorageSync(key) {
  try {
    Taro.removeStorageSync(key)
  } catch (e) {
    console.log(e)
  }
}

/**
 * toast提示统一处理方法
 */
export function showToast(title, duration, sucFn) {
  let sucF = sucFn || function () {}
  Taro.showToast({
    title: title || '',
    icon: 'none',
    duration: duration || 1500,
    success: sucF
  })
}

/**
 * 兼容低版本的Object.values获取对象所有值的方法
 */
export function getObjectVals(o) {
  let obj = o || {}
  let vals = []
  for (let key in obj) {
    vals.push(obj[key])
  }
  return vals
}

/**
 * 调用小程序拨打电话功能
 * @param {object} { phone, success, fail, complete } 电话号|成功回调|失败回调|完成回调
 */
export function miniAppPhoneCall({
  phone,
  success = () => {},
  fail = () => {},
  complete = () => {}
}) {
  if (phone) {
    Taro.makePhoneCall({
      phoneNumber: phone,
      success,
      fail,
      complete
    })
  }
}

export function openLocation(obj) {
  Taro.openLocation(obj)
}

export function isMobile(value) {
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return false
  }
  return true
}

export function isTel(value) {
  let tel = /^((0\d{2,3}))(\d{7,8})(-(\d{3,}))?$/
  let fTel = /^400[0-9]{7}/
  if (!(tel.test(value) || fTel.test(value))) {
    return false
  }
  return true
}

export function checkID(val) {
  const reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  return reg.test(val)
}

/*函数防抖*/
export function debounce(fn, interval) {
  var timer
  var gapTime = interval || 500 //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer)
    var context = this
    var args = arguments //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args)
    }, gapTime)
  }
}

export function getSubString(param, subParam) {
  var v = param.match(new RegExp('(/?|&)' + subParam + '=([^&]*)(&|$)', 'i'))
  if (v != null) {
    v = decodeURI(v[2])
  }
  return v
}

