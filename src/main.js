import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import Common from './components/Common'

Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    // return moment(value).format(formatString); // value可以是普通日期 20170723
    return moment.unix(value / 1000).format(formatString); // 这是时间戳转时间
});


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.common = Common

Vue.prototype.global = {
    me: null
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

export default {
    data() {
        return {
            userid: '',
        }
    }
}


//枚举类Access
class Access {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

Access.None = new Access('none');
Access.Read = new Access('read');
Access.ReadWrite = new Access('readWrite');

Object.freeze(Access);               // 冻结对象，防止修改

export { Access }