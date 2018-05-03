<template>
    <div id="mj-container" class="mj-container">
        <mt-navbar v-model="selected" v-if="sessionId">
            <mt-tab-item id="notLook">未带看</mt-tab-item>
            <mt-tab-item id="hasLook">已带看</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class="room-list">
            <mt-tab-container-item id="notLook">
                <div class="check-item-box" v-if="notLookList.length" v-for="(item, index) in notLookList">
                    <div class="head">
                        <p>{{item.bookingTime}}</p>
                        <a class="phone" :href="'tel:' + item.userMobile">{{item.userName}}<span class="icon"></span></a>
                    </div>
                    <div class="remark" v-if="item.detailRequirement">
                        <div class="icon"></div>
                        {{item.detailRequirement}}
                    </div>
                    <div class="check-item-list">
                        <div class="roomList-item-box" v-for="(v, i) in item.list">
                            <router-link :to="{name: 'room-detail', query: { type: v.type, roomId: v.id }}" class="roomList-item">
                                <div class="room-pic">
                                    <img alt="" :src="v.imageUrl.replace('http:', 'https:').replace('memorhome', 'mdguanjia')">
                                </div>
                                <div class="room-info">
                                    <div class="room-name">{{v.name}}</div>
                                    <div class="room-layout">{{v.roomArea}}起 | {{v.houseType}} | {{v.decorationDegree}}</div>
                                    <div class="room-price">{{v.minRentPrice}}元/月起</div>
                                    <div class="room-address">
                                        <div class="room-address-text">
                                            {{v.address}}
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            <div class="oprate">
                            	<span class="btn btn-default" @click="contactLandlord(v)">联系房东</span>
                                <span class="btn btn-default" @click="showRemark = true; activeId = v.recordId; introduction = v.remark">备注</span>
                                <span class="btn btn-danger" v-if="v.lookHouseStatus == 1" @click="showContract = true; activeId = v.recordId">结束带看</span>
                                <span class="btn btn-default" v-else @click="startLook(v.recordId)">开始带看</span>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="hasLook">
                <div class="check-item-box" v-if="hasLookList.length" v-for="(item, index) in hasLookList">
                    <div class="head">
                        <p>{{item.bookingTime}}</p>
                        <a class="phone" :href="'tel:' + item.userMobile">{{item.userName}}<span class="icon"></span></a>
                    </div>
                    <div class="remark">
                        <div class="icon"></div>
                        {{item.detailRequirement}}
                    </div>
                    <div class="check-item-list">
                        <div class="roomList-item-box" v-for="(v, i) in item.list">
                            <router-link :to="{name: 'room-detail', query: { type: v.type, roomId: v.id }}" class="roomList-item">
                                <div class="room-pic">
                                    <img alt="" :src="v.imageUrl.replace('http:', 'https:').replace('memorhome', 'mdguanjia')">
                                </div>
                                <div class="room-info">
                                    <div class="room-name">{{v.name}}</div>
                                    <div class="room-layout">{{v.roomArea}}起 | {{v.houseType}} | {{v.decorationDegree}}</div>
                                    <div class="room-price">{{v.minRentPrice}}元/月起</div>
                                    <div class="room-address">
                                        <div class="room-address-text">
                                            {{v.address}}
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            <div class="oprate">
                            	<span class="btn btn-default" @click="contactLandlord(v)">联系房东</span>
                                <span class="btn btn-default" @click="showRemark = true; activeId = v.recordId; introduction = v.remark">备注</span>
                                <span class="btn btn-primary" v-if="v.lookHouseResult == 1">已签约</span>
                                <span class="btn btn-fail" v-else>未签约</span>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-popup class="mj-modal contract-modal" v-model="showContract" position="center" popup-transition="popup-fade">
            <p class="text">是否签约？</p>
            <div class="bottom">
                <span @click="setLookStatus(0)">未签约</span>
                <span @click="setLookStatus(1)">已签约</span>
            </div>
        </mt-popup>
        <mt-popup class="mj-modal remark-modal" v-model="showRemark" position="center" popup-transition="popup-fade">
            <div class="container">
                <p class="title">备注</p>
                <mt-field class="remark-text" placeholder="输入备注信息" type="textarea" rows="4" v-model="introduction"></mt-field>
            </div>
            <div class="bottom">
                <span @click="setRemark">确定</span>
            </div>
        </mt-popup>
        <mt-popup class="mj-modal remark-modal" v-model="showTelphone" position="center" popup-transition="popup-fade">
            <div class="container">
                <p class="title">{{landlord.name}}</p>
                <p style="font-weight: normal">{{landlord.mobile}}</p>
            </div>
            <div class="bottom">
                <span @click="showTelphone=false; landlord={name: '',mobile: ''}">取消</span>
                <span><a style="color: #4680FF;width:100%;display: inline-block;" :href="`tel: ${landlord.mobile}`" >呼叫</a></span>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            sessionId: '',
            selected: this.$store.state.selected,
            showContract: false,
            showRemark: false,
            showTelphone: false,
            introduction: '',
            notLookList: [],
            hasLookList: [],
            activeId: '',
            landlord: {
            	name: '',
            	mobile: ''
            }
        }
    },
    watch: {
        selected() {
            this.$store.commit('changeSelected', this.selected);
            this.getLookList();
        }
    },
    methods: {
    	contactLandlord(item){
    		this.landlord = Object.assign({}, this.landlord, {name: item.landlordName, mobile: item.landlordMobile})
    		this.showTelphone = true;
    	},
        getLookList() {
            this.sendReq('/flyingsquad/staff', {
                "version": "1.0",
                "method": this.selected == 'notLook' ? "unLookedHouse" : "lookedHouse",
                "sessionId": this.sessionId,
                "params": {

                }
            }).then((res) => {
                if (res.data.code == 0) {
                    if (res.data.data.length) {
                        this.notLookList.length = 0;
                        this.hasLookList.length = 0;
                        let data = res.data.data;
                        if (!data || !data.length) {
                            Toast({
                                message: '暂无数据',
                                duration: 3000
                            });
                            return;
                        }
                        data.forEach((item, index) => {
                            this.selected == 'notLook' ? this.notLookList.push(item) : this.hasLookList.push(item);
                        })
                    }
                } else {
                    Toast({
                        message: res.data.message,
                        duration: 3000
                    });
                }
            })
        },
        setLookStatus(n) {
            this.sendReq('/flyingsquad/staff', {
                "version": "1.0",
                "method": "endLookHouse",
                "sessionId": this.sessionId,
                "params": {
                    "recordId": this.activeId,
                    "lookHouseResult": n
                }
            }).then((res) => {
                this.showContract = false;
                if (res.data.code == 0) {
                    this.getLookList();
                }
            })
        },
        setRemark() {
            if (!this.introduction) {
                Toast({
                    message: '请输入备注',
                    duration: 3000,
                    className: 'remark-msg'
                });
                return;
            }
            this.sendReq('/flyingsquad/staff', {
                "version": "1.0",
                "method": "remark",
                "sessionId": this.sessionId,
                "params": {
                    "recordId": this.activeId,
                    "remark": this.introduction
                }
            }).then((res) => {
                this.showRemark = false;
                this.getLookList();
            })
        },
        startLook(id) {
            this.sendReq('/flyingsquad/staff', {
                "version": "1.0",
                "method": "startLookHouse",
                "sessionId": this.sessionId,
                "params": {
                    "recordId": id
                }
            }).then((res) => {
                this.getLookList();
            })
        }
    },
    mounted() {

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
                this.getLookList();
                /*this.notLookList = [{
                    bookingTime: 'qwqwqrq',
                    userName: 'qwrqwr',
                    detailRequirement: 'qwrqwr',
                    list: [{
                        name: '柏林',
                        roomArea: '123',
                        imageUrl: '',
                        landlordName: 'bolin',
                        landlordMobile: 15158864844
                    }]

                }]*/
            } else {
                Toast({
                    message: '没有服务人员',
                    duration: 3000
                });
            }
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

body {
    background-color: #f5f5f5;
    font-size: 0.32rem;
}

.mj-container {
    padding-top: 1.5rem;
    height: 100%;
}

.mint-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 1.2rem;
    display: block;
    .mint-tab-item {
        display: inline-block;
        vertical-align: top;
        margin: 0 1.6rem;
        padding: 0.4rem 0;
        &.is-selected {
            border-bottom: 3px solid $activeColor;
            color: $activeColor;
        }
        .mint-tab-item-label {
            font-size: 0.373333rem;
        }
    }
}

.check-item-box {
    background-color: #fff;
    margin-bottom: 0.4rem;
    .head {
        display: flex;
        padding: 0.4rem;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        .phone {
            position: relative;
            padding-right: 0.56rem;
            span {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.4rem;
                height: 0.4rem;
                background: url(../images/tel.png) no-repeat;
                background-size: cover;
            }
        }
    }
    .remark {
        position: relative;
        padding: 0.3rem;
        padding-left: 1rem;
        color: #999;
        font-size: 0.373333rem;
        line-height: 1.5;
        .icon {
            position: absolute;
            top: 0.36rem;
            left: 0.3rem;
            width: 0.533333rem;
            height: 0.533333rem;
            background: url(../images/remark.png) no-repeat;
            background-size: cover;
        }
    }
}

.check-item-list {
    overflow: hidden;
}

.roomList-item-box {
    background-color: #fafafa;
    padding-bottom: 0.32rem;
}

.roomList-item {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0.32rem 0;
    padding-right: 0.4rem;
    padding-left: 0.4rem;
    .room-pic {
        width: 3.36rem;
        height: 2.533333rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .room-info {
        width: 5.84rem;
        padding-left: 0.346667rem;
        line-height: 1;
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

.oprate {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 0.4rem;
    .btn {
        display: block;
        width: 31%;
        height: 0.746667rem;
        line-height: 0.693333rem;
        background-color: #fafafa;
        border: 1px solid #c1c1c1;
        border-radius: 0.373333rem;
        &.btn-danger {
            color: #ff4949;
            border-color: #ff4949;
        }
        &.btn-primary {
            border: 0;
            background-color: #4680FF;
        }
        &.btn-fail {
            border: 0;
            color: #333;
            background-color: #ddd;
        }
    }
}

.mj-modal {
    width: 7.2rem;
    border-radius: 0.373333rem;
    font-size: 0.426667rem;
    font-weight: bold;
    text-align: center;
    .container {
        padding: 0.4rem;
    }
    .title {
        margin-bottom: 0.4rem;
    }
    .bottom {
        border-top: 1px solid #ddd;
        display: flex;
        span {
            flex: 1;
            color: #4680FF;
            padding: 0.266667rem 0;
            font-size: 0.4rem;
            &+span {
                border-left: 1px solid #ddd;
            }
        }
    }
}

.contract-modal {
    .text {
        padding: 0.8rem 0;
    }
}

.remark-modal {
    .remark-text {
        border: 1px solid #ddd;
        background: none;
        .mint-cell-wrapper {
            background: none;
        }
    }
}

.room-list {
    height: 100%;
    overflow-y: scroll;
}

.remark-msg {
    z-index: 99999;
}
</style>