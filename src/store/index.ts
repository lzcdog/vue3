import { createStore, Store, useStore as useVuexStore } from 'vuex';
import login from './login/login';
import system from './system/system';
import product from './product/product';
import analysis from './analysis/analysis';

import { getPageList } from '../network/main/index';
import localCacheInstance from '../utils/cache';

import { vuexModule } from './config';

const state = () => {
  return {
    name: '',
    departmentData: [],
    roleData: [],
    menuData: []
  };
};
const store = createStore({
  state,
  mutations: {
    changeDepartmentDataList(state, payload) {
      state.departmentData = payload;
    },
    changeRoleDataList(state, payload) {
      state.roleData = payload;
    },
    changeMenuDataList(state, payload) {
      state.menuData = payload;
    }
  },
  actions: {
    async getPageListAction({ commit }) {
      const departmentData: any = await getPageList(`/department/list`);
      const roleData: any = await getPageList(`/role/list`);
      const menuData: any = await getPageList(`/menu/list`);
      commit(`changeDepartmentDataList`, departmentData.data.list);
      localCacheInstance.setCache('departmentData', departmentData.data.list);
      localCacheInstance.setCache('roleData', roleData.data.list);
      commit(`changeRoleDataList`, roleData.data.list);
      localCacheInstance.setCache('menuData', menuData.data.list);
      commit(`changeMenuDataList`, menuData.data.list);
    }
  },
  modules: {
    login,
    system,
    product,
    analysis
  }
});
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}
export function useStore(): Store<vuexModule> {
  return useVuexStore();
}
export default store;
