import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import "./scss/variables.scss";
import "./scss/global.scss";
import Axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
