webpackJsonp([9],{COjX:function(e,t,n){var i=n("gyE7");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("FIqI")("1cdaf8c8",i,!0,{})},QLLQ:function(e,t,n){"use strict";function i(e){n("COjX")}Object.defineProperty(t,"__esModule",{value:!0});var o=n("cTn1"),a=n("JGLT"),l=n("0xDb"),s=(o.a,a.a,{name:"reminder",components:{Popup:o.a,Confirm:a.a},filters:{mobileStr:function(e){return e?Object(l.c)(e,3,4):""}},mounted:function(){var e=this;window.backUrl=function(){return e.goBack(),"false"}},data:function(){return{show:!1,messageText:"",dataList:[{roomName:"天天小区-2幢-1单元-3楼-301房间A",fangdong:"张三",mobile:"13812341234",billNo:"B2320430344095329059",billName:"3期房租租金",billPrice:"3000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:1},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2}]}},methods:{goBack:function(){this.$router.go(-1)},callMobile:function(e){e&&window.call&&window.call.callAction(e)},message:function(e){this.show=!0},hideModel:function(){this.messageText=""},onConfirm:function(){},lookDetail:function(e){this.$router.push({name:"reminderDetail"})}}}),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{height:"100%"}},[n("view-box",{ref:"viewBox",attrs:{"body-padding-top":"46px","body-padding-bottom":"0px"}},[n("x-header",{staticStyle:{width:"100%",position:"absolute",left:"0",top:"0","z-index":"100"},attrs:{slot:"header",title:"房租(催缴)账单"},slot:"header"}),e._v(" "),n("div",e._l(e.dataList,function(t,i){return n("div",{key:i,staticClass:"rent-bill-item"},[n("div",{staticClass:"item-head"},[n("p",[e._v("房间："+e._s(t.roomName))])]),e._v(" "),n("div",{staticClass:"item-body"},[n("p",[e._v("账单号："+e._s(t.billNo))]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("账单名称："+e._s(t.billName))]),e._v(" "),n("span",{staticClass:"blue"},[e._v("账单金额："+e._s(t.billPrice))])]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("租客："+e._s(t.guest))]),e._v(" "),n("span",[e._v("手机号码："+e._s(e._f("mobileStr")(t.guestMobile)))])]),e._v(" "),n("p",{staticClass:"item-flex bottomBorder"},[n("span",[e._v("最迟支付时间："+e._s(t.time))]),e._v(" "),n("span",{staticClass:"text-danger"},[e._v("状态：已逾期"+e._s(t.day)+"天")])]),e._v(" "),n("p",{staticClass:"item-flex topHeight"},[n("span",[e._v("2018/05/01 13:21:23 李小红")]),e._v(" "),n("span",{staticClass:"blue alignRight",on:{click:function(n){e.lookDetail(t.billNo)}}},[e._v("查看全部催租记录(3)")])]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("已和租客沟通过，会过1天马上交租")])])]),e._v(" "),n("div",{staticClass:"item-foot item-flex"},[n("span",{staticClass:"blue",on:{click:function(n){e.callMobile(t.guestMobile)}}},[e._v("电话催缴")]),e._v(" "),n("span",{staticClass:"blue",on:{click:function(n){e.message(t)}}},[e._v("催租跟进")])])])}))],1),e._v(" "),n("confirm",{attrs:{title:"请记录跟进内容"},on:{"on-confirm":e.onConfirm,"on-hide":e.hideModel},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.messageText,expression:"messageText"}],staticClass:"messageContent",domProps:{value:e.messageText},on:{input:function(t){t.target.composing||(e.messageText=t.target.value)}}})])],1)},b=[],m={render:r,staticRenderFns:b},d=m,c=n("vSla"),g=i,v=c(s,d,!1,g,"data-v-b163b6e6",null);t.default=v.exports},gyE7:function(e,t,n){t=e.exports=n("UTlt")(!1),t.push([e.i,'\n.rent-bill-item[data-v-b163b6e6] {\n  margin-bottom: 0.16667rem;\n  color: #333;\n  background-color: #fff;\n}\n.rent-bill-item[data-v-b163b6e6]:last-child {\n  margin-bottom: 0;\n}\n.rent-bill-item .item-head[data-v-b163b6e6] {\n  position: relative;\n  padding: 0.22222rem 0.33333rem;\n}\n.rent-bill-item .item-head[data-v-b163b6e6]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0.33333rem;\n  right: 0;\n  height: 0;\n  border-bottom: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-head .iconfont[data-v-b163b6e6] {\n  position: absolute;\n  top: 0.13889rem;\n  left: 0;\n  width: 0.55556rem;\n  font-size: 0.44444rem;\n  line-height: 1;\n}\n.rent-bill-item .topHeight[data-v-b163b6e6] {\n  padding-top: 0.13889rem;\n}\n.rent-bill-item .bottomBorder[data-v-b163b6e6] {\n  position: relative;\n  padding-bottom: 0.13889rem;\n}\n.rent-bill-item .bottomBorder[data-v-b163b6e6]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  border-bottom: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-body[data-v-b163b6e6] {\n  position: relative;\n  padding: 0.16667rem 0rem 0.16667rem 0.33333rem;\n}\n.rent-bill-item .item-body[data-v-b163b6e6]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  border-bottom: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-foot[data-v-b163b6e6] {\n  padding: 0.16667rem 0;\n}\n.rent-bill-item .item-foot span[data-v-b163b6e6] {\n  position: relative;\n  text-align: center;\n}\n.rent-bill-item .item-foot span[data-v-b163b6e6]:last-child::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0.52778rem;\n  border-right: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-foot span[data-v-b163b6e6]:only-child::before {\n  display: none;\n}\n.rent-bill-item .item-flex[data-v-b163b6e6] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  line-height: 0.66667rem;\n}\n.rent-bill-item .item-flex span[data-v-b163b6e6] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.rent-bill-item .item-flex span[data-v-b163b6e6]:nth-child(2) {\n  position: relative;\n  padding-left: 1.6em;\n}\n.messageContent[data-v-b163b6e6] {\n  width: 100%;\n  height: 2.22222rem;\n  border: 0.02778rem solid #ddd;\n  border-radius: 0.08333rem;\n  resize: none;\n  padding: 0.13889rem;\n  line-height: 0.5rem;\n  outline: none;\n}\n.alignRight[data-v-b163b6e6] {\n  text-align: right;\n  padding-right: 0.33333rem;\n}\n.text-warning[data-v-b163b6e6] {\n  color: #FF9800;\n}\n.text-danger[data-v-b163b6e6] {\n  color: #E51C23;\n}\n.blue[data-v-b163b6e6] {\n  color: #4680FF;\n}\n.disabled[data-v-b163b6e6] {\n  color: #999;\n}\n',""])}});