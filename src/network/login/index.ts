import HyRequest from '../index';

enum loginApi {
  accountLogin = '/login',
  getUserInfo = '/users/',
  getMenuInfo = '/role'
}
export interface accounDataType {
  name: string;
  password: string;
  isKeepPassword: boolean;
}
interface getUserInfoType {
  id: number;
}
type getMenuInfoType = getUserInfoType;
interface IDataType {
  code: string;
  data: any;
}
export function accountLogin(accounData: accounDataType) {
  return HyRequest.post<IDataType>({
    url: loginApi.accountLogin,
    isShowLoading: false,
    data: {
      name: accounData.name,
      password: accounData.password
    }
  });
}
export function getUserInfo(userId: getUserInfoType) {
  return HyRequest.get<IDataType>({
    url: loginApi.getUserInfo + userId,
    isShowLoading: false
  });
}
export function getMenuData(userId: getMenuInfoType) {
  return HyRequest.get<IDataType>({
    url: loginApi.getMenuInfo + '/' + userId + '/menu',
    isShowLoading: false
  });
}
