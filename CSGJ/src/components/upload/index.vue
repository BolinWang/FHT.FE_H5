<template>
  <div class="img-list">
    <ul>
      <li v-for="(item, index) in cropperList" :key="index">
        <span @click="deleteImg(index)" class="iconfont">&#xe601;</span>
        <p><img :src="item.src"  class="preview-img" alt="" @click="defaultImgList(index)"></p>
      </li>
      <div v-show="uploadParam.isShowUploadBtn" class="showUploadBtn" @click="chooseImg">
        <img src="../../assets/upload.png" alt="" class="icon-upload">
        <!-- <input type="file"
          class="file-upload"
          multiple
          @change="uploadImg($event)"> -->
      </div>
    </ul>
    <div class="img-cropper" v-show="isCropper">
      <imgCropper
      :currentImg="currentImg"
      :uploadParam = "uploadParam"
      @isCroppered="isCroppered"
      @emitCropperData="emitCropperData"
    >
    </imgCropper>
    </div>
  </div>
</template>

<script>
import imgCropper from './vueCropper/imgCropper';
import bus from './bus'

  export default {
    name: 'upload',
    props: {
      uploadParam: {},
      cropperList: ''
    },
    components: {
      imgCropper
    },
    data() {
      return {
        options: {
          captionEl: true,
          bgOpacity: 0.8,
          fullscreenEl: false,
          shareEl: false,
          tapToClose: true
        },
        currentImg: '',
        isCropper: false
        // cropperList: [],
      }
    },
    methods: {
      deleteImg (index) {
        window.getPicUrl()
        // this.cropperList.splice(index, 1)
      },
      chooseImg () {
        // this.$vux.toast.text('ss')
        window.JSIdentity.takeIdentityPhoto()
      },
      // 裁剪后图片
      emitCropperData(img = {}) {
        console.log(img, 'img')
        this.cropperList[img.index] = img
        this.currentImg = {}
      },
      isCroppered (isCrop) {
        this.isCropper = isCrop
      },
      async defaultImgList (index) {
        const readFileAsync = (el) => new Promise(resolve => {
          let _img = new Image()
          _img.src = el.src
          _img.onload = () => {
            resolve({
              w: _img.width,
              h: _img.height,
              src: el.src,
              imageName: el.imageName
            })
          }
        })
        const newArr = []
        for (let i = 0; i < this.cropperList.length; i++) {
          console.log(newArr)
          newArr.push(await readFileAsync(this.cropperList[i]))
        }
        this.$preview.open(index, newArr)
      },
        /* 选择图片 */
      async uploadImg(e) {
        if (!e.target.value) {
          console.log('取消上传...')
          return false
        }
        const uploadList = []
        const readFileAsync = file => new Promise(resolve => {
          let reader = new FileReader()
          reader.onerror = function(e) {
            console.log('读取异常....')
          }
          reader.onload = e => {
            console.log(e.target.result)
            const src = (typeof e.target.result === 'object')
              // 把Array Buffer转化为blob 如果是base64不需要
              ? window.URL.createObjectURL(new Blob([e.target.result]))
              : e.target.result
            console.log(src)
            let imageName = ''
            if (!file.name) {
              imageName = ''
            } else {
              imageName = file.name.split('.')[0].length <= 30
                ? file.name.split('.')[0]
                : file.name.split('.')[0].substr(0, 30)
            }
            let _img = new Image()
            _img.src = src
            let [w, h] = []
            _img.onload = () => {
              w = _img.width || 800
              h = _img.height || 600
              resolve({
                src,
                imageName,
                w,
                h
              })
            }
          }
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file)
        })

        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
          if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(files[i].type) === -1) {
            this.$message.error('请上传jpg/png的图片')
            e.target.value = null
            return false
          }
          uploadList.push(await readFileAsync(files[i]))
        }
        this.cropperList.push.apply(this.cropperList, uploadList.map((item, kindex) => {
          return {
            w: item.w,
            h: item.h,
            src: item.src,
            imageName: item.imageName
          }
        }))
        this.layer_cropper = true
        e.target.value = null
      }
    },
    mounted () {
      let self = this
      setTimeout(() => {
        console.log(self.cropperList)
      }, 3000);
      console.log(self.cropperList)


      bus.$on('editImg', data => {
        self.$preview.close()
        self.isCropper = true
        this.currentImg = data
      })
      window.getPicUrl = (data) => {
        console.log(this)
        // let obj = JSON.parse(data)
        // self.cropperList.push({src: "https://fh-mjgy-test.oss-cn-hangzhou.aliyuncs.com/20180605142509958016"})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 640228 */
  src: url('//at.alicdn.com/t/font_640228_vum2hy4mnx7uv7vi.eot');
  src: url('//at.alicdn.com/t/font_640228_vum2hy4mnx7uv7vi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_640228_vum2hy4mnx7uv7vi.woff') format('woff'),
  url('//at.alicdn.com/t/font_640228_vum2hy4mnx7uv7vi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_640228_vum2hy4mnx7uv7vi.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
.img-list{
  width: 100vw;
}
.img-list ul {
  display: flex;
  // flex-flow: row wrap;
  list-style:none;
  width: 100%;
}
.img-list ul li{
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  position: relative;
  border: 1px solid #ccc;
  margin-left: 10px;
}
.img-list ul li p{
  overflow: hidden;
}
.img-list ul li span{
  position: absolute;
  top: -12px;
  right: -7px;
  z-index: 1000;
}
.showUploadBtn{
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  position: relative;
  margin-left: 10px;
  border: 1px solid #ccc;
}
.showUploadBtn img{
  width: 100%;
  height: 100%;
}
.img-list .file-upload{
  margin:0;
  width: 100%;
  background-color: #ccc;
  padding-bottom: 70%;
  opacity: 0
}
.img-list ul li img{
  width: 100%;
  /* height: 100%; */
}
.img-list ul li img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon-upload{
  color: #ccc;
  width: 50%;
  position:absolute;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.img-cropper{
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
