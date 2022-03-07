import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import {
  ElButton,
  ElInput,
  ElTabs,
  ElIcon,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBadge,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElConfigProvider,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus/lib/components';
import { App } from 'vue';

const elements = [
  ElButton,
  ElInput,
  ElTabs,
  ElIcon,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBadge,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElConfigProvider,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
];
export default function (app: App): void {
  for (const i of elements) {
    app.component(i.name, i);
  }
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
}
