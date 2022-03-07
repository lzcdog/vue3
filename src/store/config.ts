import { loginState } from './login/login';
import { systemType } from './system/system';
import { productType } from './product/product';
import { analysisType } from './analysis/analysis';

export interface vuexModule extends loginState, systemType, productType, analysisType {
  name: string;
  departmentData: any[];
  roleData: any[];
  menuData: any[];
}
