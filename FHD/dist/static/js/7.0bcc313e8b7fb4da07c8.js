webpackJsonp([7],{EQnF:function(t,e,n){e=t.exports=n("yKCJ")(!1),e.push([t.i,"\n.icon-bf-icon-help[data-v-dd72e5da] {\n  font-size: 0.69444rem;\n  position: relative;\n  top: -0.13889rem;\n}\n.messageNav li[data-v-dd72e5da] {\n  margin-bottom: 0.13889rem;\n  width: 100%;\n  min-height: 3.61111rem;\n  padding: 0.33333rem 0.55556rem;\n  background: #fff;\n}\n.messageNav li .msgTitle[data-v-dd72e5da] {\n  font-size: 0.38889rem;\n  color: #101010;\n}\n.messageNav li .msgContent[data-v-dd72e5da] {\n  padding: 0.27778rem 0;\n  color: #888;\n  min-height: 1.66667rem;\n}\n.messageNav li .msgBot[data-v-dd72e5da] {\n  color: #888;\n}\n.messageNav li .msgTime[data-v-dd72e5da] {\n  width: 60%;\n}\n.messageNav li .msgStatus[data-v-dd72e5da] {\n  width: 40%;\n  float: right;\n  text-align: right;\n}\n.messageNav .unread[data-v-dd72e5da] {\n  position: relative;\n}\n.messageNav .unread[data-v-dd72e5da]:after {\n  content: '\\E61E';\n  font-family: 'iconfont';\n  position: absolute;\n  top: -0.41667rem;\n  right: -0.41667rem;\n  font-size: 0.55556rem;\n  color: #E51C23;\n}\n.noMsg[data-v-dd72e5da] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  width: 100%;\n  height: 100%;\n  color: #999;\n}\n.noMsg .iconfont[data-v-dd72e5da] {\n  font-size: 3.33333rem;\n}\n.sourceScroll[data-v-dd72e5da] {\n  height: 15.83333rem;\n}\n",""])},J4Wv:function(t,e,n){"use strict";function a(t){n("K74K")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("Nm/8"),i=n("oZ49"),o=n("VgBk"),d=(n("0xDb"),n("L0x8")),r=(i.a,s.a,o.a,{name:"message",directives:{TransferDom:i.a},components:{Loading:s.a,scroll:o.a},created:function(){var t=this;window.backUrl=function(){return t.goBack(),"false"},this.showLoading=!0,this.getMsgList()},filters:{readStr:function(t){return t?"未读":"已读"}},data:function(){return{msgList:[],showLoading:!1,showNodata:!1,pageNo:1}},methods:{refreshData:function(){this.pageNo=1,this.getMsgList()},moreData:function(){this.pageNo++,this.getMsgList()},getMsgList:function(){var t=this,e={pageNo:this.pageNo,pageSize:20};Object(d.c)(e).then(function(e){t.showLoading=!1,1===t.pageNo?(t.msgList=e.data||[],t.showNodata=!(t.msgList.length>0)):e.data.length>0?t.msgList=t.msgList.concat(e.data):t.$refs.scroll.forceUpdate()}).catch(function(e){t.showLoading=!1,t.$vux.toast.text(e.message),t.$refs.scroll.forceUpdate()})},goBack:function(){this.$router.go(-1)}}}),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%"}},[n("view-box",{ref:"viewBox",attrs:{"body-padding-top":"46px","body-padding-bottom":"0"}},[n("x-header",{staticStyle:{width:"100%",position:"absolute",left:"0",top:"0","z-index":"100"},attrs:{slot:"header",title:"我的消息"},slot:"header"}),t._v(" "),n("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[n("loading",{attrs:{show:t.showLoading,text:"数据加载中"}})],1),t._v(" "),t.msgList.length>0?n("div",{staticClass:"sourceScroll"},[n("scroll",{ref:"scroll",attrs:{data:t.msgList},on:{pullingDown:t.refreshData,pullingUp:t.moreData}},[n("ul",{staticClass:"messageNav"},t._l(t.msgList,function(e,a){return n("li",{key:a},[n("div",{staticClass:"msgTitle"},[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"msgContent"},[t._v("\n              "+t._s(e.content)+"\n            ")]),t._v(" "),n("div",{staticClass:"msgBot"},[n("span",{staticClass:"msgTime"},[t._v(t._s(e.time))]),t._v(" "),n("span",{staticClass:"msgStatus",class:{unread:e.unread}},[t._v(t._s(t._f("readStr")(e.unread)))])])])}))])],1):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showNodata,expression:"showNodata"}],staticClass:"noMsg"},[n("div",[n("i",{staticClass:"iconfont icon-wuxiaoxiwutongzhi"}),n("br"),t._v("\n        消息没有来过，再等等吧！\n      ")])])],1)],1)},c=[],g={render:l,staticRenderFns:c},m=g,v=n("Aizv"),h=a,f=v(r,m,!1,h,"data-v-dd72e5da",null);e.default=f.exports},K74K:function(t,e,n){var a=n("EQnF");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("bUva")("29058405",a,!0,{})}});