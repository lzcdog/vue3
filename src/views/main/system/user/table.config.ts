const tableConfig = {
  propList: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '80'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '80'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '80'
    },
    {
      prop: 'enable',
      label: '状态',
      minWidth: '80',
      slotName: 'enable'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '80',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '80',
      slotName: 'updateAt'
    },
    {
      prop: 'handler',
      label: '操作',
      minWidth: '70'
      // slotName: 'handler'
    }
  ],
  selectChange: (value: any) => {
    console.log(value);
  },
  headerTitle: '用户列表'
};
export { tableConfig };
