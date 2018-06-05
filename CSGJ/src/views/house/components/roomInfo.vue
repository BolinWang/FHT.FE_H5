/*
 * @Author: chenxing 
 * @Date: 2018-06-05 10:34:03 
 * @Last Modified by:   chenxing 
 * @Last Modified time: 2018-06-05 10:34:03 
 */

<template>
  <div >
    <group :label-width="labelWidth" class="noTop" v-for="(item, key) in houseData.rooms" :key="key" style="margin-top: 5px">
      <flexbox class="houseItem" wrap="wrap" :gutter="0">
        <flexbox-item :span="1/2">
          <x-input :label-width="labelWidth" v-model="item.roomArea" :title="key | keyStr" placeholder="平方米"></x-input>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <cell title="房屋朝向" class="cellHeight labelWidth" is-link @click.native="popClick('orientationsShow', key)" value-align="left">
            <cell-value :value="item.houseDirection" :data="orientationsList"></cell-value>
          </cell>
        </flexbox-item>
      </flexbox>
      <flexbox wrap="wrap" :gutter="0">
        <flexbox-item 
          v-for="(v, k) in roomNatureList" 
          :key="k" :span="1/4" class="natureItem" 
          :class="{active: item.room_attributes.indexOf(v.value) !== -1}"
          @click.native="natureFn(key, v.value)">
          {{v.label}}
        </flexbox-item>
      </flexbox>
      <cell title="房间设施" value-align="left" is-link @click.native="popClick('houseFacilitiesShow', key)">
        <cell-value :value="item.facility_items" :data="houseFacilitiesList" ></cell-value>
      </cell>
    </group>
    <flexbox :gutter="0">
      <flexbox-item class="flexBtn red" v-show="houseData.rooms.length > 1" @click.native="delRoom">
        <i class="iconfont icon-shanchu"></i>删除房间
      </flexbox-item>
      <flexbox-item class="flexBtn blue" @click.native="addRoom">
        <i class="iconfont icon-xinzeng"></i>添加房间
      </flexbox-item>
    </flexbox>
    <!-- 房间朝向 -->
    <popup-self :data="orientationsList" title="房间朝向"
      :show="orientationsShow"
      v-model="houseData.rooms[roomIndex].houseDirection"
      @closePop="closePop('orientationsShow')">
    </popup-self>
    <!-- 房间设施 -->
    <popup-self :data="houseFacilitiesList" title="房间设施（多选）"
      :show="houseFacilitiesShow"
      v-model="houseData.rooms[roomIndex].facility_items"
      :isradio="false"
      @closePop="closePop('houseFacilitiesShow')">
    </popup-self>
   
  </div>
</template>

<script>
import { XInput, Flexbox, FlexboxItem } from 'vux'
import cellValue from '@/components/cellValue'
import popupSelf from '@/components/popupSelf'
export default {
  name: 'room-info',
  components: {
    XInput,
    Flexbox, 
    FlexboxItem,
    cellValue,
    popupSelf
  },
  filters: {
    keyStr(val) {
      return `房间${String.fromCharCode(65 + parseInt(val))}`
    }
  },
  props: {
    houseData: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.orientationsList = this.$store.state.datas.orientations
    this.houseFacilitiesList = this.$store.state.datas.houseFacilities
    this.roomNatureList = this.$store.state.datas.houseNature
  },
  data() {
    return {
      labelWidth: '70px',
      roomIndex: 0,
      orientationsShow: false,
      orientationsList: [],
      orientationsValue: [],
      houseFacilitiesShow: false,
      houseFacilitiesList: [],
      houseFacilitiesValue: [],
      roomNatureList: [],
      roomData: {
        roomNo: '',
        roomArea: '',
        room_attributes: '',
        facility_items: '',
        houseDirection: ''
      }
    }
  },
  methods: {
    closePop(str) {
      this[str] = false
    },
    natureFn(key, value) {
      let nowRoom = this.houseData.rooms[key].room_attributes
      let arr = nowRoom ? nowRoom.split(',') : []
      let seat = arr.indexOf(String(value))
      seat !== -1 ? arr.splice(seat, 1) : arr.push(value)
      this.houseData.rooms[key].room_attributes = arr.join(',')
    },
    popClick(str, index) {
      this[str] = true
      this.roomIndex = index
    },
    delRoom() {
      let code = String.fromCharCode(64 + this.houseData.rooms.length)
      let tips= `确定删除房间${code}吗?`
      let self = this
      this.$vux.confirm.show({
        content: tips,
        onConfirm() {
          self.houseData.rooms.splice(self.houseData.rooms.length - 1, 1)
        }
      })

    },
    addRoom() {
      let code = String.fromCharCode(65 + this.houseData.rooms.length)
      this.roomData.roomNo = `房间${code}`
      this.houseData.rooms.push(this.roomData)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" >
  .houseItem {
    position: relative;
    .vux-flexbox-item {
      border-top: 1px solid #ddd;
    }
    .vux-flexbox-item:nth-child(odd) {
      border-right: 1px solid #ddd;
    }
    .cellHeight {
      height: 41PX;
    }
  }
  
  .flexBtn {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    font-size: 14px;
    .iconfont {
      position: relative;
      top: 2px;
      font-size: 18px;
    }
  }
  .red {
    color: red;
    border-right: 1PX solid #D9D9D9;
  }
</style>
