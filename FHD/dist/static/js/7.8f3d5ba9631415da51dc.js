webpackJsonp([7],{"0BGe":function(e,t,n){var i=n("e1+s");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("bUva")("1ea99657",i,!0,{})},QLLQ:function(e,t,n){"use strict";function i(e){n("0BGe")}Object.defineProperty(t,"__esModule",{value:!0});var l=n("qlbQ"),a=n("ZX1J"),o=n("c+uS"),s=n("0xDb"),c=(l.a,a.a,o.a,{components:{Tab:l.a,TabItem:a.a,Sticky:o.a},filters:{mobileStr:function(e){return e?Object(s.b)(e,3,4):""}},data:function(){return{tabIndex:0,dataList:[{roomName:"天天小区-2幢-1单元-3楼-301房间A",fangdong:"张三",mobile:"13812341234",billNo:"B2320430344095329059",billName:"3期房租租金",billPrice:"3000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:1},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2},{roomName:"天天小区-2幢-1单元-3楼-301房间B",fangdong:"王五",mobile:"13812341234",billNo:"B2320430344095329066",billName:"4期房租租金",billPrice:"2000.0",guest:"李四",guestMobile:"18912344321",time:"2018/05/01",day:1,status:2}]}},methods:{goBack:function(){},changeTable:function(e){this.tabIndex=e},callMobile:function(e){console.log(e),e&&window.call&&window.call.callAction(e)},message:function(e){2!==e.status&&console.log(e.status)}}}),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"scrollDiv"},e._l(e.dataList,function(t,i){return n("div",{key:i,staticClass:"rent-bill-item"},[n("div",{staticClass:"item-head"},[n("p",[e._v("房间："+e._s(t.roomName))])]),e._v(" "),n("div",{staticClass:"item-body"},[n("p",[e._v("账单号："+e._s(t.billNo))]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("账单名称："+e._s(t.billName))]),e._v(" "),n("span",{staticClass:"blue"},[e._v("账单金额："+e._s(t.billPrice))])]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("租客："+e._s(t.guest))]),e._v(" "),n("span",[e._v("手机号码："+e._s(e._f("mobileStr")(t.guestMobile)))])]),e._v(" "),n("p",{staticClass:"item-flex"},[n("span",[e._v("最迟支付时间："+e._s(t.time))]),e._v(" "),n("span",{staticClass:"text-danger"},[e._v("状态：已逾期"+e._s(t.day)+"天")])])]),e._v(" "),n("div",{staticClass:"item-foot item-flex"},[n("span",{staticClass:"blue",on:{click:function(n){e.callMobile(t.guestMobile)}}},[e._v("电话催缴")]),e._v(" "),n("span",{staticClass:"blue",on:{click:function(n){e.message(t)}}},[e._v("催租跟进")])])])}))])},r=[],m={render:d,staticRenderFns:r},b=m,f=n("Aizv"),v=i,u=f(c,b,!1,v,"data-v-5cd8182e",null);t.default=u.exports},"e1+s":function(e,t,n){t=e.exports=n("yKCJ")(!1),t.push([e.i,'\n.rent-bill-item[data-v-5cd8182e] {\n  margin-bottom: 0.16667rem;\n  color: #333;\n  background-color: #fff;\n}\n.rent-bill-item[data-v-5cd8182e]:last-child {\n  margin-bottom: 0;\n}\n.rent-bill-item .item-head[data-v-5cd8182e] {\n  position: relative;\n  padding: 0.16667rem 0.33333rem;\n}\n.rent-bill-item .item-head[data-v-5cd8182e]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0.33333rem;\n  right: 0;\n  height: 0;\n  border-bottom: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-head .iconfont[data-v-5cd8182e] {\n  position: absolute;\n  top: 0.13889rem;\n  left: 0;\n  width: 0.55556rem;\n  font-size: 0.44444rem;\n  line-height: 1;\n}\n.rent-bill-item .item-body[data-v-5cd8182e] {\n  position: relative;\n  padding: 0.16667rem 0.33333rem;\n}\n.rent-bill-item .item-body[data-v-5cd8182e]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  border-bottom: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-foot[data-v-5cd8182e] {\n  padding: 0.16667rem 0;\n}\n.rent-bill-item .item-foot span[data-v-5cd8182e] {\n  position: relative;\n  text-align: center;\n}\n.rent-bill-item .item-foot span[data-v-5cd8182e]:last-child::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0.52778rem;\n  border-right: 0.02778rem solid #ccc;\n}\n.rent-bill-item .item-foot span[data-v-5cd8182e]:only-child::before {\n  display: none;\n}\n.rent-bill-item .item-flex[data-v-5cd8182e] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  line-height: 0.66667rem;\n}\n.rent-bill-item .item-flex span[data-v-5cd8182e] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.rent-bill-item .item-flex span[data-v-5cd8182e]:last-child {\n  position: relative;\n  padding-left: 1.6em;\n}\n.text-warning[data-v-5cd8182e] {\n  color: #FF9800;\n}\n.text-danger[data-v-5cd8182e] {\n  color: #E51C23;\n}\n.blue[data-v-5cd8182e] {\n  color: #4680FF;\n}\n.disabled[data-v-5cd8182e] {\n  color: #999;\n}\n',""])}});