import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'

Vue.use(MintUI)

import { Lazyload } from 'mint-ui'

Vue.use(Lazyload, {
  error: require('./assets/images/room-default.jpg'),
  loading: require('./assets/images/room-default.jpg'),
  attempt: 1
})

import './assets/css/main.css'