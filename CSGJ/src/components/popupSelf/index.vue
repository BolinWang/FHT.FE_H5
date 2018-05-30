<template>
  <div v-transfer-dom>
    <popup v-model="showPop" width="100%" @on-hide="hidePop" @on-show="defalutValue">
      <popup-header :title="title" v-if="isradio"></popup-header>
      <popup-header :title="title" v-if="!isradio" left-text="取消" right-text="确定" @on-click-right="save" @on-click-left="hidePop"></popup-header>
      <flexbox class="popupDiv" :gutter="0" wrap="wrap">
        <flexbox-item class="popupItem" wrap="wrap" v-for="(item, index) in data" :key="index" :span="1/span">
          <div class="flex-popup" 
            :class="{active: currentVal.indexOf(item.value) !== -1 || currentVal.indexOf(String(item.value)) !== -1}"
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
    methods: {
      hh() {
        return true
      },
      valueToArr(value) { //value 转为数组
        let val = []
        if (value instanceof Array) {
          val = value
        } else {
          if (Number.isInteger(value)) {
            val = [value]
          } else if (value !== '') {
            val = value.split(',')
          }
        }
        this.currentVal = val
      },
      chooseFn(val) {
        if (this.isradio) {
          this.currentVal = [val]
          this.hidePop()
          this.updateVal()
        } else {
          if (val === 0) { //点击不限制其他选项自动取消
            this.currentVal = [0]
          } else { 
            let arr = deepClone(this.currentVal)
            let index = arr.indexOf(val)
            index < 0 ? arr.push(val) : arr.splice(index, 1)
            let notLimit = arr.indexOf(0) //判断是否选择了不限制，获取位置删除不限制选项
            notLimit > -1 ? arr.splice(notLimit, 1) : ''
            this.currentVal = deepClone(arr)
          } 
        } 
      },
      save() {
        this.updateVal()
        this.hidePop()
      },
      defalutValue() {
        this.valueToArr(this.value)
      },
      updateVal() {
        this.$emit('input', this.currentVal.join(','))
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
        this.valueToArr(val)
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
