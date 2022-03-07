const tableConfig = {
  propList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '80'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '80'
    },
    {
      prop: 'imageUrl',
      label: '商品图片',
      minWidth: '80',
      slotName: 'imageUrl'
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
  headerTitle: '商品列表'
};
export { tableConfig };
