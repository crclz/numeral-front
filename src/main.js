import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

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