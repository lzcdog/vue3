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
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  labelWidth: '100px',
  itemStyle: {
    paddingRight: '50px'
    // textAlign: 'left'
  },
  colLayout: {
    span: 24
  }
};
export default allFormProps;
