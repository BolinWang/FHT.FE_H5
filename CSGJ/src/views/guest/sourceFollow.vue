/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-13 15:39:53
 */
<template>
  <div class="height100">
    <view-box ref="viewBox" body-padding-top="46px" >
      <x-header 
      title="新增跟进" 
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      </x-header>
      <group class="noTop" label-width="90px">
        <datetime
          v-model="userForm.followDate"
          format="YYYY-MM-DD HH:mm"
          year-row="{value}年"
          month-row="{value}月"
          day-row="{value}日"
          hour-row="{value}时"
          minute-row="{value}分"
          value-text-align="left"
          placeholder="请选择时间"
          title="跟进时间">
        </datetime>
        <popup-picker
          title="跟进方式"
          placeholder="请选择"
          value-text-align="left"
          v-model="typeValue"
          show-name
          :columns="1" 
          ref="source"
          :data="followList">
        </popup-picker>
        <x-textarea title="备注" v-model="userForm.remark" placeholder="请输入备注" :height="20" :rows="1" autosize></x-textarea>
      </group>
      <div slot="bottom" class="bottomDiv">
        <x-button type="primary" action-type="button" @click.native="saveData">确定</x-button>
      </div>
    </view-box>
    
  </div>
</template>

<script>
import {  PopupPicker, XTextarea, dateFormat, XButton, Datetime } from 'vux'
import { houseApi, saveFollowInfoApi } from '@/api/source'
import { deepClone } from '@/utils'
export default {
  name: 'source-follow',
  components: {
    PopupPicker,
    XTextarea,
    XButton,
    Datetime
  },
  created() {
    window['backUrl'] = () => {
      this.goBack()
      return 'true'
    }
    this.userForm.followDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
    this.guestSourceId = parseInt(this.$route.params.guestSourceId)
  },
  data() {
    return {
      userForm: {
        followDate: '',
        mode: '',
        modeType: '',
        remark: ''
      },
      dateVal: [],
      noData: false,
      keyword: '',
      searchFlag: false,
      showSearch: false,
      timeShow: false,
      followShow: false,
      guestSourceId: 0,
      nameStr: '',
      roomName: '',
      roomCode: '',
      typeValue: [],
      searchList: [],
      followList: [{
        name: '接待',
        value: '1'
      },{
        name: '电话',
        value: '2'
      },{
        name: '网络联系',
        value: '3'
      }]
    }
  },
  methods: {
    formatList(val) {
      let str = ''
      const leftArr = ['', '电话 - ', '带看 - ', '结束带看 - ']
      const sourceArr = {
        1: ['', '意向中', '约带看', '已签约', '无效'],
        2: ['', '带看中'],
        3: ['', '未签约', '已签约']
      }
      if (val.length === 0) {
        str = '请选择跟进类型'
      } else {
        str = leftArr[val[0]] + sourceArr[val[0]][val[1]]
      }
      return str
    },
    goBack() {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: this.guestSourceId}})
    },
    msg(val) {
      this.$vux.toast.text(val)
    },
    saveData() {
      let param = deepClone(this.userForm)
      console.log(param)
      return
      if (param.followDate === '') {
        this.msg('请选择时间')
        return false
      }
      if (this.typeValue.length === 0) {
        this.msg('请选择跟进类型')
        return false
      }
      if (this.typeValue[0] === '3') {
        if (this.roomCode === '') {
          this.msg('请选择带看房源')
          return false
        } else {
          param.roomCode = this.roomCode
          param.roomName = this.roomName
        }
      }
      param.mode = this.typeValue[0]
      param.modeType = this.typeValue[1]
      param.guestSourceId = this.guestSourceId
      saveFollowInfoApi(param).then(res => {
        this.goBack()
      }).catch(res => {
        this.msg(res.message)
      })
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
    top:10px;
  }
  .textCenter {
    text-align: center;
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
    .weui-cell {
      line-height: 40px;
      padding-left: 0;
    }
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
    .heightAuto {
      padding: 5px;
      height: 80px;
      line-height: 70px;
      resize: none;
    }
    .status {
      .left;
      width: 500px;
      margin-top: 10px;
    }
  }
  .searchBox {
    width: 590px;
    .searchNav {
      width: 100%;
      padding: 20px 20px;
      li {
        width: 100%;
        height: 80px;
        line-height: 80px;
        .left;
      }
    }
  }
  .clear{
    clear: both;
  }
</style>
