/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-10 17:52:20
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-10 17:52:20
 */

/* 去除对象空值 */
export function ObjectMap (obj = {}) {
  const newObject = {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (typeof value !== 'undefined' && value !== '' && value !== null && !Number.isNaN(value) && value !== -1) {
      newObject[key] = value
    }
  }
  return newObject
}

/* 深拷贝 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
