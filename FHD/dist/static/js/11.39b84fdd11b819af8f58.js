webpackJsonp([11],{It8z:function(e,a,t){"use strict";function n(e){t("OlnP")}Object.defineProperty(a,"__esModule",{value:!0});var r=t("3cXf"),s=t.n(r),o=t("bOkH"),i=t("fvyU"),l=t("IXui"),c=t("cTn1"),u=t("Jp5S"),h=t("lN2D"),d=t("o+C2"),p=t("0xDb"),m=t("L0x8"),f=t("VgBk"),v=(u.a,o.a,i.a,l.a,h.a,c.a,f.a,d.a,{name:"search-house",directives:{TransferDom:u.a},components:{Search:o.a,XInput:i.a,XButton:l.a,PopupHeader:h.a,Popup:c.a,scroll:f.a,PopupPicker:d.a},filters:{mobileStr:function(e){return e?Object(p.c)(e,3,4):""}},mounted:function(){var e=this;window.backUrl=function(){return e.cancelSearch(),"true"},(JSON.parse(localStorage.getItem("areaData"))||[]).map(function(a){e.areaList.push({name:a.areaName,value:String(a.areaId)})})},data:function(){return{searchData:{pageNo:1,pageSize:20,adminKeyword:"",estateName:"",regionIds:[]},areaValue:["0"],resultList:[],resultShow:!1,areaList:[{name:"不限",value:"0"}]}},methods:{searchParam:function(){var e=this,a=[];"0"===this.areaValue[0]?this.areaList.map(function(e){"0"!==e.value&&a.push(Number(e.value))}):a.push(Number(this.areaValue[0])),this.searchData.regionIds=a,Object(m.k)(this.searchData).then(function(a){1===e.searchData.pageNo?(e.resultShow=!0,e.resultList=a.result||[]):a.result&&a.result.length>0?e.resultList=e.resultList.concat(a.result):e.$refs.scroll.forceUpdate()}).catch(function(e){})},cancelSearch:function(){this.$router.go(-1)},toHouse:function(e){window.HouseResouse&&window.HouseResouse.gotoRoomList(s()(e))},moreData:function(){this.searchData.pageNo++,this.searchParam()},hidePopup:function(){this.resultShow=!1,this.searchData.pageNo=1}}}),g=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{height:"100%"}},[t("view-box",{ref:"viewBox",attrs:{"body-padding-top":"46px"}},[t("x-header",{staticStyle:{width:"100%",position:"absolute",left:"0",top:"0","z-index":"100"},attrs:{slot:"header",title:"搜索房源","left-options":{showBack:!1}},slot:"header"},[t("div",{attrs:{slot:"right"},on:{click:e.cancelSearch},slot:"right"},[e._v("取消")])]),e._v(" "),t("group",{staticClass:"noTop",attrs:{"label-width":"90px"}},[t("popup-picker",{attrs:{title:"所在区域",data:[e.areaList],"value-text-align":"left","show-name":"",placeholder:"请选择"},model:{value:e.areaValue,callback:function(a){e.areaValue=a},expression:"areaValue"}}),e._v(" "),t("x-input",{attrs:{title:"小区/公寓",placeholder:"请输入"},model:{value:e.searchData.estateName,callback:function(a){e.$set(e.searchData,"estateName",a)},expression:"searchData.estateName"}}),e._v(" "),t("x-input",{attrs:{title:"房东/手机号",placeholder:"请输入"},model:{value:e.searchData.adminKeyword,callback:function(a){e.$set(e.searchData,"adminKeyword",a)},expression:"searchData.adminKeyword"}})],1),e._v(" "),t("div",{staticStyle:{padding:"15px"}},[t("x-button",{attrs:{type:"primary"},nativeOn:{click:function(a){return e.searchParam(a)}}},[e._v("确定")])],1)],1),e._v(" "),t("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[t("popup",{attrs:{width:"100%",height:"100%",position:"right"},model:{value:e.resultShow,callback:function(a){e.resultShow=a},expression:"resultShow"}},[t("div",{staticClass:"searchHead"},[t("i",{staticClass:"iconfont icon-zuojiantou",on:{click:e.hidePopup}}),e._v("\n        搜索结果\n      ")]),e._v(" "),t("div",{staticClass:"resultScroll"},[t("scroll",{ref:"scroll",attrs:{data:e.resultList,pullDownRefresh:!1},on:{pullingUp:e.moreData}},[t("ul",{staticClass:"houseNav"},e._l(e.resultList,function(a,n){return t("li",{key:n,on:{click:function(t){e.toHouse(a)}}},[t("div",{staticClass:"blue"},[1===a.housingType?t("span",{staticClass:"houseTypeSpan"},[e._v("集")]):e._e(),e._v("\n                "+e._s(a.estateName)+"\n              ")]),e._v(" "),t("div",{staticClass:"rightIcon"},[e._v(e._s(a.orgAdminName)+" "+e._s(e._f("mobileStr")(a.orgAdminMobile)))]),e._v(" "),t("div",[e._v("共"+e._s(a.totalRoomCount)+"间，空房"+e._s(a.vacantRoomCount)+"间")])])}))])],1)])],1)],1)},b=[],w={render:g,staticRenderFns:b},_=w,S=t("vSla"),k=n,x=S(v,_,!1,k,"data-v-630ca3fe",null);a.default=x.exports},OlnP:function(e,a,t){var n=t("ka4c");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("FIqI")("0454bb10",n,!0,{})},ka4c:function(e,a,t){a=e.exports=t("UTlt")(!1),a.push([e.i,"\n.resultScroll[data-v-630ca3fe] {\n  height: 15.97222rem;\n}\n.houseNav li[data-v-630ca3fe] {\n  width: 100%;\n  height: 2.16667rem;\n  background: #fff;\n  margin-bottom: 0.02778rem;\n  padding: 0.08333rem 0.33333rem;\n  color: #666;\n  line-height: 0.66667rem;\n}\n.houseNav li .blue[data-v-630ca3fe] {\n  font-size: 0.38889rem;\n  font-weight: 700;\n}\n.houseNav li .houseTypeSpan[data-v-630ca3fe] {\n  width: 0.55556rem;\n  height: 0.55556rem;\n  text-align: center;\n  line-height: 0.5rem;\n  color: #FF9800;\n  display: inline-block;\n  font-size: 0.33333rem;\n  border: 0.02778rem solid #FF9800;\n  border-radius: 0.11111rem;\n  margin-right: 0.27778rem;\n  position: relative;\n  top: -0.05556rem;\n}\n.searchHead[data-v-630ca3fe] {\n  width: 100%;\n  height: 1.27778rem;\n  text-align: center;\n  line-height: 1.27778rem;\n  background: #4680FF;\n  color: #fff;\n  font-size: 0.5rem;\n  position: relative;\n}\n.searchHead .icon-zuojiantou[data-v-630ca3fe] {\n  position: absolute;\n  left: -0.55556rem;\n}\n",""])}});