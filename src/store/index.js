import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { createEventId } from '../common/event-utils';
Vue.use(Vuex)

const state = {
  cu_role:'',
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
  ],
  notices:[
    {
      content:'2023年浙江大学全球人才招聘，欢迎加盟!',
      date:new Date('2022-11-01'),
      href:'#'
    },
    {
      content:'浙江大学2023年行政专员、技术专员公开招聘公告!',
      date:new Date('2022-11-04'),
    },
    {
      content:'浙江大学计划财务处公开招聘技术专员启事!',
      date:new Date('2022-11-06'),
    },
    {
      content:'浙江大学超重力研究中心2023年上半年实验技术岗位公开招聘公告!',
      date:new Date('2022-11-09'),
    },
    {
      content:'浙江大学图书资料报废处置招标公告（20230404）!',
      date:new Date('2022-11-12'),
    },
    {
      content:'浙江大学2023年技术专员岗位公开招聘拟录用人员公示（三）!',
      date:new Date('2022-11-14'),
    },
    {
      content:'浙江大学2023年拟录用人员名单公示（四）!',
      date:new Date('2022-11-15'),
    },
    {
      content:'关于浙江大学2023年党政管理人员招聘拟录用名单的公示!',
      date:new Date('2022-11-18'),
    },
    {
      content:'关于浙江大学2023年专职辅导员招聘拟录用名单的公示!',
      date:new Date('2022-11-20'),
    },
    {
      content:'浙江大学2022年拟录用人员名单公示（二十一）!',
      date:new Date('2022-11-22'),
    },
    {
      content:'国际教育学院面向海内外招聘英才!',
      date:new Date('2022-11-23'),
    },
    {
      content:'浙江大学国际化雇员全球招聘启事 Zhejiang University International Job Opportunities!',
      date:new Date('2022-11-25'),
    },
    {
      content:'浙江大学2022年拟录用人员名单公示（二十）',
      date:new Date('2022-11-27'),
    },
    {
      content:'浙江大学建筑设计研究院公开招聘高级专业技术人员启事',
      date:new Date('2022-11-30'),
    },
    {
      content:'浙江大学2023年党政管理人员和专职辅导员招聘启事',
      date:new Date('2022-12-03'),
    },
  ],
  // events: [
  //   {
  //     id:createEventId(),
  //     title:'设备OOP的使用',
  //     start: new Date().toISOString().replace(/T.*$/, '') + 'T09:30:00',
  //     end: new Date().toISOString().replace(/T.*$/, '') + 'T10:30:00'
  //   },
  //   {
  //     id:createEventId(),
  //     title:'设备MOX的使用',
  //     start: new Date().toISOString().replace(/T.*$/, '') + 'T13:00:00',
  //     end: new Date().toISOString().replace(/T.*$/, '') + 'T15:00:00'
  //   }
  // ]
  
}
const store = new Vuex.Store({
  state,
  plugins:[createPersistedState({
    storage:window.localStorage,
    reducer(state) {
      return {
        cu_role:state.cu_role //只持久化cu_role状态，可以根据需求配置其他状态
      };
    }
  })],
  mutations,
  actions,
  getters
})
export default store