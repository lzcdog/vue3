import { Module } from 'vuex';
import { accounDataType } from '../../network/login/index';
import { accountLogin, getUserInfo, getMenuData } from '../../network/login/index';
import localCacheInstance from '../../utils/cache';
import mapJurisdiction from '../../utils/mapJurisdiction';

import router from '../../router/index';
import { mapMenu } from '../../utils/mapMenu';
interface loginType {
  token: string;
  userInfo: any;
  menu: any;
  permission: any;
}
export interface loginState {
  login: loginType;
}
// export interface vuexModule extends loginState {
//   name: string;
// }
const loginModule: Module<loginType, any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menu: {},
      permission: []
    };
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload;
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload;
    },
    changeUserMenu(state, payload: any) {
      state.menu = payload;
      const routes = mapMenu(state.menu);
      routes.forEach((v) => {
        router.addRoute('main', v);
      });
    },
    changeUserPermission(state, payload: any) {
      state.permission = payload;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payLoad: accounDataType) {
      const loginData = await accountLogin(payLoad);
      console.log(loginData);
      const { id, token } = loginData.data;
      localCacheInstance.setCache('token', token);
      dispatch('getPageListAction', null, { root: true });
      if (payLoad.isKeepPassword) {
        localCacheInstance.setCache('accountInfo', {
          name: payLoad.name,
          password: window.btoa(payLoad.password)
        });
      } else {
        localCacheInstance.removeCache('accountInfo');
      }
      commit('changeToken', token);
      const userInfo = await getUserInfo(id);
      commit('changeUserInfo', userInfo.data);
      localCacheInstance.setCache('userInfo', userInfo.data);
      const menuData = await getMenuData(userInfo.data.role.id);
      console.log(menuData, 'menuData.datamenuData.datamenuData.data');

      const permission = mapJurisdiction(menuData.data);
      localCacheInstance.setCache('permission', permission);
      localCacheInstance.setCache('menu', menuData.data);
      commit('changeUserMenu', menuData.data);
      commit('changeUserPermission', permission);
      router.push('/main');
    },
    loadLocalLogin({ commit }) {
      const token = localCacheInstance.getCache('token');
      if (token) {
        commit('changeToken', token);
      }
      const userInfo = localCacheInstance.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const menu = localCacheInstance.getCache('menu');
      if (menu) {
        commit('changeUserMenu', menu);
      }
      const permission = localCacheInstance.getCache('permission');
      if (permission) {
        commit('changeUserPermission', permission);
      }
      const departmentData = localCacheInstance.getCache('departmentData');
      const roleData = localCacheInstance.getCache('roleData');
      if (departmentData) {
        commit('changeDepartmentDataList', departmentData, { root: true });
      }
      if (roleData) {
        commit('changeRoleDataList', roleData, { root: true });
      }
      const menuData = localCacheInstance.getCache('menuData');

      if (menuData) {
        commit('changeMenuDataList', menuData, { root: true });
      }
    }
  }
};

export default loginModule;
