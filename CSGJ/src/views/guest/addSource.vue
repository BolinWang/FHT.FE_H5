/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-13 15:50:23
 */

<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >   
      <x-header :title="pageTitle" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <group class="noTop" label-width="80px" label-margin-right="0" ref="userForm">
        <x-input title="姓名" v-model="userForm.name" placeholder="请输入姓名" required type="text" class="rightWarn">
          <checker slot="right" v-model="userForm.gender" default-item-class="demo1-item" :radio-required="true" selected-item-class="demo1-item-selected">
            <checker-item :value="1">先生</checker-item><checker-item :value="2">女士</checker-item>
          </checker>
        </x-input>
        <x-input title="手机号码" v-model="userForm.mobile" is-type="china-mobile" placeholder="请输入手机号" required type="number" ></x-input>
        <popup-picker
          title="客户来源"
          placeholder="请选择"
          value-text-align="left"
          v-model="sourceValue"
          :display-format="formatSource"
          :columns="2" 
          ref="source"
          @on-change="changeSource"
          :data="sourceList">
        </popup-picker>
        <div class="relative borderTop" v-for="(item, index) in userForm.guestSourceAreas" :key="index">
          <popup-picker 
            :title="`位置需求(${index + 1})`" 
            :data="addressList"
            v-model="item.id"
            placeholder="请选择区域板块"
            value-text-align="left"
            show-name
            @on-hide="hideSource"
            :columns="3">
          </popup-picker>
          <div v-show="item.id.length > 0" class="delSource" @click="delSource(index)">删除</div>
        </div>
        
        <popup-picker
          title="月租金范围"
          :data="priceList"
          v-model="priceValue"
          placeholder="请选择价格"
          value-text-align="left"
          :display-format="formatPrice"
          @on-change="changePrice">
        </popup-picker>
        <popup-picker
          title="房源类型"
          placeholder="请选择"
          value-text-align="left"
          v-model="houseTypeValue"
          :columns="1"
          show-name
          :data="houseTypeList">
        </popup-picker>
        <div v-show="houseTypeValue[0] === '2'">
          <flexbox wrap="wrap" :gutter="0">
            <flexbox-item 
              v-for="(v, k) in roomNatureList" 
              :key="k" :span="1/4" class="natureItem" 
              :class="{active: userForm.requirement.indexOf(v.value) !== -1}"
              @click.native="natureFn(v.value)">
              {{v.label}}
            </flexbox-item>
          </flexbox>
        </div>
        
        <cell title="意向度" value-align="left">
          <checker v-model="userForm.intentionality" default-item-class="intentionality-item" selected-item-class="intentionality-item-selected" :radio-required="true">
            <checker-item :value="1">低</checker-item>
            <checker-item :value="2">中</checker-item>
            <checker-item :value="3">高</checker-item>
          </checker>
        </cell>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button  type="primary" action-type="button" @click.native="saveData">确定</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import { XInput, XButton, Checker, CheckerItem, PopupPicker, Flexbox, FlexboxItem, ChinaAddressV4Data } from 'vux'
import cellValue from '@/components/cellValue'
import { saveOrUpdateApi, plateApi, detailApi } from '@/api/source'
import { deepClone, valFormat } from '@/utils'

export default {
  name: 'add-source',
  components: {
    XButton,
    XInput,
    Checker,
    CheckerItem,
    PopupPicker,
    Flexbox, 
    FlexboxItem,
    cellValue
  },
  mounted() {
    this.guestSourceId = parseInt(this.$route.params.guestSourceId)
    if (this.guestSourceId !== 0) {
      this.pageTitle = '编辑客源'
      // this.getData()
    }
    this.roomNatureList = this.$store.state.datas.houseNature
  },
  filters: {
    addressFilter([item, index]) {
      let str = ''
      if (item) {
        str = `${item.zoneId ? item.zoneName + ' - ' : ''}${item.provinceName}${item.cityName}${item.regionName}`
      } else {
        switch (index) {
          case 0:
            str = '需求区域1'
            break
          case 1:
            str = '需求区域2（非必须）'
            break
          case 2:
            str = '需求区域3（非必须）'
            break
        }
      }
      return str
    }
  },
  data() {
    return {
      pageTitle: '新增客源',
      roomNatureList: [],
      userForm: {
        name: '',
        gender: 1,
        mobile: '',
        intentionality: 2,
        source: [],
        sourceType: '',
        guestSourceAreas: [{
          id: []
        }],
        priceMin: '',
        priceMax: '',
        type: 1,
        requirement: []
      },
      addressList: ChinaAddressV4Data,
      houseTypeValue: ['2'],
      houseTypeList: [
        {name: '整租', value: '1'},
        {name: '合租', value: '2'},
      ],
      guestSourceId: 0,
      sourceValue: [],
      priceValue: [],
      sourceList: [
        {
          name: '网络',
          value: '1',
          parent: 0
        }, {
          name: '线下',
          value: '2',
          parent: 0
        }, {
          name: '闲鱼',
          value: '1',
          parent: '1'
        }, {
          name: '58个人',
          value: '2',
          parent: '1'
        }, {
          name: '58企业',
          value: '3',
          parent: '1'
        }, {
          name: '赶集',
          value: '4',
          parent: '1'
        }, {
          name: '安居客',
          value: '5',
          parent: '1'
        }, {
          name: '网络搜索',
          value: '6',
          parent: '1'
        }, {
          name: '社交媒体(论坛、豆瓣等)',
          value: '7',
          parent: '1'
        }, {
          name: '麦邻生活',
          value: '8',
          parent: '1'
        }, {
          name: '官方微信',
          value: '9',
          parent: '1'
        }, {
          name: '其他渠道',
          value: '10',
          parent: '1'
        }, {
          name: '蹲点截客',
          value: '1',
          parent: '2'
        }, {
          name: '企业客户',
          value: '2',
          parent: '2'
        }, {
          name: '小广告',
          value: '3',
          parent: '2'
        }, {
          name: '老客推荐',
          value: '4',
          parent: '2'
        }
      ],
      priceList: [
        [{
          value: '0',
          name: '不限'
        },{
          value: '1500',
          name: '1500元以下'
        },{
          value: '1500,2000',
          name: '1500-2000元'
        },{
          value: '2000,3000',
          name: '2000-3000元'
        },{
          value: '3000,4000',
          name: '3000-4000元'
        },{
          value: '4000,5000',
          name: '4000-5000元'
        },{
          value: '5000',
          name: '5000元以上'
        }]
      ]
    }
  },
  methods: {
    getData() { //获取编辑的数据
      let param = {
        guestSourceId: this.guestSourceId
      }
      detailApi(param).then(res => {
        let resData = res.data
        if (resData && typeof resData === 'object') {
          this.userForm = Object.assign(this.userForm, resData)
          let length = this.userForm.guestSourceAreas.length
          if (length !== 3) { // 保证需求区域遍历的时候一直会有三个
            for (let i = 0; i < 3 - length; i++) {
              this.userForm.guestSourceAreas.push('')
            }
          }
          this.sourceValue = [String(resData.source), String(resData.sourceType)]
          let priceArr = []
          if (resData.priceMin) {
            priceArr.push(resData.priceMin)
          }
          if (resData.priceMax) {
            priceArr.push(resData.priceMax)
          }
          this.priceValue = [priceArr.join(',')]
          this.userForm.requirement = resData.requirement.split(',')
          this.userForm.requirement = this.userForm.requirement.map(v => {
            return parseInt(v)
          })
        }
      }).catch(res => {})
    },
    delSource(index) {
      this.userForm.guestSourceAreas[index].id = []
    },
    hideSource(closeType) {
      if (closeType && this.userForm.guestSourceAreas.length < 3) {
        this.userForm.guestSourceAreas.push({id: []})
      }
    },
    natureFn(value) {
      let start = this.userForm.requirement.indexOf(value)
      start > -1 ? this.userForm.requirement.splice(start, 1) : this.userForm.requirement.push(value)
    },
    formatSource(val) {
      let str = ''
      const sourceArr = {
        1: ['', '闲鱼', '58个人', '58企业', '赶集', '安居客', '网络搜索', '社交媒体（论坛、豆瓣等）', '麦邻生活', '官方微信', '其他渠道'],
        2: ['', '蹲点截客', '企业客户', '小广告', '老客推荐']
      }
      if (val.length === 0) {
        str = '请选择来源渠道'
      } else {
        str = (val[0] === '1' ? '网络 - ' : '线下 - ') + sourceArr[val[0]][val[1]]
      }
      return str
    },
    changeSource(val) {
      this.userForm.source = val[0]
      this.userForm.sourceType = val[1]
    },
    //需求区域
    cityChange(key, name) {
      this.addressId = key
      this.cityName = name
    },
    changeAddress(flag) {
      if (flag) {
        const param = {
          regionId: parseInt(this.addressId[2])
        }
        plateApi(param).then(res => {
          if (res.data && JSON.stringify(res.data) !== '{}') {
            let plateArr = []
            for (let i in res.data) {
              const arr = res.data[i]
              arr.map(item => {
                plateArr.push({name: item.zoneName, value: item.zoneId})
              })
            }
            this.plateList = [deepClone(plateArr)]
            this.plateShow = true
          } else {
            this.addAddress(false)
          }
        }).catch(res => {})
      }
    },
    addressFn(index) {
      this.showAddress = true
      this.addressIndex = index
      let ids = this.userForm.guestSourceAreas[index]
      if (typeof ids === 'object') {
        this.addressValue = [String(ids.provinceId), String(ids.cityId), String(ids.regionId)]
      }
    },
    addAddress(flag) { // flag为ture时有板块 false没有
      let cityInfo = {
        provinceId: this.addressId[0],
        cityId: this.addressId[1],
        regionId: this.addressId[2],
        provinceName: this.cityName[0],
        cityName: this.cityName[1],
        regionName: this.cityName[2],
      }
      if (flag) {
        this.plateList[0].map(key => {
          if (key.value == this.plateValue[0]) {
            cityInfo.zoneId = key.value
            cityInfo.zoneName = key.name
            return false
          }
        })
      }
      let copyList = deepClone(this.userForm.guestSourceAreas)
      let nowArea = copyList[this.addressIndex]
      if (nowArea.id) {
        cityInfo.id = nowArea.id
      }
      copyList[this.addressIndex] = deepClone(cityInfo)
      this.userForm.guestSourceAreas = deepClone(copyList)
    },
    plateHide(flag) {
      this.plateShow = false
      if (flag) {
        this.addAddress(true)
      }
    },
    changePrice(val){
      this.userForm.priceMin = ''
      this.userForm.priceMax = ''
      let price = val[0].split(',')
      if (price.length > 1) {
        this.userForm.priceMin = price[0]
        this.userForm.priceMax = price[1]
      } else if (price[0] === '0'){
        
      } else {
        price[0] === '5000' ? this.userForm.priceMax = price[0] :  this.userForm.priceMin = price[0]
      }
    },
    formatPrice(val) {
      let str = ''
      if (val.length === 0) {
        str = '不限'
      } else {
        let price = val[0].split(',')
        if (price.length > 1) {
          str = `${price[0]}元-${price[1]}元`
        } else if(price[0] === '5000') {
          str = price[0] + '元以上'
        } else if(price[0] === '1500') {
          str = price[0] + '元以下'
        } else {
          str = '不限'
        }
      }
      return str
    },
    saveData() {
      let paramData = deepClone(this.userForm)
      if (paramData.name === '') {
        this.$vux.toast.text('请输入姓名')
        return false
      }
      if (paramData.mobile === '') {
        this.$vux.toast.text('请输入手机号')
        return false
      }
      if (this.sourceValue.length === 0) {
        this.$vux.toast.text('请选择来源渠道')
        return false
      }
      if (this.guestSourceId !== 0) {
        paramData.guestSourceId = this.guestSourceId
      }
      
      // 为后台做数据处理
      paramData.source = parseInt(paramData.source)
      paramData.priceMin = parseFloat(paramData.priceMin)
      paramData.priceMax = parseFloat(paramData.priceMax)
      // 合租时将要求转为字符串
      paramData.requirement = paramData.type === 2 ?  paramData.requirement.join(',') : null
      paramData.sourceType = parseInt(paramData.sourceType)
      let arr = []
      paramData.guestSourceAreas.map(val => {
        if (val) {
          // 他只要int的
          val.provinceId = parseInt(val.provinceId)
          val.cityId = parseInt(val.cityId)
          val.regionId = parseInt(val.regionId)
          arr.push(val)
        }
      })
      paramData.guestSourceAreas = arr
      saveOrUpdateApi(paramData).then(res => {
        if (this.guestSourceId !== 0) {
          this.$router.push({name: 'sourceDetail', params: {guestSourceId: this.guestSourceId}})
        } else {
          this.$router.push({name: 'sourceList'})
        }
      }).catch(res => {})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .relative {
    position: relative;
  }
  .borderTop {
    border-top: 1px solid #D9D9D9;
  }
  .delSource {
    position: absolute;
    width: 40px;
    height: 24px;
    text-align: center;
    line-height: 23px;
    border-radius: 4px;
    border: 1px solid #E51C23;
    color: #E51C23;
    background: #fff;
    right: 12px;
    top: 6px;
  }
  .positionRight {
    position: absolute;
    right: 10px;
    color: #ccc;
  }
  .genderBox {
    width: 100px;
  }
  .natureItem {
    border-bottom: none;
  }
  .demo1-item {
    width: 36px;
    height: 23px;
    line-height: 22px;
    font-size: 12px;
    text-align: center;
    background: #fff;
    color: #4680FF;
    border: 1px solid #4680FF;
  }
  .demo1-item-selected {
    color: #fff;
    background: #4680FF;
  }
  .intentionality-item {
    border: 1px solid #4680FF;
    height: 24px;
    line-height: 23px;
    text-align: center;
    width: 70px;
    font-size: 12px;
    color: #4680FF;
    border-radius: 4px;
  }
  .intentionality-item-selected {
    border:1px solid #4680FF;
    background: #4680FF;
    color:#fff;
  }
  .line {
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
    font-size: 0.35rem;
    background: #fff;
    position: relative;
    .labelText {
      width: 80px;
      height: 40px;
      .left;
    }
    .textArea {
      .left;
      line-height: 25px;
      padding: 8px 0;
      width: 250px;
      color: #999;
      font-size: 0.35rem;
    }
    .inputs {
      .left;
      border:none;
      background: none;
      padding: 8px 0;
      line-height: 25px;
      width: 250px;
      font-size: 0.35rem;
      &:focus{
        border: none;
        outline: none;
      }
    }
    .price {
      width: 100px;
    }
    .section {
      display: inline-block;
      .left;
      text-align: center;
      width: 30px;
    }
    .status {
      .left;
      width: 250px;
    }
  }
</style>

