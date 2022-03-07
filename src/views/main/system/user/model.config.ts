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
      filed: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      filed: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      optionValue: []
    },
    {
      filed: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      optionValue: []
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    paddingRight: '50px'
    // textAlign: 'left'
  },
  colLayout: {
    span: 24
  }
};
export default allFormProps;
