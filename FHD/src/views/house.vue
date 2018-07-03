/*
 * @Author: chenxing
 * @Date: 2018-04-23 17:40:16
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-07-03 15:10:29
 */
<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <div class="searchHead" slot="header">
        <div class="search" @click="toSearch">
          小区/公寓/房东/房东手机号码
        </div>
      </div>
      <div v-transfer-dom>
        <loading :show="showLoading" text="数据加载中"></loading>
      </div>
      <div class="resultScroll">
        <scroll :data="houseList" ref="scroll" @pullingUp="moreData" @pullingDown="refreshData">
          <ul class="houseNav">
            <li v-for="(item, index) in houseList" :key="index" @click="toHouse(item)">
              <div class="blue">
                <span v-if="item.housingType === 1" class="houseTypeSpan">集</span>
                {{item.estateName}}
              </div>
              <div class="rightIcon">
								<span style="display:inline-block" @click.stop="callMobile(item.orgAdminMobile)">{{item.orgAdminName}} {{item.orgAdminMobile | mobileStr}}
									<i class="iconfont icon-dianhua blue"></i>
								</span>
							</div>
              <div>共{{item.totalRoomCount}}间，空房{{item.vacantRoomCount}}间</div>
            </li>
          </ul>
        </scroll>
      </div>
      <footers :selectedIndex="1" slot="bottom"></footers>
    </view-box>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import footers from '@/components/footer'
import { search } from '@/api/source'
import { plusXing } from '@/utils'
import scroll from '@/components/scroll'
import axios from 'axios'
const leiUrl = process.env.ENV_CONFIG === 'dev' ? 'test-flying-api' : 'flying-api'
export default {
  name: 'house',
  directives: {
    TransferDom
  },
  components: {
    Loading,
    footers,
    scroll
  },
  filters: {
    mobileStr(val) {
      return val ? plusXing(val, 3, 4) : ''
    }
  },
  created() {
    this.getArea().then(res => {
      this.getData()
    }).catch(rej => {
      this.$vux.toast.text('获取区域失败')
    })
    window['backUrl'] = () => {
      return 'false'
    }
  },
  data() {
    return {
      houseList: [],
      pageNo: 1,
      showLoading: false,
      areaList: []
    }
  },
  methods: {
    toSearch() {
      this.$router.push({name: 'searchHouse'})
    },
    getArea() {
      return new Promise((resolve, reject) => {
        const userData = JSON.parse(localStorage.getItem('userData')) || {}
        axios({
          url: `https://${leiUrl}.mdguanjia.com/api/user/queryManageArea`,
          method: 'post',
          data: {
            sessionId: userData.sessionId
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.success && res.data.data.length > 0) {
            res.data.data.map(val => {
              this.areaList.push(val.areaId)
            })
            localStorage.setItem('areaData', JSON.stringify(res.data.data))
          }
          resolve(res)
        }).catch(req => {
          reject(req)
        })
      })
    },
    getData() {
      this.showLoading = true
      let param = {
        pageNo: this.pageNo,
        pageSize: 20,
        regionIds: this.areaList
      }
      search(param).then(res => {
        this.showLoading = false
        if (this.pageNo === 1) {
          this.houseList = res.result || []
        } else {
          if (res.result && res.result.length > 0) {
            this.houseList = this.houseList.concat(res.result)
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }
      }).catch(rep => {
        this.showLoading = false
      })
    },
    moreData(){
      this.pageNo++
      this.getData()
    },
    refreshData() {
      this.pageNo = 1
      this.getData()
		},
		callMobile(mobile) {
      if (mobile && window.call) {
        window.call.callAction(mobile)
      }
    },
    toHouse(item) {
      if (window.HouseResouse) { //安卓方法
        window.HouseResouse.gotoRoomList(JSON.stringify(item))
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .resultScroll {
    height: 540px;
  }
  .houseNav {
    li {
      width: 100%;
      height: 78px;
      background: #fff;
      margin-bottom: 1px;
      padding: 3px 12px;
      color: #666;
      line-height: 24px;
      .blue {
        font-size: 14px;
        font-weight: 700;
      }
      .houseTypeSpan {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 18px;
        color: #FF9800;
        display: inline-block;
        font-size: 12px;
        border: 1px solid #FF9800;
        border-radius: 4px;
        margin-right: 10px;
        position: relative;
        top: -2px;
      }
    }
  }
  .searchHead {
    width: 100%;
    height: 46PX;
    padding: 0px 40PX;
    padding-top: 10PX;
    background: #4680FF;
    position: absolute;
    top: 0;
    z-index: 2;
  }
  .search {
    width: 100%;
    height: 30PX;
    line-height: 30PX;
    border-radius: 5px;
    background-color: rgba(112, 161, 255, 1);
    text-align: center;
    position: relative;
    top: -2px;
    font-size: 12px;
    color: #eee;
    display: inline-block;
  }
</style>
