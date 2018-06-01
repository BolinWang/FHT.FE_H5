import cityData from '@/components/cityData/cityData'
export function getAreaName(provinceId, cityId, areaId) {
  if (!provinceId || !cityId || !areaId) {
    return ''
  }

  let nameArr = []
  cityData.map((v, k) => {
    if (v.value === provinceId || String(v.value) === provinceId) {
      nameArr.push(v.label)
      v.children.map((n, m) => {
        if (n.value === cityId || String(n.value) === cityId) {
          nameArr.push(n.label)
          n.children.map((y, x) => {
            if (y.value === areaId || String(y.value) === areaId) {
              nameArr.push(y.label)
            }
          })
        }
      })
    }
  })
  return nameArr.join('/')
}
