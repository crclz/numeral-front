import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '47.95.230.65:8086/'
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')