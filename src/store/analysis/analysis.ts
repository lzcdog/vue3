import { Module } from 'vuex';
import * as analysisRequest from '../../network/analysis/analysis';
export interface allAnalysisType {
  categoryGoodsCount: any[];
  categoryGoodsSale: any[];
  categoryGoodsFavor: any[];
  addressGoodsSale: any[];
}
export interface analysisType {
  analysis: allAnalysisType;
}
const analysis: Module<allAnalysisType, any> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, payload) {
      state.categoryGoodsCount = payload;
    },
    changeCategoryGoodsSale(state, payload) {
      state.categoryGoodsSale = payload;
    },
    changeCategoryGoodsFavor(state, payload) {
      state.categoryGoodsFavor = payload;
    },
    changeAddressGoodsSale(state, payload) {
      state.addressGoodsSale = payload;
    }
  },
  actions: {
    async categoryGoodsCountAction({ commit }, payload) {
      const allData: any = await Promise.all([
        analysisRequest.getCategoryGoodsCount(),
        analysisRequest.getCategoryGoodsSale(),
        analysisRequest.getCategoryGoodsFavor(),
        analysisRequest.getAddressGoodsSale()
      ]);
      // const categoryGoodsCountData: any = await analysisRequest.getCategoryGoodsCount();
      commit('changeCategoryGoodsCount', allData[0].data);
      // const categoryGoodsSaleData: any = await analysisRequest.getCategoryGoodsSale();
      commit('changeCategoryGoodsSale', allData[1].data);
      // const categoryGoodsFavorData: any = await analysisRequest.getCategoryGoodsFavor();
      commit('changeCategoryGoodsFavor', allData[2].data);
      // const addressGoodsSaleData: any = await analysisRequest.getAddressGoodsSale();
      commit('changeAddressGoodsSale', allData[3].data);
    }
  }
};
export default analysis;
