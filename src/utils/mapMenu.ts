import { RouteRecordRaw } from 'vue-router';
import { breadcrumbDataType } from '../base-ui/hyBreadcrumb/hyBreadcrumb';

let firstRoute: any = null;
export function mapMenu(stateMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];

  //先遍历全部路由文件
  const allFile = require.context('../router/main', true, /\.ts/);
  allFile.keys().map((v) => {
    const vmodule = require('../router/main' + v.split('.')[1]);
    allRoutes.push(vmodule.default);
  });
  //对比state里面的进行筛选
  const recursion = function (menu: any) {
    for (const i of menu) {
      if (i.type == 2) {
        const trueRouter = allRoutes.find((v) => {
          return v.path == i.url;
        });
        if (trueRouter) {
          routes.push(trueRouter);
        }
        if (!firstRoute) {
          firstRoute = i;
        }
      } else {
        recursion(i.children);
      }
    }
  };
  recursion(stateMenu);
  return routes;
}
export { firstRoute };
export function routerDefaultActive(menu: any, route: string, hyBreadcrumbData?: breadcrumbDataType[]): any {
  for (const i of menu) {
    if (i.type == 2) {
      if (i.url == route) {
        return i;
      }
    } else {
      const nowMenu = routerDefaultActive(i.children ?? [], route);
      if (nowMenu) {
        hyBreadcrumbData?.push({
          name: i.name
        });
        hyBreadcrumbData?.push({
          name: nowMenu.name
        });
        return nowMenu;
      }
    }
  }
}
export function getHyBreadcrumbData(menu: any, route: string): any {
  console.log(menu, route);

  const hyBreadcrumbData: any = [];
  routerDefaultActive(menu, route, hyBreadcrumbData);

  return hyBreadcrumbData;
}
