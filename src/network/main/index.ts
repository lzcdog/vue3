import HyRequest from '../../network/index';
export function getPageList(url: string, queryInfo: any = {}) {
  return HyRequest.post({
    url,
    data: queryInfo
  });
}

export function delPageList(url: string) {
  return HyRequest.delete({
    url: url
  });
}
export function addorupdatePageList(url: string, queryInfo: any = {}, method: string) {
  if (method == 'post') {
    return HyRequest.post({
      url,
      data: queryInfo
    });
  } else {
    return HyRequest.patch({
      url,
      data: queryInfo
    });
  }
}
