<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header slot="header" :left-options="{showBack: false}"
      title="添加成功" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <msg title="房源录入成功">
        <template slot="description">
          立即完善<span style="color:#ff7100">交租方式、房源照片</span><br>
          并发布到流量渠道可以第一时间出房哦！
        </template>
        <template slot="buttons">
          <x-button plain type="primary">立即完善</x-button>
        </template>
      </msg>
      <div slot="bottom" class="bottomDiv">
        <flexbox :gutter="0">
          <flexbox-item >
            <x-button class="primary-btn" action-type="button" @click.native="keepAdd">继续录入房源</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" action-type="button" @click.native="returnList">返回</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </view-box>
  </div>
</template>

<script>
import { Msg, XButton, Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    Msg,
    XButton,
    Flexbox, 
    FlexboxItem
  },
  mounted() {
    window['backUrl'] = () => {
      this.returnList()
      return 'true'
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    returnList() {
      this.$router.push({name: 'houseIndex'})
    },
    keepAdd() {
      this.$router.push({name: 'addHouse', params: {houseType: this.$router.params.houseType}})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  
  
</style>
