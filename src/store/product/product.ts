import { Module } from 'vuex';
import { getPageList } from '../../network/main/index';
interface goodsType {
  goodsList?: any[];
  goodsCount?: number;
}
export interface productType {
  product: goodsType;
}

const product: Module<goodsType, any> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0
    };
  },
  mutations: {
    changeGoodsList(state, payload) {
      state.goodsList = payload;
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload;
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
    }
  }
};
export default product;
