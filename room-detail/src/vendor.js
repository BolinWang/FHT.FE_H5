import Vue from 'vue'
import axios from 'axios'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import PhotoSwipe from './assets/js/photoswipe.js'
import PhotoSwipeUI_Default from './assets/js/photoswipe-ui-default.js'
import VModal from 'vue-js-modal'

import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import './assets/js/photoswipe.css'
import './assets/js/default-skin/default-skin.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VModal, { dialog: true })
Vue.use(MintUI)

Vue.use({
	install(Vue, options){
    Vue.prototype.openPhotoSwipe = function (ele, items, options) {
      let gallery = new PhotoSwipe(ele, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
	}
})
