webpackJsonp([10],{KE8z:function(t,e,a){"use strict";function r(t){a("NckM")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("mtWM"),i=a.n(s),n={data:function(){return{userData:{},endDate:null,nowUrl:null,startDate:null}},created:function(){if(this.userData=JSON.parse(localStorage.getItem("userData"))||{},window.JSUserInfo){var t=window.JSUserInfo.getHouseKeeperUserAction();localStorage.setItem("userData",t),this.userData=JSON.parse(t)}var e=new Date,a=e.getFullYear(),r=e.getMonth()+1,s=e.getDate();this.endDate=a+"-"+(r<10?"0"+r:r)+"-"+(s<10?"0"+s:s),this.startDate=a+"-"+(r<10?"0"+r:r)+"-"+(s<10?"0"+s:s),this.upDataUrl()},mounted:function(){var t=this;window.refreshPage=function(e){var a=JSON.parse(e);t.upDataUrl(a)},i.a.get("http://bi.mdguanjia.com/fh/ReportServer?op=fs_load&cmd=sso",{withCredentials:!0,params:{fr_username:this.userData.mobile,fr_password:this.userData.password}}).then(function(t){console.log(t),console.log("12345"),t.data.includes("fail")}).catch()},methods:{upDataUrl:function(t){if(t)switch(this.startDate=t.startTime,this.endDate=t.endTime,this.$route.query.type){case"1":this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B4e2a%5D%5B4eba%5D%5B4e1a%5D%5B7ee9%5D.cpt&op=h5&fid="+this.userData.id+"&startDate="+this.startDate+"&endDate="+this.endDate;break;case"2":!0===this.userData.leafDep?this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D.cpt&op=h5&depId="+this.userData.depId+"&&startDate="+this.startDate+"&endDate="+this.endDate:this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D-%5B975e%5D%5B6700%5D%5B540e%5D%5B4e00%5D%5B7ea7%5D.cpt&op=h5&depId="+this.userData.depId+"&&startDate="+this.startDate+"&endDate="+this.endDate}else"1"===this.$route.query.type?this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B4e2a%5D%5B4eba%5D%5B4e1a%5D%5B7ee9%5D.cpt&op=h5&fid="+this.userData.id+"&startDate="+this.startDate+"&endDate="+this.endDate:!0===this.userData.leafDep?this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D.cpt&op=h5&depId="+this.userData.depId+"&&startDate="+this.startDate+"&endDate="+this.endDate:this.nowUrl="http://bi.mdguanjia.com/fh/ReportServer?reportlet=fh%2FcityManagerAPP%2F%5B7ba1%5D%5B7406%5D%5B65e5%5D%5B62a5%5D-%5B975e%5D%5B6700%5D%5B540e%5D%5B4e00%5D%5B7ea7%5D.cpt&op=h5&depId="+this.userData.depId+"&&startDate="+this.startDate+"&endDate="+this.endDate}}},D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("iframe",{staticStyle:{"min-height":"400px"},attrs:{width:"100%",height:"400",src:t.nowUrl}})])},o=[],h={render:D,staticRenderFns:o},d=h,p=a("VU/8"),c=r,u=p(n,d,!1,c,"data-v-82224976",null);e.default=u.exports},NckM:function(t,e,a){var r=a("zivc");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("a8d32a9c",r,!0,{})},zivc:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"\n.container[data-v-82224976] {\n  min-height: 100%;\n  background: #fff;\n}\n",""])}});