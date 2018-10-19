import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

import './assets/css/main.css'

Vue.use(MintUI)

import axios from 'axios'

import { Lazyload } from 'mint-ui'

Vue.use(Lazyload, {
  error: require('./assets/images/room-default.jpg'),
  loading: require('./assets/images/room-default.jpg'),
  attempt: 1
})

Vue.use({
	install(Vue, options){
    Vue.prototype.sendReq = function (url, v, method, data) {
      if(!url || !v || !method || !data){
        alert('参数不全！');
        return ;
      }
      var args = {
        "method": method,
        "reqId": "cdq",
        "timestamp": new Date().getTime().toString(),
        "v": v,
        "params": data
      };
      return axios({
        method: 'post',
        url: url,
        timeout: 30000,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        data: args
      });
    };
	}
})

new Vue({
  el: '#mj-container',
  render: h => h(App)
})
