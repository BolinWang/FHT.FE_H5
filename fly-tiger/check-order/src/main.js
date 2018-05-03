import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import axios from 'axios'
import './css/main.css'

import router from './router/router.js'
import store from './store.js'

Vue.use(MintUI)

Vue.use({
  install(Vue, options){
    Vue.prototype.sendReq = function (url, params) {
      if(!url || !params){
        alert('参数不全！');
        return ;
      }
      let args = Object.assign({
        "reqId": "cdq",
        "timestamp": new Date().getTime().toString(),
      }, params);
      return axios({
        method: 'post',
        baseURL: 'https://api.mdguanjia.com/bop',
        url: url,
        timeout: 10000,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        data: args
      });
    };
    Vue.prototype.openPhotoSwipe = function (ele, items, options) {
      let gallery = new PhotoSwipe(ele, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
  }
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VModal from 'vue-js-modal'

import PhotoSwipe from './js/photoswipe.js'
import PhotoSwipeUI_Default from './js/photoswipe-ui-default.js'
import './js/photoswipe.css'
import './js/default-skin/default-skin.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VModal, { dialog: true })

new Vue({
  el: '#mj-container',
  router,
  store,
  render: h => h(App)
})