import { Module } from 'vuex';
import { getPageList, delPageList, addorupdatePageList } from '../../network/main/index';
interface userInfo {
  userList?: any[];
  userCount?: number;
  roleList?: any[];
  roleCount?: number;
  menuList?: any[];
  menuCount?: number;
}
export interface systemType {
  system: userInfo;
}

const system: Module<userInfo, any> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  mutations: {
    changeUsersList(state, payload) {
      state.userList = payload;
    },
    changeUsersCount(state, payload) {
      state.userCount = payload;
    },
    changeRoleList(state, payload) {
      state.roleList = payload;
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload;
    },
    changeMenuList(state, payload) {
      state.menuList = payload;
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageName: string = payload.pageName;
      let pageUrl = '';
      pageUrl = `/${pageName}/list`;
      const pageList: any = await getPageList(pageUrl, payload.queryInfo);
      const changePageName = (pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, pageList.data.list);
      commit(`change${changePageName}Count`, pageList.data.totalCount);
    },
    async delPageListAction({ dispatch }, payload) {
      const pageName: string = payload.pageName;
      let pageUrl = '';
      pageUrl = `/${pageName}/${payload.queryInfo.id}`;
      await delPageList(pageUrl);
      dispatch('getPageListAction', { pageName: payload.pageName });
    },
    async addorupdatePageListAction({ dispatch }, payload) {
      const pageName: string = payload.pageName;
      let method = '';
      let pageUrl = '';
      if (payload.queryInfo.id) {
        pageUrl = `/${pageName}/${payload.queryInfo.id}`;
        method = 'patch';
      } else {
        pageUrl = `/${pageName}`;
        method = 'post';
      }
      await addorupdatePageList(pageUrl, { ...payload.queryInfo }, method);
      dispatch('getPageListAction', { pageName: payload.pageName });
    }
  }
};
export default system;
