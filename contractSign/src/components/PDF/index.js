import PDF from './pdf'
import Vue from 'vue'
const PDFPlugin = Vue.extend(PDF)

export default PDFPlugin

// 不直接插入到body了，需要用到的地方再去挂载
// let $vm
// export default {
//   install (Vue) {
//     const PDFPlugin = Vue.extend(PDF)
//     if (!$vm) {
//       $vm = new PDFPlugin().$mount()
//       document.body.appendChild($vm.$el)
//     }
//     Vue.prototype.$showPDF = url => {
//       $vm.showPDF(url)
//     }
//   }
// }
