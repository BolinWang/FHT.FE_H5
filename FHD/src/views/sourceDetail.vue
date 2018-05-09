/*
 * @Author: chenxing 
 * @Date: 2018-04-23 17:40:16 
 * @Last Modified by: chenxing
 * @Last Modified time: 2018-05-09 17:30:47
 */
<template>
  <div>
    <sticky>
      <div class="header headDiv">
        <i class="iconfont icon-zuojiantou" @click="goBack"></i>
        <div class="headerTitle">客源详情</div>
        <div class="headRight" @click="edit">编辑</div>       
      </div>
    </sticky>
    <div class="line top10">
      <div class="labelText">姓名：</div>
      <div class="inputs">{{userForm.name}}</div>
      <div class="gender" v-show="userForm.mobile">{{userForm.gender | genderStr}}</div>
    </div>
    <div class="line" @click="callMobile(userForm.mobile)">
      <div class="labelText">手机号码：</div>
      <div class="inputs">{{userForm.mobile}}</div>
      <i class="iconfont icon-dianhua" v-show="userForm.mobile"></i>
    </div>
    <div class="line" v-for="(item, index) in userForm.guestSourceAreas" :key="index">
      <div class="labelText">{{index === 0 ? '需求区域：' : ''}}</div>
      <div class="inputs">{{item | areaStr}}</div>
      <div class="clear"></div>
    </div>
    <div class="line">
      <div class="labelText">来源：</div>
      <div class="inputs">{{userForm | listStatus}}</div>
    </div>
    <div class="line">
      <div class="labelText">价格：</div>
      <div class="inputs">{{userForm | priceStatus}}</div>
    </div>
    <div class="line">
      <div class="labelText">类型：</div>
      <div class="inputs">{{userForm.type | typeStatus}}</div>
    </div>
    <div class="line" v-if="userForm.type === 2">
      <div class="labelText">要求：</div>
      <div class="inputs">{{userForm.requirement | requireStatus}}</div>
    </div>
    <div class="line">
      <div class="labelText">意向度：</div>
      <div class="inputs">{{userForm.intentionality | statusStr}}</div>
    </div>
    <div class="center">跟进记录</div>
    <ul class="statusList">
      <li v-for="(item, key) in followInfos" :key="key">
        <div>
          <div class="statusText">{{item | followStr}}</div>
          <div class="statusUser">{{item.userName || '未知操作人'}}</div>
          <div class="statusTime">{{item.followDate}}</div>
        </div>
        <div class="desc" v-if="item.remark">备注：{{item.remark}}</div>
      </li>
      <div class="clear"></div>
    </ul>
    <div class="fixedBottm" v-show="fixedFlag">
      <button type="button" class="btn" @click="changeStatus">跟进</button>
    </div>
  </div>
</template>

<script>
import { Sticky, ButtonTab, ButtonTabItem, Toast } from 'vux'
import { detailApi } from '@/api/source'

export default {
  components: {
    Sticky,
    ButtonTab,
    ButtonTabItem,
    Toast
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
    this.sessionId = localStorage.getItem('sessionId')
    this.getDetail()
  },
  filters: {
    genderStr(val) {
      const gender = ['先生', '女士']
      return val ? gender[val - 1] : '先生'
    },
    statusStr(val) {
      const status = ['低', '中', '高']
      return val ? status[val - 1] : '中'
    },
    priceStatus(val) {
      let str = ''
      if (val.priceMin && val.priceMax) {
        str = `${val.priceMin}元 - ${val.priceMax}元`
      } else if (val.priceMin) {
        str = `${val.priceMin}元以下`
      } else if (val.priceMax) {
        str = `${val.priceMax}元以上`
      }else {
        str = '不限'
      }
      return str
    },
    typeStatus(val) {
      const status = ['整租', '合租']
      return val ? status[val - 1] : ''
    },
    requireStatus(val) {
      const status = ['', '独厨', '独卫']
      const valList = val ? val.split(',') : []
      let arr = []
      valList.map(v => {
        arr.push(status[v])
      })
      return arr.join(',')
    },
    listStatus(val) {
      const online = ['', '闲鱼', '58个人', '58企业', '赶集', '安居客', '网络搜索', '社交媒体（论坛、豆瓣等）', '麦邻生活', '官方微信', '其他渠道']
      const offline = ['', '蹲点截客', '企业客户', '小广告', '老客推荐']
      let str = ''
      if (val.source === 1) {
        str = '网络 - ' + (online[val.sourceType] || '')
      } else {
        str = '线下 - ' + (offline[val.sourceType] || '')
      }
      return str
    },
    areaStr(item) {
      let str = ''
      str = (item.zoneId ? (item.zoneName + ' - ') : '') + `${item.provinceName}${item.cityName}${item.regionName}`
      return str
    },
    followStr(item) {
      let str = ''
      const status = ['', '电话跟进', '带看中', '结束带看']
      if (item.mode === 0) {
        str = '新增'
      } else if (item.mode === 3 && item.modeType === 2) {
        str = '已签约'
      } else {
        str = status[item.mode]
      }
      return str
    }
  },
  data() {
    return {
      userForm: {
        name: '',
        gender: 1,
        mobile: '',
        intentionality: 2,
        source: '',
        sourceType: ''
      },
      fixedFlag: true,
      sessionId: '',
      followInfos: []
    }
  },
  methods: {
    getDetail() {
      let param = {
        guestSourceId: parseInt(this.$route.params.guestSourceId)
      }
      detailApi(param).then(res => {
        if (res.data && typeof res.data === 'object') {
          this.userForm = Object.assign(this.userForm, res.data)
          this.followInfos = res.data.followInfos
        }
      }).catch(res => {
        this.$vux.toast.text(res.message)
      })
    },
    callMobile(mobile) {
      if (mobile) {
        window.call.callAction(mobile)
      }
    },
    goBack() {
      this.$router.push({name: 'sourceList', params: {sessionId: this.sessionId}})
    },
    edit() {
      this.$router.push({name: 'addSource', params: {guestSourceId: this.$route.params.guestSourceId}})
    },
    changeStatus() {
      this.$router.push({name: 'sourceFollow', params: {guestSourceId: this.$route.params.guestSourceId}})
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  * {
    box-sizing: border-box;
  }
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
  .top10 {
    margin-top: 10px;
  }
  .center {
    text-align: center;
    line-height: 70px;
    border-top:1px solid #ddd;
    font-size: 0.4rem;
    color: #666;
  }
  .gender {
    padding: 0px 10px;
    color: #fff;
    background: #4680FF;
    position: absolute;
    line-height: 40px;
    font-size: 0.3rem;
    top: 8px;
    left:350px;
  }
  .clear {
    clear: both;
  }
  ul.statusList {
    width: 100%;
    margin-bottom: 100px;
    li {
      .left;
      width: 100%;
      margin-bottom: 15px;
      background: #fff;
      padding: 20px 0;
      line-height: 30px;
      min-height: 30px;
      text-align: center;
      .statusText {
        width: 3rem;
        border-right: 1px solid #ccc;
        text-align: left;
        padding-left: 20px;
        .left;
      }
      .statusUser {
        width: 2.5rem;
        .left;
        border-right: 1px solid #ccc;
      }
      .statusTime {
        .left;
        width: 4.5rem;
      }
      .desc {
        width: 100%;
        text-align: left;
        padding-top: 20px;
        line-height: 40px;
        color: #666;
        .left;
        padding-left: 20px;
      }
    }
  }
  .line {
    width: 100%;
    min-height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
    font-size: 0.35rem;
    position: relative;
    .labelText {
      width: 160px;
      height: 60px;
      text-align: right;
      padding-right: 10px;
      .left;
    }
    .icon-dianhua {
      color:rgb(56, 224, 40);
      left: 380px;
      top:0;
      position: absolute;
    }
    .inputs {
      .left;
      border:none;
      background: none;
      padding: 15px 0;
      line-height: 30px;
      width: 500px;
      font-size: 0.35rem;
    }
  }
</style>
