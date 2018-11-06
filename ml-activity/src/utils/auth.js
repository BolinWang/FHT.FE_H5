/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 16:00:08
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-30 10:02:48
 */

import store from 'store'

const userDataKey = 'FHT.FE-H5'

export function getUserData () {
  return store.get(userDataKey)
}

export function setUserData (data) {
  return store.set(userDataKey, data)
}

export function removeUserData () {
  return store.remove(userDataKey)
}
