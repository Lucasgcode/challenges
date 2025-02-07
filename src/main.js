// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import SuiVue from 'semantic-ui-vue';
import 'vue-use-vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;

Vue.use(SuiVue)

/* eslint-disable no-new */
new Vue({	
  el: '#app',
  components: { App },
  template: '<App/>',
  store
});
