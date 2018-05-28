<template>
  <div >
    <group :label-width="labelWidth" class="noTop" v-for="(item, key) in roomList" :key="key" style="margin-top: 5px">
      <div >
        <flexbox class="houseItem" wrap="wrap" :gutter="0">
          <flexbox-item :span="1/2">
            <x-input :label-width="labelWidth" :title="key | keyStr" placeholder="平方米"></x-input>
          </flexbox-item>
          <flexbox-item :span="1/2">
            <cell title="房屋朝向" class="cellHeight labelWidth" is-link @click.native="popClick('orientationsShow', key)" value-align="left">
              <cell-value :value="item.roomOrientations" :data="orientationsList"></cell-value>
            </cell>
          </flexbox-item>
        </flexbox>
        <flexbox wrap="wrap" :gutter="0">
          <flexbox-item 
            v-for="(v, k) in roomNatureList" 
            :key="k" :span="1/4" class="natureItem" 
            :class="{active: item.roomNature.indexOf(v.value) !== -1}"
            @click.native="natureFn(key, v.value)">
            {{v.label}}
          </flexbox-item>
        </flexbox>
        <cell title="房间设施" value-align="left" is-link @click.native="popClick('houseFacilitiesShow', key)">
          <cell-value :value="item.roomFacilities" :data="houseFacilitiesList" ></cell-value>
        </cell>
      </div>
    </group>
    <flexbox :gutter="0">
      <flexbox-item class="flexBtn red" v-show="roomList.length > 1" @click.native="delRoom">
        <i class="iconfont icon-shanchu"></i>删除房间
      </flexbox-item>
      <flexbox-item class="flexBtn blue" @click.native="addRoom">
        <i class="iconfont icon-xinzeng"></i>添加房间
      </flexbox-item>
    </flexbox>
    <!-- 房间朝向 -->
    <popup-self :data="orientationsList" title="房间朝向"
      :show="orientationsShow"
      v-model="roomList[roomIndex].roomOrientations" 
      @closePop="closePop('orientationsShow')">
    </popup-self>
    <!-- 房间设施 -->
    <popup-self :data="houseFacilitiesList" title="房间设施（多选）"
      :show="houseFacilitiesShow"
      v-model="roomList[roomIndex].roomFacilities" 
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
        area: '',
        roomOrientations: [],
        roomFacilities: [],
        roomNature: []
      },
      roomList: [
        {
          area: '',
          roomOrientations: [],
          roomFacilities: [],
          roomNature: []
        },
        {
          area: '',
          roomOrientations: [],
          roomFacilities: [],
          roomNature: []
        }
      ]
    }
  },
  methods: {
    closePop(str) {
      this[str] = false
    },
    natureFn(index, value) {
      let arr = this.roomList[index].roomNature
      let seat = arr.indexOf(value)
      seat !== -1 ? arr.splice(seat, 1) : arr.push(value)
    },
    popClick(str, index) {
      this[str] = true
      this.roomIndex = index
    },
    delRoom() {
      let code = String.fromCharCode(64 + this.roomList.length)
      let tips= `确定删除房间${code}吗?`
      let self = this
      this.$vux.confirm.show({
        content: tips,
        onConfirm() {
          self.roomList.splice(self.roomList.length - 1, 1)
        }
      })

    },
    addRoom() {
      this.roomList.push(this.roomData)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" >
  .natureItem {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1PX solid #D9D9D9;
    border-right: 1PX solid #D9D9D9;
    position: relative;
    &:last-child {
      border-right: none;
    }
    &:after{
      content:'\e79e';
      position: absolute;
      right: -3px;
      bottom: -7px;
      font-size: 30px;
      font-family: 'iconfont';
      color: #D9D9D9;
    }
  }
  .active {
    color: #FF9800;
    &:after {
      color: #FF9800;
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
