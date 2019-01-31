import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'lib-flexible/flexible.js';
import  './common/sass/base.scss';

import util from 'common/config/util.js';

Vue.config.productionTip = false;
Vue.prototype.util = util;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
