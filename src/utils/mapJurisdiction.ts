export default function mapJurisdiction(menu: any) {
  const permission: any[] = [];
  const mapPermission = function (children: any[]) {
    for (const item of children) {
      if (item.type == 1 || item.type == 2) {
        mapPermission(item.children ?? []);
      } else if (item.type == 3) {
        // console.log(item);
        permission.push(item.permission);
      }
    }
  };
  mapPermission(menu);
  return permission;
}
export function mapId(menu: any) {
  const id: any[] = [];
  const mapId1 = function (children: any[]) {
    for (const item of children) {
      if (item.children) {
        mapId1(item.children ?? []);
      } else {
        id.push(item.id);
      }
    }
  };
  mapId1(menu);
  return id;
}
