// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1.引入重置样式表
import "./assets/css/reset.css"

//2挂载公共组件
import commonComponents from "./components/index"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//3过滤器
import filters from "./filters"
for(let i in filters){
  Vue.filter(i,filters[i])
}

//4axios

//5vuex
import store from "./store"

//6.element-ui
import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi)

//图片前缀
Vue.prototype.$imgPre="http://localhost:3000";


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
