import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store.js';
import 'lib-flexible/flexible.js';
import  './common/sass/base.scss';

import util from 'common/config/util.js';

Vue.config.productionTip = false;
Vue.prototype.util = util;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
