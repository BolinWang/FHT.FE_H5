<template>
    <div class="booking-container">
        <div class="mj-head">
            <span class="back-btn" @click="$router.back(-1)"></span>
        </div>
        <div class="booking-block">
            <div class="booking-box input-group">
                <label for="">姓名</label>
                <input type="text" placeholder="请输入您的姓名" v-model="name">
            </div>
            <div class="booking-box input-group">
                <label for="">手机号</label>
                <input type="tel" placeholder="请输入您的手机号" v-model="phone" maxlength="11">
            </div>
        </div>
        <div class="booking-block booking-box input-group">
            <label for="">看房时间</label>
            <input onfocus='this.blur();' @click="showPicker = true" type="text" placeholder="请选择看房时间" v-model="selectedTime" readonly="readonly">
            <span class="icon"></span>
        </div>
        <div class="booking-block booking-box room-box" v-for="(item,index) in roomList" :key="index">
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
        </div>
        <div class="fixed-footer">
            <span class="btn btn-primary" @click="setOrder">确认提交</span>
        </div>
        <mt-popup class="mj-picker" v-model="showPicker" position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="3" :showToolbar="true" :value-key="'text'">
                <div class="mj-picker-head">
                    <span class="fl" @click="showPicker = false">取消</span> 看房时间
                    <span class="fr" @click="setTime">确定</span>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export default {
    data() {
        return {
            showPicker: false,
            slots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }, {
                flex: 1,
                values: [],
                className: 'slot2',
                textAlign: 'center'
            }, {
                flex: 1,
                values: [],
                className: 'slot3',
                textAlign: 'center'
            }],
            pickHList: [],
            pickMiList: [],
            todayHList: [],
            todayMiList: [],
            pickerVal: '',
            selectedTime: '',
            name: '',
            phone: '',
            roomList: this.$store.state.roomList.filter((item) => item.isChecked),
            sessionId: this.$store.state.sessionId
        }
    },
    mounted() {
        this.setTimeList();
    },
    methods: {
        onValuesChange(picker, values) {
            if (values[0]) {
                if (values[0].text.indexOf('今天') !== -1) {
                    picker.setSlotValues(1, this.todayHList);
                    picker.setSlotValues(2, this.todayMiList);
                } else {
                    picker.setSlotValues(1, this.pickHList);
                    picker.setSlotValues(2, this.pickMiList);
                }

                if (values[1] && values[2]) {
                    let time = picker.getValues();
                    this.pickerVal = time[0].year + '-' + time[0].month + '-' + time[0].date +
                        ' ' + time[0].day + ' ' + time[1].hour + ':' +
                        time[2].minute;
                }
            }
        },
        setTimeList() {
            let today = new Date();
            let todayY = today.getFullYear();
            let todayM = today.getMonth();
            let todayD = today.getDate();

            for (var i = 0; i < 7; i++) {
                let date = new Date(todayY, todayM, todayD + i);
                let curY = date.getFullYear();
                let curM = date.getMonth() + 1;
                let curD = date.getDate();
                let curDText = curD < 10 ? '0' + curD : curD;
                let curDay = date.getDay();
                this.slots[0].values.push({
                    text: i == 0 ? '今天' + '(' + weekList[curDay] + ')' : curM + '月' + curDText + '日' + '(' + weekList[curDay] + ')',
                    year: curY,
                    month: curM < 10 ? '0' + curM : curM,
                    date: curD < 10 ? '0' + curD : curD,
                    day: weekList[curDay]
                });
            }
            for (let i = 8; i <= 21; i++) {
                this.pickHList.push({
                    text: i + '时',
                    hour: i < 10 ? '0' + i : i
                });
            }
            this.pickMiList.push({
                text: '00分',
                minute: '00'
            });
            this.pickMiList.push({
                text: '30分',
                minute: '30'
            });

            let todayH = today.getHours();
            let todayMi = today.getMinutes();
            if (todayMi >= 30) {
                this.todayHList = this.pickHList.slice(todayH - 7);
                this.todayMiList = this.pickMiList;
            } else {
                this.todayHList = this.pickHList.slice(todayH - 8);
                this.todayMiList = this.pickMiList.slice(1);
            }
        },
        setTime() {
            this.showPicker = false;
            this.selectedTime = this.pickerVal;
        },
        checkForm() {
            if (this.name == '') {
                Toast({
                    message: '请输入姓名',
                    duration: 3000
                });
                return false;
            }
            if (this.name.length > 12 || this.name.length < 2) {
                Toast({
                    message: '姓名长度为2~12个字',
                    duration: 3000
                });
                return false;
            }
            if (this.phone == '') {
                Toast({
                    message: '请输入手机号',
                    duration: 3000
                });
                return false;
            }
            if (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.phone) == false) {
                Toast({
                    message: '请输入正确的手机号',
                    duration: 3000
                });
                return false;
            }
            if (!this.selectedTime) {
                Toast({
                    message: '请选择看房时间',
                    duration: 3000
                });
                return false;
            }
            return true;
        },
        setOrder() {
            const checkResult = this.checkForm();
            if (!checkResult) {
                return false;
            }
            this.sendReq('/flyingsquad', {
                "version": "1.0",
                "method": "submit.look.house",
                "params": {
                    "sessionId": this.sessionId,
                    "lookHouseName": this.name,
                    "lookHouseMobile": this.phone,
                    "bookingTime": this.selectedTime.replace(/[\u4E00-\u9FA5]+/g,''),
                    "rooms": this.roomList.map((item) => {
                        return ({
                            roomId: item.roomInfoFormat.id,
                            housingType: item.roomInfoFormat.type
                        })
                    })
                }
            }).then((res) => {
                if (res.data.code == 0) {
                    Toast({
                        message: '预约成功',
                        duration: 3000
                    });
                } else {
                    Toast({
                        message: res.data.message || '网络开小差啦',
                        duration: 3000
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss">
.booking-container {
    padding-top: 1.28rem;
    background-color: #f5f5f5;
    height: 100%;
}

.booking-container .booking-box {
    padding: .4rem;
    background-color: #fff;
}

.booking-container .booking-block {
    margin-bottom: .4rem;
}

.mj-head {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 1.28rem;
    line-height: 1.28rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 0.426667rem;
    .back-btn {
        position: absolute;
        top: 0.4rem;
        left: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(../images/turn-back-b.png);
        background-size: cover;
    }
}

.room-box {
    display: flex;
    justify-content: center;
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
        padding-left: .346667rem;
        &>div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .room-name {
            font-size: .4rem;
            margin-bottom: .213333rem;
        }
        .room-layout {
            color: #999;
            margin-bottom: .373333rem;
        }
        .room-price {
            color: #ee7500;
            margin-bottom: .426667rem;
            font-size: .426667rem;
        }
    }
}

.mj-picker {
    width: 100%;
    .picker-toolbar {
        height: 36px;
    }
    .mj-picker-head {
        line-height: 36px;
        font-size: 16px;
        text-align: center;
        padding: 0 0.4rem;
        span {
            font-size: 12px;
            color: #0575f2;
        }
        .fl {
            float: left;
        }
        .fr {
            float: right;
        }
    }
    .picker-slot {
        font-size: 0.373333rem;
    }
}

.input-group {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child {
        border-bottom: 1px solid #f5f5f5;
    }
    input,
    label {
        font-size: 0.373333rem;
    }
    input {
        width: 7.2rem;
    }
    label {
        flex-grow: 1;
    }
    .icon {
        position: absolute;
        top: 0.48rem;
        right: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url(../images/icon-r.png);
        background-size: cover;
    }
}

.fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    .btn {
        flex: 1;
        height: .96rem;
        line-height: .96rem;
    }
}
</style>