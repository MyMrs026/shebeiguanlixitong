import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
Vue.use(Vuex)

const state = {
  cu_role:'normal',
  equps:[
    {
      id:'001',
      name:'ASE',
      func:'chemistry use',
      lab:'zab'
    },
    {
      id:'002',
      name:'POS',
      func:'physics use',
      lab:'cio'
    },
    {
      id:'001',
      name:'ROL',
      func:'mathematics use',
      lab:'huawei'
    }
  ]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store