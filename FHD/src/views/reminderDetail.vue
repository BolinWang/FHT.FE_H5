/*
 * @Author: chenxing 
 * @Date: 2018-06-05 11:13:00 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-14 16:10:28
 */

<template>
	<div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="催租记录">
      </x-header>
      <ul class="detailNav">
        <li v-for="(item, index) in list" :key="index" :class="{'border-bottom': index + 1 !== list.length}">
          <div>{{item.time}} {{item.name}}</div>
          <div class="desc">{{item.desc}}</div>
        </li>
      </ul>
    </view-box>
  </div>
</template>

<script>
export default {
  name: 'reminder-detail',
  mounted() {
    window['backUrl'] = () => {
      this.goBack()
      return 'false'
    }
  },
	data() {
		return {
      list: [{
        time: '2018/05/01 13:21:23',
        name: '李霞',
        desc: '已和租客沟通过，会过1天马上交租'
      },{
        time: '2018/05/01 13:21:23',
        name: '李霞',
        desc: '已和租客沟通过，会过1天马上交租'
      }]
		}
	},
	methods: {
    goBack() {
      this.$router.go(-1)
    }
	}
}
</script>

<style lang="less" scoped>
	.detailNav {
    padding-left: 12px;
    background: #fff;
    li {
      width: 100%;
      padding: 5px 0;
      min-height: 60px;
      line-height: 24px;
      color: #333;
      .desc {
        color: #666;
      }
    }
  }
  .border-bottom {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1;
      border-bottom: 1px solid #D9D9D9;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
</style>


