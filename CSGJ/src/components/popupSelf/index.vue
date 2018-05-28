<template>
  <div v-transfer-dom>
    <popup v-model="showPop" width="100%" @on-hide="hidePop" @on-show="defalutValue">
      <popup-header :title="title" v-if="isradio"></popup-header>
      <popup-header :title="title" v-if="!isradio" left-text="取消" right-text="确定" @on-click-right="save" @on-click-left="hidePop"></popup-header>
      <flexbox class="popupDiv" :gutter="0" wrap="wrap">
        <flexbox-item class="popupItem" wrap="wrap" v-for="(item, index) in data" :key="index" :span="1/span">
          <div class="flex-popup" 
            :class="{active: currentVal.indexOf(item.value) !== -1}"
            @click="chooseFn(item.value)"
          >{{item.label}}</div>
        </flexbox-item>
      </flexbox>
    </popup>
  </div>
  
</template>

<script>
  import { Popup, TransferDom, Flexbox, FlexboxItem, PopupHeader } from 'vux'
  import { deepClone } from '@/utils'
  export default {
    name: 'popupSelf',
    props: {
      span: {
        default: 3
      },
      title: {
        type: String,
        default: '请选择'
      },
      show: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: []
      },
      isradio: {
        type: Boolean,
        default: true
      },
      value: {
        type: Array,
        default: []
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Popup, 
      TransferDom, 
      Flexbox, 
      FlexboxItem,
      PopupHeader
    },
    data() {
      return {
       currentVal: [],
       showPop: false
      }
    },
    mounted() {
      this.currentVal = this.value
    },
    methods: {
      chooseFn(val) {
        if (this.isradio) {
          this.currentVal = [val]
          this.$emit('closePop')
        } else {
          if (val === 0) { //点击不限制其他选项自动取消
            this.currentVal = [0]
          } else { 
            let arr = deepClone(this.currentVal)
            let index = arr.indexOf(val)
            index < 0 ? arr.push(val) : arr.splice(index, 1)
            let notLimit = arr.indexOf(0)
            notLimit > -1 ? arr.splice(notLimit, 1) : ''
            this.currentVal = deepClone(arr)
          } 
        }
      },
      save() {
        this.$emit('input', this.currentVal)
        this.hidePop()
      },
      defalutValue() {
        this.currentVal = this.value
      },
      hidePop() {
        this.$emit('closePop')
      }
    },
    watch: {
      show(val) {
        this.showPop = val
      },
      value(val) {
        this.currentVal = val
      },
      currentVal(val) {
        if (this.isradio) {
          this.$emit('input', val)
        } else { //没有选择的时候默认为不限制
          if (val.length === 0) {
            val = [0]
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .popupDiv {
    width: 100%;
    padding: 10px;
    background: #fff;
    .popupItem {
      padding: 5px;
    }
  }
  .flex-popup {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  .active {
    border-color: #4680FF;
    color: #4680FF;
  }
</style>
