webpackJsonp([11],{"0IZV":function(t,e,n){var a=n("jpbl");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("bUva")("b3e0e9a0",a,!0,{})},JKsK:function(t,e,n){"use strict";function a(t){n("0IZV")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("3SZ7"),i=n.n(o),s=n("UIuv"),r=n.n(s),l=n("Nm/8"),c=n("oZ49"),d=n("Bnh8"),u=n("L0x8"),h=n("0xDb"),g=n("VgBk"),f=n("hs4R"),p=n.n(f),m=(c.a,l.a,d.a,g.a,{name:"house",directives:{TransferDom:c.a},components:{Loading:l.a,footers:d.a,scroll:g.a},filters:{mobileStr:function(t){return t?Object(h.b)(t,3,4):""}},created:function(){var t=this;this.getArea().then(function(e){t.getData()}).catch(function(e){t.$vux.toast.text("获取区域失败")}),window.backUrl=function(){return"false"}},data:function(){return{houseList:[],pageNo:1,showLoading:!1,areaList:[]}},methods:{toSearch:function(){this.$router.push({name:"searchHouse"})},getArea:function(){var t=this;return new r.a(function(e,n){var a=JSON.parse(localStorage.getItem("userData"))||{};p()({url:"https://flying-api.mdguanjia.com/api/user/queryManageArea",method:"post",data:{sessionId:a.sessionId},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){n.data.success&&n.data.data.length>0&&(n.data.data.map(function(e){t.areaList.push(e.areaId)}),localStorage.setItem("areaData",i()(n.data.data))),e(n)}).catch(function(t){n(t)})})},getData:function(){var t=this;this.showLoading=!0;var e={pageNo:this.pageNo,pageSize:20,regionIds:this.areaList};Object(u.h)(e).then(function(e){t.showLoading=!1,1===t.pageNo?t.houseList=e.result||[]:e.result&&e.result.length>0?t.houseList=t.houseList.concat(e.result):t.$refs.scroll.forceUpdate()}).catch(function(e){t.showLoading=!1})},moreData:function(){this.pageNo++,this.getData()},refreshData:function(){this.pageNo=1,this.getData()},callMobile:function(t){t&&window.call&&window.call.callAction(t)},toHouse:function(t){window.HouseResouse&&window.HouseResouse.gotoRoomList(i()(t))}}}),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%"}},[n("view-box",{ref:"viewBox",attrs:{"body-padding-top":"46px"}},[n("div",{staticClass:"searchHead",attrs:{slot:"header"},slot:"header"},[n("div",{staticClass:"search",on:{click:t.toSearch}},[t._v("\n          小区/公寓/房东/房东手机号码\n        ")])]),t._v(" "),n("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[n("loading",{attrs:{show:t.showLoading,text:"数据加载中"}})],1),t._v(" "),n("div",{staticClass:"resultScroll"},[n("scroll",{ref:"scroll",attrs:{data:t.houseList},on:{pullingUp:t.moreData,pullingDown:t.refreshData}},[n("ul",{staticClass:"houseNav"},t._l(t.houseList,function(e,a){return n("li",{key:a,on:{click:function(n){t.toHouse(e)}}},[n("div",{staticClass:"blue"},[1===e.housingType?n("span",{staticClass:"houseTypeSpan"},[t._v("集")]):t._e(),t._v("\n                "+t._s(e.estateName)+"\n              ")]),t._v(" "),n("div",{staticClass:"rightIcon"},[n("span",{staticStyle:{display:"inline-block"},on:{click:function(n){n.stopPropagation(),t.callMobile(e.orgAdminMobile)}}},[t._v(t._s(e.orgAdminName)+" "+t._s(t._f("mobileStr")(e.orgAdminMobile))+"\n\t\t\t\t\t\t\t\t\t"),n("i",{staticClass:"iconfont icon-dianhua blue"})])]),t._v(" "),n("div",[t._v("共"+t._s(e.totalRoomCount)+"间，空房"+t._s(e.vacantRoomCount)+"间")])])}))])],1),t._v(" "),n("footers",{attrs:{slot:"bottom",selectedIndex:1},slot:"bottom"})],1)],1)},b=[],w={render:v,staticRenderFns:b},_=w,L=n("Aizv"),x=a,y=L(m,_,!1,x,"data-v-36a3735e",null);e.default=y.exports},jpbl:function(t,e,n){e=t.exports=n("yKCJ")(!1),e.push([t.i,"\n.resultScroll[data-v-36a3735e] {\n  height: 15rem;\n}\n.houseNav li[data-v-36a3735e] {\n  width: 100%;\n  height: 2.16667rem;\n  background: #fff;\n  margin-bottom: 0.02778rem;\n  padding: 0.08333rem 0.33333rem;\n  color: #666;\n  line-height: 0.66667rem;\n}\n.houseNav li .blue[data-v-36a3735e] {\n  font-size: 0.38889rem;\n  font-weight: 700;\n}\n.houseNav li .houseTypeSpan[data-v-36a3735e] {\n  width: 0.55556rem;\n  height: 0.55556rem;\n  text-align: center;\n  line-height: 0.5rem;\n  color: #FF9800;\n  display: inline-block;\n  font-size: 0.33333rem;\n  border: 0.02778rem solid #FF9800;\n  border-radius: 0.11111rem;\n  margin-right: 0.27778rem;\n  position: relative;\n  top: -0.05556rem;\n}\n.searchHead[data-v-36a3735e] {\n  width: 100%;\n  height: 46PX;\n  padding: 0rem 1.11111rem;\n  padding-top: 10PX;\n  background: #4680FF;\n  position: absolute;\n  top: 0;\n  z-index: 2;\n}\n.search[data-v-36a3735e] {\n  width: 100%;\n  height: 30PX;\n  line-height: 30PX;\n  border-radius: 0.13889rem;\n  background-color: #70a1ff;\n  text-align: center;\n  position: relative;\n  top: -0.05556rem;\n  font-size: 0.33333rem;\n  color: #eee;\n  display: inline-block;\n}\n",""])}});