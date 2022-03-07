import { useStore } from '../store/index';
export function usePermission(pageName: string, hanldeName: string): boolean {
  const store = useStore();
  const permission = store.state.login.permission;
  const verifyPermission = `system:${pageName}:${hanldeName}`;
  return !!permission.find((item: any) => item === verifyPermission);
}
