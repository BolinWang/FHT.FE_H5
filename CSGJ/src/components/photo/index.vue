<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" :title="title" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <flexbox :gutter="0" wrap="wrap" class="photoDetailNav">
        <flexbox-item :span="1/3" class="navLi" v-for="(item, index) in [1, 2, 3]" :key="index">
          <x-img    src="http://cdn.baletoo.cn/Uploads/housephoto/869/868498/oss_5a5ed2dc87a40.jpg@!380_280.png">
          </x-img>
          <!-- <div class="imgType">房间</div> -->
        </flexbox-item>
        <flexbox-item :span="1/3">

        </flexbox-item>
      </flexbox>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="saveData">保存并上传</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
  import { XButton, Flexbox, FlexboxItem, XImg } from 'vux'
  export default {
    props: {
      title: {
        type: String,
        default: '房间照片'
      }
    },
    components: {
      XButton,
      Flexbox, 
      FlexboxItem,
      XImg
    },
    mounted(){
    },
    data() {
      return {
        valueName: ''
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="less">
  .photoDetailNav {
    .navLi {
      position: relative;
      border: 1px solid #ccc;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
      }
      .imgType {
        width: 100%;
        height: 24px;
        background-color: rgba(16, 16, 16, 0.5);
        line-height: 24px;
        text-align: center;
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
</style>
  