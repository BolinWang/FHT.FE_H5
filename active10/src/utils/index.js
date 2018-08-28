/* *号隐藏 */
export function sensitiveInfo (str, frontLen, endLen) {
  if (!str) {
    return ''
  }
  const len = str.length - frontLen - endLen
  return str.substring(0, frontLen) + '*'.repeat(len) + str.substring(str.length - endLen)
}
