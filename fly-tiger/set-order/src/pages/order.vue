<template>
    <div class="mj-container">
        <mt-navbar v-model="selected" v-show="roomList.length">
            <mt-tab-item id="room-list" v-show="roomList.length">精选房源</mt-tab-item>
            <mt-tab-item id="appointment">看房行程</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class="room-list">
            <mt-tab-container-item id="room-list" class="roomList-container">
                <div class="roomList-item-box" 
                    v-for="(item,index) in roomList"
                    :key="index">
                    <router-link :to="{name: 'room-detail',query:{roomId: item.roomInfoFormat.id, type: item.roomInfoFormat.type}}" class="roomList-item">
                        <div class="room-pic">
                            <img alt="" :src="item.roomInfoFormat.imageUrl">
                        </div>
                        <div class="room-info">
                            <div class="room-name">{{item.roomInfoFormat.name}}</div>
                            <div class="room-layout">{{item.roomInfoFormat.roomArea}}起 | {{item.roomInfoFormat.houseType}} | {{item.roomInfoFormat.decorationDegree}}</div>
                            <div class="room-price">{{item.roomInfoFormat.minRentPrice}}元/月起</div>
                            <div class="room-address">
                                <div class="room-address-text">
                                    {{item.roomInfoFormat.address}}
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <label class="mint-checklist-label">
                        <span class="mint-checkbox">
                            <input type="checkbox" class="mint-checkbox-input" v-model="item.isChecked">
                            <span class="mint-checkbox-core"></span>
                        </span>
                    </label>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="appointment">
              <div
                v-for="(item, index) in journeyList">
                <div class="appointment-head">
                    <span class="time">看房时间： {{item.bookingTime | timeFormat}}</span>
                    <a :href="'tel:' + item.serverMobile" class="btn btn-primary" v-if="true">联系管家</a>
                    <span class="btn btn-default" v-else>联系管家</span>
                </div>
                <div class="appointment-list">
                    <div class="roomList-item-box">
                        <router-link :to="{name: 'room-detail',query:{roomId: item.roomInfoFormat.id, type: item.roomInfoFormat.type, hideFooter: true}}" class="roomList-item">
                            <div class="room-pic">
                                <img alt="" :src="item.roomInfoFormat.imageUrl">
                            </div>
                            <div class="room-info">
                                <div class="room-name">{{item.roomInfoFormat.name}}</div>
                                <div class="room-layout">{{item.roomInfoFormat.roomArea}}起 | {{item.roomInfoFormat.houseType}} | {{item.roomInfoFormat.decorationDegree}}</div>
                                <div class="room-price">{{item.roomInfoFormat.minRentPrice}}元/月起</div>
                                <div class="room-address">
                                    <div class="room-address-text">
                                        {{item.roomInfoFormat.address}}
                                    </div>
                                    <mt-badge v-show="item.lookHouseStatus == 2" class="fullRent-tips" size="small" color="#ddd">已看房</mt-badge>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
              </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="fixed-footer" :class="{'hide': selected != 'room-list'}">
            <a class="btn btn-default" :href="`tel:${serverMobile}`">联系管家</a>
            <span class="btn btn-primary" @click="toSetOrder">立即约看</span>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'orderPage',
    data() {
        return {
            sessionId: '',
            selected: this.$store.state.selected,
            checkedList: [],
            roomList: [],
            journeyList: [],
            serverMobile: ''
        }
    },
    watch: {
      selected() {
        this.$store.commit('changeSelected', this.selected);
        this.getAppointment();
      }
    },
    filters: {
        timeFormat(val) {
            if(typeof val == 'string' && val.indexOf('.') > -1){
                return val.split('.')[0];
            }
            return val;
        }
    },
    created() {
        if (location.search) {
            let searchObj = {};
            let searchArr = location.search.slice(1).split('&');
            for (let i = 0; i < searchArr.length; i++) {
                if (searchArr[i].split("=")[1]) {
                    searchObj[searchArr[i].split("=")[0]] = unescape(searchArr[i].split("=")[1]);
                }
            }
            this.sessionId = searchObj.sid;
            if (this.sessionId) {
                this.getAppointment();
                this.$store.dispatch('SaveSessionId', this.sessionId).then(() => {
                    console.log('saved sessionId')
                }).catch(() => {});
            } else {
                Toast({
                    message: '没有该租客信息',
                    duration: 3000
                });
            }
        }
    },
    mounted() {
        this.getAppointment();
    },
    methods: {
        getAppointment() {
            var selectedType = this.selected == 'room-list' ? 1 : 2;
            this.sendReq('/flyingsquad', {
                "version": "1.0",
                "method": "query.look.house.stroke",
                "sessionId": this.sessionId,
                "params": {
                    sessionId: this.sessionId,
                    type: selectedType
                }
            }).then((res) => {
                if(res.data.code == 0){
                    if(!res.data.data){
                        Toast({
                            message: res.data.message,
                            duration: 3000
                        });
                        return ; 
                    }
                    if(selectedType == 1){
                        if(!res.data.data.content || !res.data.data.content.length){
                            MessageBox('提示', '没有房源数据');
                            return ; 
                        }
                        var oldRoomList = [];
                        if(this.$store.state.roomList.length){
                          oldRoomList = this.$store.state.roomList;
                        }
                        this.roomList = res.data.data.content;
                        if(!this.roomList.length){
                            this.selected = 'appointment';
                        }
                        this.roomList.map((item, index) => {
                            item.roomInfoFormat = JSON.parse(item.roomInfo);
                            item.roomInfoFormat.imageUrl = item.roomInfoFormat.imageUrl;
                            item.isChecked = false;
                            if(oldRoomList.length && oldRoomList.length == this.roomList.length){
                              if(oldRoomList[index].roomId == item.roomId){
                                item.isChecked = oldRoomList[index].isChecked;
                              }
                            }
                        });
                        this.serverMobile = this.roomList[0].serverMobile;
                        this.$store.dispatch('SaveRoomList', this.roomList).then(() => {
                          
                        }).catch(() => {});
                    } else {
                        if(!res.data.data.content || !res.data.data.content.length){
                            MessageBox.alert('没有看房行程，请前往精品房源添加').then(action => {
                              this.selected = 'room-list';
                            });
                            return ; 
                        }
                        if(this.$store.state.roomList){
                            this.roomList = this.$store.state.roomList;
                        }
                        this.journeyList = res.data.data.content;
                        this.journeyList.map((item, index) => {
                            item.roomInfoFormat = JSON.parse(item.roomInfo);
                            item.roomInfoFormat.imageUrl = item.roomInfoFormat.imageUrl;
                        });
                    }
                } else {
                    Toast({
                      message: res.data.message,
                      duration: 3000
                    });
                }
            })
        },
        toSetOrder() {
            this.checkedList = this.roomList.filter((item) => {
                return item.isChecked
            })
            if (!this.checkedList.length) {
                MessageBox('提示', '请至少选择一个房源');
                return;
            }
            this.$router.push('/checkOrder');
        }
    }
}
</script>
<style lang="scss">
$activeColor: #ee7500;
@mixin text-break {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mj-container {
    height: 100%;
    padding: 0.96rem 0 1.2rem;
}

.room-list {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.mint-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .mint-tab-item {
        background-color: #f5f5f5;
        padding: 0;
        &.is-selected {
            color: #fff;
            background-color: $activeColor;
            border-bottom: 0;
            margin-bottom: 0;
        }
        .mint-tab-item-label {
            height: 0.96rem;
            line-height: 0.96rem;
            font-size: 0.32rem;
        }
    }
}

.roomList-item-box {
    position: relative;
    background-color: #fff;
    .mint-checklist-label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
        .mint-checkbox-core {
            width: 0.533333rem;
            height: 0.533333rem;
            margin-left: 0.133333rem;
            &::after {
                border-width: 0.053333rem;
                top: 0.08rem;
                left: 0.16rem;
                width: 0.106667rem;
                height: 0.213333rem;
            }
        }
        .mint-checkbox-input:checked+.mint-checkbox-core {
            background-color: $activeColor;
            border-color: $activeColor;
        }
    }
}

.roomList-item {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0.32rem 0;
    padding-right: 0.4rem;
    margin-left: 0.8rem;
    border-bottom: 1px solid rgb(242, 242, 242);
    .room-pic {
        img {
            width: 3.36rem;
            height: 2.533333rem;
        }
    }
    .room-info {
        width: 5.34rem;
        padding-left: 0.346667rem;
        line-height: 1;
        flex: 1;
        &>div {
            @include text-break;
        }
    }
    .room-name {
        font-size: 0.4rem;
        margin-bottom: 0.213333rem;
    }
    .room-layout {
        color: rgb(153, 153, 153);
        margin-bottom: 0.373333rem;
    }
    .room-price {
        color: rgb(238, 117, 0);
        margin-bottom: 0.426667rem;
        font-size: 0.426667rem;
    }
    .room-address {
        display: flex;
        justify-content: space-between;
        line-height: 0.426667rem;
        .room-address-text {
            flex: 1;
            @include text-break;
        }
    }
    .fullRent-tips {
        width: 1.333333rem;
        height: 0.426667rem;
        padding: 0;
        font-size: 0.266667rem;
        border-radius: 0.213333rem;
    }
}

.fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    &.hide {
      display: none;
    }
    .btn {
        flex: 1;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.373333rem;
    }
}

.appointment-head {
    padding: 0.24rem;
    display: flex;
    justify-content: space-between;
    line-height: 0.96rem;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    .time {
        text-align: center;
    }
    .btn {
        padding: 0 0.4rem;
        height: 0.96rem;
    }
}

.appointment-list {
    .roomList-item-box {
        position: relative;
    }
    .roomList-item {
        margin-left: 0.4rem;
    }
    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, .3);
    }
}
</style>