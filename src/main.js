// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  BootstrapVue from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import 'popper.js'


import App from './App'
import Vue from 'vue'
import router from './router'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BootstrapVue)

import store from './store'
import axios from 'axios'
import "@/assets/text/text.css"




//import "lib-flexible/flexible.js"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
