webpackJsonp([1],{INKp:function(t,n,e){"use strict";function o(t){e("UQCO")}Object.defineProperty(n,"__esModule",{value:!0});var i=e("3SZ7"),a=e.n(i),s=e("Qxj+"),c=e("Bnh8"),r=e("L0x8"),l=(c.a,s.a,{name:"workbench",components:{footers:c.a,Badge:s.a},created:function(){var t=this;if(this.userData=JSON.parse(localStorage.getItem("userData"))||{},window.JSUserInfo){var n=window.JSUserInfo.getHouseKeeperUserAction();localStorage.setItem("userData",n),this.userData=JSON.parse(n)}Object(r.l)().then(function(n){t.count=n.data.count||0}).catch(function(n){t.$vux.toast.text(n.message)})},mounted:function(){window.backUrl=function(){return"false"}},data:function(){return{userData:{},count:0}},methods:{loginOut:function(){this.$vux.confirm.show({title:"提示",content:"确定退出当前账号吗？",onConfirm:function(){window.JSLogout&&window.JSLogout.logOutAction()}})},toBill:function(){this.$router.push({name:"reminder"})},toMsg:function(){this.$router.push({name:"message"})},toTalk:function(){window.workbench&&window.workbench.gotoFeedActivity()},toApp:function(t,n){var e={title:t,h5Url:n};window.workbench?window.workbench.gotoHelpActivity(a()(e)):window.location.href=n},toHelp:function(){this.toApp("帮助文档","https://mp.weixin.qq.com/s/jb5_mc3RYSgKqkAgyDNnmw")},toRecord:function(){this.toApp("版本发布记录","https://mp.weixin.qq.com/s/ovuOQcIJre8rtZ-07Y9mNg")}}}),d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{height:"100%"}},[e("view-box",{ref:"viewBox"},[e("div",{staticClass:"workbenchHead"},[e("div",{staticClass:"userName"},[t._v("\n        "+t._s(t.userData.name||"未知用户")+"\n        "),e("div",{staticClass:"loginOut",on:{click:t.loginOut}},[t._v("退出")])]),t._v(" "),e("div",{staticClass:"message",on:{click:function(n){t.toMsg()}}},[e("i",{staticClass:"iconfont icon-p-message"}),t._v(" "),e("badge",{directives:[{name:"show",rawName:"v-show",value:t.count>0,expression:"count > 0"}],staticClass:"badgeIcon",attrs:{text:t.count}})],1),t._v(" "),e("div",{staticClass:"welcome"},[t._v("\n        欢迎登陆城市管家!\n      ")])]),t._v(" "),e("group",{staticClass:"noTop"},[e("cell",{attrs:{title:"租房(催缴)账单","is-link":""}},[t._v("\n        敬请期待\n      ")]),t._v(" "),e("cell",{attrs:{title:"城市管家帮助文档","is-link":""},nativeOn:{click:function(n){return t.toHelp(n)}}}),t._v(" "),e("cell",{attrs:{title:"版本发布记录","is-link":""},nativeOn:{click:function(n){return t.toRecord(n)}}}),t._v(" "),e("cell",{attrs:{title:"我要吐槽","is-link":""},nativeOn:{click:function(n){return t.toTalk(n)}}})],1),t._v(" "),e("footers",{attrs:{slot:"bottom",selectedIndex:0},slot:"bottom"})],1)],1)},u=[],f={render:d,staticRenderFns:u},h=f,m=e("Aizv"),v=o,w=m(l,h,!1,v,"data-v-f8c9ad28",null);n.default=w.exports},UQCO:function(t,n,e){var o=e("gDH8");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e("bUva")("f32e7b44",o,!0,{})},gDH8:function(t,n,e){n=t.exports=e("yKCJ")(!1),n.push([t.i,"\n.workbenchHead[data-v-f8c9ad28] {\n  width: 100%;\n  height: 2.22222rem;\n  background: #4680FF;\n  color: #fff;\n  padding-left: 0.55556rem;\n  padding-top: 0.27778rem;\n  font-weight: 700;\n  position: relative;\n}\n.workbenchHead .userName[data-v-f8c9ad28] {\n  font-size: 0.44444rem;\n  line-height: 1rem;\n}\n.workbenchHead .welcome[data-v-f8c9ad28] {\n  font-size: 0.38889rem;\n}\n.workbenchHead .loginOut[data-v-f8c9ad28] {\n  width: 1.38889rem;\n  height: 0.66667rem;\n  border-radius: 0.11111rem;\n  text-align: center;\n  line-height: 0.69444rem;\n  font-size: 0.33333rem;\n  background: #fff;\n  color: #4680FF;\n  display: inline-block;\n}\n.workbenchHead .message[data-v-f8c9ad28] {\n  position: absolute;\n  top: 0rem;\n  right: 0.83333rem;\n  width: 0.97222rem;\n}\n.workbenchHead .message .iconfont[data-v-f8c9ad28] {\n  font-size: 0.83333rem;\n}\n.workbenchHead .badgeIcon[data-v-f8c9ad28] {\n  position: absolute;\n  top: 0.27778rem;\n  left: 0.55556rem;\n}\n",""])}});