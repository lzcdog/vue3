const tableConfig = {
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '80'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '80'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '80'
    },
    {
      prop: 'icon',
      label: '菜单icon',
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
  headerTitle: '菜单列表',
  serialShow: false,
  selectionShow: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
};
export { tableConfig };
