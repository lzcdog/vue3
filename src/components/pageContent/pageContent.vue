<template>
  <div class="content">
    <hyTable v-model:page="pageInfo" :tableData="pageList" v-bind="tableConfig" :currentPage="pageCount">
      <template #otherFun>
        <el-button type="primary" v-if="isCreate" @click="addPageList"> 新增用户 </el-button>
      </template>
      <!-- <template #enable="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '开启' : '禁用'
        }}</el-button>
      </template> -->
      <!-- <template #createAt="scope">
        <div>{{ $utcFormat(scope.row.createAt) }}</div>
      </template>
      <template #updateAt="scope">
        <div>{{ $utcFormat(scope.row.updateAt) }}</div>
      </template> -->
      <template #handler="scope">
        <el-button type="text" :icon="Edit" v-if="isUpdate" @click="editPageList(scope.row)">编辑</el-button>
        <el-button type="text" :icon="Delete" v-if="isDelete" @click="delPageList(scope.row)">删除</el-button>
      </template>
      <template v-for="item in tableConfig.propList" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import hyTable from '../../base-ui/hyTable/hyTable.vue';
import { useStore } from '../../store/index';
import { Edit, Delete } from '@element-plus/icons-vue';
import { usePermission } from '../../hooks/use-permission';

export default defineComponent({
  components: {
    hyTable
  },
  props: {
    tableConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    pageName: {
      type: String,
      required: true
    },
    storeName: {
      type: String,
      required: true
    }
  },
  setup(props: any, { emit }) {
    const store = useStore();
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    let pageInfo = ref({
      currentPage: 0,
      pageSize: 10
    });
    watch(pageInfo, (newValue) => {
      pageInfo.value = newValue;
      getPageData();
    });
    const getPageData = (formData: any = {}) => {
      if (!isQuery) return;
      store.dispatch(`${props.storeName}/getPageListAction`, {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage,
          size: pageInfo.value.pageSize,
          ...formData.value
        }
      });
    };
    getPageData();
    const pageList = computed(() => {
      let resultList = null;
      switch (props.pageName) {
        case 'users':
          resultList = store.state.system.userList;
          break;
        case 'role':
          resultList = store.state.system.roleList;
          break;
        case 'menu':
          resultList = store.state.system.menuList;
          break;
        case 'goods':
          console.log(store.state.product);
          resultList = store.state.product.goodsList;
          break;
        default:
          break;
      }
      return resultList;
    });
    const pageCount = computed(() => {
      let resultCount = null;
      switch (props.pageName) {
        case 'users':
          resultCount = store.state.system.userCount;
          break;
        case 'role':
          resultCount = store.state.system.roleCount;
          break;
        case 'menu':
          resultCount = store.state.system.menuCount;
          break;
        case 'goods':
          resultCount = store.state.product.goodsCount;
          break;
        default:
          break;
      }
      return resultCount;
    });
    const delPageList = (row: any) => {
      store.dispatch(`${props.storeName}/delPageListAction`, {
        pageName: props.pageName,
        queryInfo: {
          id: row.id
        }
      });
    };
    const addPageList = () => {
      emit('addPageList');
    };
    const editPageList = (row: any) => {
      emit('editPageList', row);
    };

    return {
      pageList,
      pageCount,
      Edit,
      Delete,
      getPageData,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      delPageList,
      addPageList,
      editPageList
    };
  }
});
</script>

<style scoped lang="less">
.content {
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;
}
/deep/.el-table__fixed-body-wrapper {
  z-index: auto !important;
}
</style>
