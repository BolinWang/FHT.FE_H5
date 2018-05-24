/*
 * @Author: chenxing 
 * @Date: 2018-05-15 11:07:11 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-05-17 09:18:37
 */

<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >   
      <x-header :title="pageTitle" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <group class="noTop" label-width="90px" label-margin-right="0" ref="userForm">
        <x-input title="姓名" v-model="userForm.name" placeholder="请输入姓名" required type="text" class="rightWarn">
          <checker slot="right" v-model="userForm.gender" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :value="1">先生</checker-item><checker-item :value="2">女士</checker-item>
          </checker>
        </x-input>
        <x-input title="手机" v-model="userForm.mobile" is-type="china-mobile" placeholder="请输入手机号" required type="number" ></x-input>
        <popup-picker
          title="来源"
          placeholder="请选择"
          value-text-align="left"
          v-model="sourceValue"
          :display-format="formatSource"
          :columns="2" 
          ref="source"
          @on-change="changeSource"
          :data="sourceList">
        </popup-picker>
        <cell :title="key === 0 ? '需求区域' : ' '" 
          is-link 
          :class="{black: typeof item === 'object'}"
          value-align="left" 
          v-for="(item, key) in userForm.guestSourceAreas" 
          :key="key"
          @click.native="addressFn(key)">
          {{[item, key] | addressFilter}}
        </cell>
        <x-address style="display:none;" 
          :list="addressData" 
          raw-value
          title="请选择城市"
          v-model="addressValue"
          @on-shadow-change="cityChange"
          @on-hide="changeAddress"
          :show.sync="showAddress"></x-address>
        <popup-picker style="display:none"
          :show="plateShow" 
          :data="plateList"
          v-model="plateValue"
          @on-hide="plateHide"></popup-picker>
        <popup-picker
          title="价格"
          :data="priceList"
          v-model="priceValue"
          placeholder="请选择价格"
          value-text-align="left"
          :display-format="formatPrice"
          @on-change="changePrice">
        </popup-picker>
        <cell title="类型" value-align="left">
          <checker v-model="userForm.type" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :value="1">整租</checker-item><checker-item :value="2">合租</checker-item>
          </checker>
        </cell>
        <cell title="需求(多选)" value-align="left" v-show="userForm.type === 2">
          <checker v-model="userForm.requirement" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :value="1">独厨</checker-item>
            <checker-item :value="2">独卫</checker-item>
          </checker>
        </cell>
        <cell title="意向度" value-align="left">
          
          <checker v-model="userForm.intentionality" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :value="1">低</checker-item><checker-item :value="2">中</checker-item><checker-item :value="3">高</checker-item>
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
import { XInput, XButton, Checker, CheckerItem, PopupPicker, XAddress, ChinaAddressV4Data, Value2nameFilter, Rater } from 'vux'
import { saveOrUpdateApi, plateApi, detailApi } from '@/api/source'
import { deepClone, valFormat } from '@/utils'

export default {
  components: {
    XButton,
    XInput,
    Checker,
    CheckerItem,
    PopupPicker,
    XAddress, 
    ChinaAddressV4Data, 
    Value2nameFilter,
    Rater
  },
  mounted() {
    this.guestSourceId = parseInt(this.$route.params.guestSourceId)
    if (this.guestSourceId !== 0) {
      this.pageTitle = '编辑客源'
      this.getData()
    }
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
      userForm: {
        name: '',
        gender: 1,
        mobile: '',
        intentionality: 2,
        source: [],
        sourceType: '',
        guestSourceAreas: ['', '', ''],
        priceMin: '',
        priceMax: '',
        type: 1,
        requirement: [1, 2]
      },
      guestSourceId: 0,
      addressId: [],
      cityName: [],
      showAddress: false,
      plateShow: false,
      sourceValue: [],
      plateList: [],
      addressIndex: 0,
      plateValue: [],
      addressData: ChinaAddressV4Data,
      addressValue: [],
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
  .positionRight {
    position: absolute;
    right: 10px;
    color: #ccc;
  }
  .genderBox {
    width: 200px;
  }
  .demo1-item {
    border: 1px solid #4680FF;
    height: 52px;
    line-height: 50px;
    text-align: center;
    width: 80px;
    font-size: 28px;
    color: #4680FF;
  }
  .demo1-item-selected {
    border:1px solid #4680FF;
    background: #4680FF;
    color:#fff;
  }
  .line {
    width: 100%;
    min-height: 80px;
    line-height: 80px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
    font-size: 0.35rem;
    background: #fff;
    position: relative;
    .labelText {
      width: 160px;
      height: 80px;
      .left;
    }
    .textArea {
      .left;
      line-height: 50px;
      padding: 15px 0;
      width: 500px;
      color: #999;
      font-size: 0.35rem;
    }
    .inputs {
      .left;
      border:none;
      background: none;
      padding: 15px 0;
      line-height: 50px;
      width: 500px;
      font-size: 0.35rem;
      &:focus{
        border: none;
        outline: none;
      }
    }
    .price {
      width: 200px;
    }
    .section {
      display: inline-block;
      .left;
      text-align: center;
      width: 60px;
    }
    .status {
      .left;
      width: 500px;
    }
  }
</style>

