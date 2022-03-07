const tableConfig = {
  propList: [
    {
      prop: 'name',
      label: '角色名',
      minWidth: '80'
    },
    {
      prop: 'intro',
      label: '权限结束',
      minWidth: '80'
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
    }
  ],
  selectChange: (value: any) => {
    console.log(value);
  },
  headerTitle: '角色列表'
};
export { tableConfig };
