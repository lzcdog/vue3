import { HyformType } from '../../../../base-ui/Hyform/Hyform';
interface objectType {
  [propName: string]: any;
}
interface allFormPropsType {
  formConfig: HyformType[];
  labelWidth?: string;
  itemStyle?: objectType;
  colLayout?: objectType;
}

const allFormProps: allFormPropsType = {
  formConfig: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      filed: 'createAt',
      type: 'datePicker',
      label: '创建事件',
      datePickerConfig: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    paddingRight: '50px',
    textAlign: 'left'
  },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
};
export default allFormProps;
