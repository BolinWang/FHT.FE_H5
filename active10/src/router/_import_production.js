/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:30:06
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-17 14:30:06
 */

module.exports = file => () => import('@/views/' + file + '.vue')
