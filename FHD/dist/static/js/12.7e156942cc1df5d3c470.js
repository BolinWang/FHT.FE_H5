webpackJsonp([12],{APVW:function(e,t,a){var n=a("JO6x");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("1b381d86",n,!0,{})},It8z:function(e,t,a){"use strict";function n(e){a("APVW")}Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),s=a.n(r),o=a("HqzV"),i=a("pDNl"),l=a("2sLL"),c=a("HD9R"),u=a("63CM"),h=a("WZtS"),d=a("7Ah8"),p=a("0xDb"),m=a("L0x8"),f=a("VgBk"),v=(u.a,o.a,i.a,l.a,h.a,c.a,f.a,d.a,{name:"search-house",directives:{TransferDom:u.a},components:{Search:o.a,XInput:i.a,XButton:l.a,PopupHeader:h.a,Popup:c.a,scroll:f.a,PopupPicker:d.a},filters:{mobileStr:function(e){return e?Object(p.c)(e,3,4):""}},mounted:function(){var e=this;window.backUrl=function(){return e.cancelSearch(),"true"},(JSON.parse(localStorage.getItem("areaData"))||[]).map(function(t){e.areaList.push({name:t.areaName,value:String(t.areaId)})})},data:function(){return{searchData:{pageNo:1,pageSize:20,adminKeyword:"",estateName:"",regionIds:[]},areaValue:["0"],resultList:[],resultShow:!1,areaList:[{name:"不限",value:"0"}]}},methods:{searchParam:function(){var e=this,t=[];"0"===this.areaValue[0]?this.areaList.map(function(e){"0"!==e.value&&t.push(Number(e.value))}):t.push(Number(this.areaValue[0])),this.searchData.regionIds=t,Object(m.k)(this.searchData).then(function(t){1===e.searchData.pageNo?(e.resultShow=!0,e.resultList=t.result||[]):t.result&&t.result.length>0?e.resultList=e.resultList.concat(t.result):e.$refs.scroll.forceUpdate()}).catch(function(e){})},cancelSearch:function(){this.$router.go(-1)},toHouse:function(e){window.HouseResouse&&window.HouseResouse.gotoRoomList(s()(e))},moreData:function(){this.searchData.pageNo++,this.searchParam()},hidePopup:function(){this.resultShow=!1,this.searchData.pageNo=1}}}),g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("view-box",{ref:"viewBox",attrs:{"body-padding-top":"46px"}},[a("x-header",{staticStyle:{width:"100%",position:"absolute",left:"0",top:"0","z-index":"100"},attrs:{slot:"header",title:"搜索房源","left-options":{showBack:!1}},slot:"header"},[a("div",{attrs:{slot:"right"},on:{click:e.cancelSearch},slot:"right"},[e._v("取消")])]),e._v(" "),a("group",{staticClass:"noTop",attrs:{"label-width":"90px"}},[a("popup-picker",{attrs:{title:"所在区域",data:[e.areaList],"value-text-align":"left","show-name":"",placeholder:"请选择"},model:{value:e.areaValue,callback:function(t){e.areaValue=t},expression:"areaValue"}}),e._v(" "),a("x-input",{attrs:{title:"小区/公寓",placeholder:"请输入"},model:{value:e.searchData.estateName,callback:function(t){e.$set(e.searchData,"estateName",t)},expression:"searchData.estateName"}}),e._v(" "),a("x-input",{attrs:{title:"房东/手机号",placeholder:"请输入"},model:{value:e.searchData.adminKeyword,callback:function(t){e.$set(e.searchData,"adminKeyword",t)},expression:"searchData.adminKeyword"}})],1),e._v(" "),a("div",{staticStyle:{padding:"15px"}},[a("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.searchParam(t)}}},[e._v("确定")])],1)],1),e._v(" "),a("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[a("popup",{attrs:{width:"100%",height:"100%",position:"right"},model:{value:e.resultShow,callback:function(t){e.resultShow=t},expression:"resultShow"}},[a("div",{staticClass:"searchHead"},[a("i",{staticClass:"iconfont icon-zuojiantou",on:{click:e.hidePopup}}),e._v("\n        搜索结果\n      ")]),e._v(" "),a("div",{staticClass:"resultScroll"},[a("scroll",{ref:"scroll",attrs:{data:e.resultList,pullDownRefresh:!1},on:{pullingUp:e.moreData}},[a("ul",{staticClass:"houseNav"},e._l(e.resultList,function(t,n){return a("li",{key:n,on:{click:function(a){e.toHouse(t)}}},[a("div",{staticClass:"blue"},[1===t.housingType?a("span",{staticClass:"houseTypeSpan"},[e._v("集")]):e._e(),e._v("\n                "+e._s(t.estateName)+"\n              ")]),e._v(" "),a("div",{staticClass:"rightIcon"},[e._v(e._s(t.orgAdminName)+" "+e._s(e._f("mobileStr")(t.orgAdminMobile)))]),e._v(" "),a("div",[e._v("共"+e._s(t.totalRoomCount)+"间，空房"+e._s(t.vacantRoomCount)+"间")])])}))])],1)])],1)],1)},b=[],w={render:g,staticRenderFns:b},_=w,x=a("VU/8"),S=n,D=x(v,_,!1,S,"data-v-630ca3fe",null);t.default=D.exports},JO6x:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n.resultScroll[data-v-630ca3fe] {\n  height: 15.97222rem;\n}\n.houseNav li[data-v-630ca3fe] {\n  width: 100%;\n  height: 2.16667rem;\n  background: #fff;\n  margin-bottom: 0.02778rem;\n  padding: 0.08333rem 0.33333rem;\n  color: #666;\n  line-height: 0.66667rem;\n}\n.houseNav li .blue[data-v-630ca3fe] {\n  font-size: 0.38889rem;\n  font-weight: 700;\n}\n.houseNav li .houseTypeSpan[data-v-630ca3fe] {\n  width: 0.55556rem;\n  height: 0.55556rem;\n  text-align: center;\n  line-height: 0.5rem;\n  color: #FF9800;\n  display: inline-block;\n  font-size: 0.33333rem;\n  border: 0.02778rem solid #FF9800;\n  border-radius: 0.11111rem;\n  margin-right: 0.27778rem;\n  position: relative;\n  top: -0.05556rem;\n}\n.searchHead[data-v-630ca3fe] {\n  width: 100%;\n  height: 1.27778rem;\n  text-align: center;\n  line-height: 1.27778rem;\n  background: #4680FF;\n  color: #fff;\n  font-size: 0.5rem;\n  position: relative;\n}\n.searchHead .icon-zuojiantou[data-v-630ca3fe] {\n  position: absolute;\n  left: -0.55556rem;\n}\n",""])}});