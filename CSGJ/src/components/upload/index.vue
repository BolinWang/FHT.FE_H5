<template>
  <div class="img-list">
    <ul>
      <li v-for="(item, index) in cropperList" :key="index">
        <span @click="deleteImg(index)">x</span>  
        <p><img :src="item.src"  class="preview-img" alt="" @click="$preview.open(index, cropperList, options)"></p>
      </li>
      <li>
        <img src="../../assets/upload.png" alt="" class="icon-upload">
        <input type="file" 
          class="file-upload" 
          multiple  
          @change="uploadImg($event)">
      </li>
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
      uploadParam: {}
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
        isCropper: false,
        cropperList: [],
        cropperData: {},
        list: [{
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 400,
          imageName: 'miao'
        }, {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900,
          imageName: 'miao2'
        }]
      }
    },
    methods: {
      // 裁剪后图片
      emitCropperData(img = {}) {
        console.log(img, 'img')
        this.cropperList[img.index] = img
        this.currentImg = {}
      },
      isCroppered (isCrop) {
        this.isCropper = isCrop
      },
      deleteImg (index) {
        this.cropperList.splice(index,1)
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
            const src = (typeof e.target.result === 'object')
              // 把Array Buffer转化为blob 如果是base64不需要
              ? window.URL.createObjectURL(new Blob([e.target.result]))
              : e.target.result
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
      bus.$on('editImg', data => {
        self.$preview.close()
        self.isCropper = true
        this.currentImg = data
      })
    }
  }
</script>

<style scoped>
.img-list{
  width: 100%;
}
.img-list ul {
  display: flex;
  flex-flow: row wrap;
  list-style:none
}
.img-list ul li{
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  position: relative;
  border: 1px solid #ccc;
  margin-left: 10px;
  box-sizing: border-box;
}

.img-list ul li p{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img-list ul li span{
  position: absolute;
  top: -13px;
  right: -4px;
  z-index: 99999;
}
.img-list ul li:last-child{
  border: none
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
.img-list ul li:not(:last-child) img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon-upload{
  color: #ccc;
  position:absolute;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.img-cropper{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top:0;
  left:0;
  z-index: 999999999;
}
</style>