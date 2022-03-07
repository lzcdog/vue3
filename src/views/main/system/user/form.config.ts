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
      filed: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      filed: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      optionValue: [
        {
          value: '启用',
          label: '1'
        },
        {
          value: '禁用',
          label: '0'
        }
      ]
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
