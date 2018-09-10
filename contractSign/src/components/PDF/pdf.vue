<template>
  <div class="pdf_box" id="pdf_box">
    <div class="pdf_container">
      <div id="canvas_container"></div>
    </div>
    <div class="pdf_tools" v-if="pdfDoc">
      <span class="tools_zoomOut" @click="scalePdf(1)">+</span>
      <span class="tools_zoomIn" @click="scalePdf(2)">-</span>
    </div>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
console.log(PDFJS)
export default {
  data () {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 1,
      clearCanvas: false,
      MAX_IMAGE_SIZE: 100 * 1024 * 1024
    }
  },
  methods: {
    showPDF (url) {
      PDFJS.getDocument(url).then((pdf) => {
        this.pdfDoc = pdf
        for (let i = 1; i <= pdf.pdfInfo.numPages; i++) {
          this.renderPage(i)
        }
      })
    },
    renderPage (num) {
      this.pageRendering = true
      let _this = this
      this.pdfDoc.getPage(num).then((page) => {
        let viewport = page.getViewport(_this.scale)
        let canvasContainer = document.getElementById('canvas_container')
        if (this.clearCanvas && num === 1) {
          canvasContainer.html = ''
          canvasContainer.innerHTML = ''
        }
        let canvas = document.createElement('canvas')
        canvas.id = `canvas_container${num}`
        canvas.height = viewport.height
        canvas.width = viewport.width
        if (!this.clearCanvas || this.scale <= 1) {
          canvas.style.width = '10rem'
        }
        canvas.style.display = 'block'
        canvasContainer.appendChild(canvas)

        // Render PDF page into canvas context
        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        }
        let renderTask = page.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then(function () {
          _this.pageRendering = false
          if (_this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(_this.pageNumPending)
            _this.pageNumPending = null
          }
        })
      })
    },
    scalePdf (type) {
      if (type === 2) {
        if (this.scale <= 1) {
          this.$toast.fail('不要再缩小啦！')
          return false
        }
        this.scale = this.scale * 1 - 0.1
      } else {
        if (this.scale >= 3) {
          this.$toast.fail('不要再放大啦！')
          return false
        }
        this.scale = this.scale * 1 + 0.1
      }
      this.clearCanvas = true
      for (let i = 1; i <= this.pdfDoc.pdfInfo.numPages; i++) {
        this.renderPage(i)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pdf_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  .pdf_container {
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
  }
}

.pdf_tools {
  position: fixed;
  right: 0.4rem;
  bottom: 5rem;
  z-index: 99;
  .tools_zoomOut,
  .tools_zoomIn {
    display: block;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: 50%;
    font-size: 36px;
    margin-bottom: 0.2rem;
  }
}
</style>
