import HyRequest from '../index';
enum DashboardApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return HyRequest.get({
    url: DashboardApi.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return HyRequest.get({
    url: DashboardApi.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return HyRequest.get({
    url: DashboardApi.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return HyRequest.get({
    url: DashboardApi.addressGoodsSale
  });
}
