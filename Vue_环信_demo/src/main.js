import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/icons'

Vue.config.productionTip = false;

/*****配置环信******/
// 1. 安装并引入环信SDK
import websdk from 'easemob-websdk'
let WebIM = window.WebIM = websdk;
Vue.prototype.WebIM = WebIM;
// 2. 创建连接
const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
});
// 3. 把链接对象扩展给Vue实例属性(以后可以用this.myCon代表环信链接对象)
Vue.prototype.myCon = conn;
/*******配置环信结束***********/



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
