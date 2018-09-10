import PDF from './pdf'

let $vm
export default {
  install (Vue) {
    const PDFPlugin = Vue.extend(PDF)
    if (!$vm) {
      $vm = new PDFPlugin().$mount()
      document.body.appendChild($vm.$el)
    }
    Vue.$showPDF = (url) => {
      $vm.showPDF(url)
    }
    Vue.mixin({
      created () {
        this.$showPDF = Vue.$showPDF
      }
    })
  }
}
