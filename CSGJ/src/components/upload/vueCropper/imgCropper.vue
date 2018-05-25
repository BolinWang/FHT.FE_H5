<template>
  <div class="wrapper">
    <vueCropper
      ref="cropper"
      :img="currentImg.src"
      :outputSize="uploadParam.size || 1"
      :outputType="uploadParam.outputType"
      :info="uploadParam.info"
      :canScale="uploadParam.canScale"
      :autoCrop="uploadParam.autoCrop"
      :autoCropWidth="uploadParam.autoCropWidth"
      :autoCropHeight="uploadParam.autoCropHeight"
      :fixed="uploadParam.fixed"
      :fixedNumber="uploadParam.fixedNumber"
    ></vueCropper>
    <div class="footer">
      <p>
        <i class="iconfont cancel" @click="cancel()">&#xe6bc;</i>
        <span>
          <i class="iconfont"  @click="changeScale(1)" v-show="uploadParam.showPlusMinus">&#xe776;</i>
          <i class="iconfont"  @click="changeScale(-1)" v-show="uploadParam.showPlusMinus">&#xe775;</i>
          <i class="iconfont"  @click="rotateLeft()" v-show="uploadParam.showRotate">&#xe6ae;</i>
          <i class="iconfont"  @click="rotateRight()" v-show="uploadParam.showRotate">&#xe63d;</i>
        </span>
        <i class="iconfont confirm" @click="getCropData()">&#xe6d0;</i>
      </p>
    </div>
  </div>
</template>    

<script>
import vueCropper from 'vue-cropper'
import Vue from 'vue'
const bus = new Vue()

  export default {
    name: 'imgCrop',
    props: {
      currentImg: {
        src: ''
      },
      uploadParam: {}
    },
    components: {
      vueCropper
    },
    data () {
      return {
        example2: {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 320,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: false,
          fixedNumber: [4, 3]
          // full: true
        }
      }
    },
    methods: {
      getCropData () {
        this.$refs.cropper.getCropData((data) => {
          this.currentImg.src = data
          this.$emit('emitCropperData', this.currentImg)
          this.$emit('isCroppered', false)
          this.$refs.cropper.stopCrop()
        })
      },
      cancel () {
        this.$refs.cropper.stopCrop()
        this.$emit('isCroppered', false)
      },
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      changeScale (param) {
        this.$refs.cropper.changeScale(param) 
      }
    }
  }
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 672121 */
  src: url('//at.alicdn.com/t/font_672121_qus58cxcrtlqh0k9.eot');
  src: url('//at.alicdn.com/t/font_672121_qus58cxcrtlqh0k9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_672121_qus58cxcrtlqh0k9.woff') format('woff'),
  url('//at.alicdn.com/t/font_672121_qus58cxcrtlqh0k9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_672121_qus58cxcrtlqh0k9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: inherit;
  // position: relative;
}
.footer{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background: #333;
  opacity: .8;
}
.footer p{
  width: 100%;
  line-height: 60px;
}
.footer span{
  display: flex;
  width: 60%;
  margin: 0 5%;
  text-align: center;
  float: left;
}
.footer span i{
  flex: 1;
}
.cancel{
  float: left;
  width: 15%;
  text-align: center;
}
.confirm{
  float:right;
  width: 15%;
  text-align: center;
}
.iconfont{
  color: #cdd4e2;
  font-size: 25px;
}
</style>