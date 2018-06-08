/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-06-08 14:55:04
 */
<template>
  <div>
    <sticky>
      <div class="header headDiv">
        <i class="iconfont icon-zuojiantou" @click="goBack"></i>
        <div class="headerTitle">客源跟进</div>       
      </div>
    </sticky>
    
    <div class="line" @click="showPlugin">
      <div class="labelText">跟进时间</div>
      <div class="textArea" :class="{black: userForm.followDate}">{{userForm.followDate | timeStr}}</div>
    </div>
    <div class="line" @click="followShow = true">
      <div class="labelText">跟进类型</div>
      <div class="textArea" :class="{black: typeValue.length > 0}">{{typeValue | typeFilter}}</div>
      <div class="positionRight">
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <popup-picker style="display:none"
        :show="followShow" 
        :columns="2"
        v-model="typeValue"
        :data="list"
        @on-hide="followHide">
      </popup-picker>
    </div>
    <div class="line" @click="showSearch = true" v-if="searchFlag">
      <div class="labelText">带看房源</div>
      <div class="textArea ellipsis" :class="{black: nameStr}">{{nameStr | houseStr}}</div>
      <div class="positionRight">
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showSearch" 
        position="right"
        @on-hide="searchHide">
        <div class="searchBox">
          <div class="searchDiv">
            <search 
              :auto-fixed="false" 
              v-model="keyword" 
              placeholder="搜索房源"
              @on-change="debounceSearch" 
              @on-submit="searchParam">
            </search>
            <ul class="searchNav">
              <li class="ellipsis
              " v-for="(item, index) in searchList"
                :key=index
                @click="chooseHouse(item)">
                {{item.city}}-{{item.name}}
              </li>
              <li class="textCenter" v-show="noData">未查询到数据</li>
            </ul>
          </div>
        </div>
      </popup>
    </div>
    <div class="line descWidth">
      <x-textarea title="备注" :max="100" v-model="userForm.remark" placeholder="请输入备注" :height="20" :rows="1" autosize></x-textarea>
    </div>
    <div class="fixedBottm" v-show="fixedFlag">
      <button type="button" class="btn" @click="saveData">完成</button>
    </div>
  </div>
</template>

<script>
import { Sticky, PopupPicker, Group, Popup, TransferDom, Search, XTextarea, dateFormat, debounce } from 'vux'
import { houseApi, saveFollowInfoApi } from '@/api/source'
import { deepClone } from '@/utils'
export default {
  name: 'source-follow',
  directives: {
    TransferDom
  },
  components: {
    Sticky,
    PopupPicker,
    Popup,
    Group,
    XTextarea,
    Search
  },
  mounted() {
    window['backUrl'] = () => {
      this.goBack()
      return 'true'
    }
    const bodyHeight = document.body.clientHeight
    window.onresize = () => {
      let newHeight = document.body.clientHeight
      if (bodyHeight > newHeight) {
        this.fixedFlag = false
      } else {
        this.fixedFlag = true
      }
    }
    this.userForm.followDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
    this.guestSourceId = parseInt(this.$route.params.guestSourceId)
  },
  filters: {
    typeFilter(val) {
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
    timeStr(val) {
      return val || '请选择时间'
    },
    houseStr(val) {
      return val || '请选择带看房源'
    }
  },
  data() {
    return {
      userForm: {
        followDate: '',
        mode: '',
        modeType: '',
        remark: ''
      },
      noData: false,
      fixedFlag: true,
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
      list: [
        {
          name: '电话',
          value: '1',
          parent: 0
        },
        {
          name: '带看',
          value: '2',
          parent: 0
        },
        {
          name: '结束带看',
          value: '3',
          parent: 0
        },
        {
          name: '意向中',
          value: '1',
          parent: '1'
        },
        {
          name: '约带看',
          value: '2',
          parent: '1'
        },
        {
          name: '已签约',
          value: '3',
          parent: '1'
        },
        {
          name: '无效',
          value: '4',
          parent: '1'
        },
        {
          name: '带看中',
          value: '1',
          parent: '2'
        },
        {
          name: '未签约',
          value: '1',
          parent: '3'
        },
        {
          name: '已签约',
          value: '2',
          parent: '3'
        }
      ]
    }
  },
  methods: {
    showPlugin() {
      let self = this.userForm
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH:mm',
        yearRow: '{value}年',
        monthRow: '{value}月',
        dayRow: '{value}日',
        hourRow: '{value}时',
        minuteRow: '{value}分',
        onConfirm(val) {
          self.followDate = val
        }
      })
    },
    searchHide() {
      this.searchList = []
      this.keyword = ''
      this.noData = false
    },
    debounceSearch: debounce(function(){
      this.searchParam()
    }, 500),
    searchParam(val) {
      if (this.keyword === ''){
        this.searchList = []
        return false
      }
      const param = {
        pageSize: 10,
        pageNo: 1,
        tags: ['fhd'],
        keyword: this.keyword
      }
      houseApi(param).then(res => {
        if (res.result && res.result.length > 0) {
          this.searchList = deepClone(res.result)
          this.noData = false
        } else {
          this.noData = true
          this.searchList = []
        }
      }).catch(res => {})
    },
    goBack() {
      this.$router.push({name: 'sourceDetail', params: {guestSourceId: this.guestSourceId}})
    },
    chooseHouse(item) {
      this.nameStr = item.name
      this.roomName = item.roomName
      this.roomCode = item.roomCode
      this.showSearch = false
    },
    followHide(flag) {
      this.followShow = false
      if (flag) {
        if (this.typeValue[0] === '3') {
          this.searchFlag = true
        } else {
          this.searchFlag = false
        }
      }
    },
    msg(val) {
      this.$vux.toast.text(val)
    },
    saveData() {
      let param = deepClone(this.userForm)
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
    right: 5px;
    color: #ccc;
  }
  .genderBox {
    width: 100px;
    top: 5px;
  }
  .textCenter {
    text-align: center;
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
    float: left;
    .weui-cell {
      line-height: 20px;
      padding-left: 0;
    }
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
    .heightAuto {
      // height: auto;
      // min-height: 80px;
      padding: 2px;
      height: 40px;
      line-height: 35px;
      // overflow-y:visible;
      resize: none;
    }
    .status {
      .left;
      width: 250px;
      margin-top: 5px;
    }
  }
  .searchBox {
    width: 295px;
    .searchNav {
      width: 100%;
      padding: 10px;
      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        .left;
      }
    }
  }
  .clear{
    clear: both;
  }
</style>
