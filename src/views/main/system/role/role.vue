<template>
  <div class="role">
    <pageSearch :allFormProps="allFormProps" @resetBtnClick="resetBtnClick" @queryBtnClick="queryBtnClick"></pageSearch>
    <pageContent
      ref="pageContentRef"
      @editPageList="editPageList"
      @addPageList="addPageList"
      :tableConfig="tableConfig"
      :pageName="pageName"
      :storeName="storeName"
    >
      <template #createAt="scope">
        <div>{{ $utcFormat(scope.row.createAt) }}</div>
      </template>
      <template #updateAt="scope">
        <div>{{ $utcFormat(scope.row.updateAt) }}</div>
      </template>
    </pageContent>
    <pageModel
      :defaultInfo="defaultInfo"
      :default-checked-keys="defaultCheckedKeys"
      ref="pageModelRef"
      :modelConfig="modelConfig"
      :dialogTitle="dialogTitle"
      :pageName="pageName"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="treeRef"
        node-key="id"
        class="elTree"
        @check="check"
        :data="data"
        show-checkbox
        :props="defaultProps"
      />
    </pageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import { useStore } from '../../../../store/index';

import pageContent from '../../../../components/pageContent/pageContent.vue';
import pageSearch from '../../../../components/pageSearch/pageSearch.vue';
import pageModel from '../../../../components/page-model/page-model.vue';
import allFormProps from './form.config';
import { tableConfig } from './table.config';
import modelConfig from './model.config';

import { usePageSearch } from '../../../../hooks/user-search-page';
import { useModel } from '../../../../hooks/use-model';
import { mapId } from '../../../../utils/mapJurisdiction';

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const pageName = 'role';
    const store = useStore();
    const defaultCheckedKeys = ref();
    const treeRef: any = ref(null);
    const [addPageList, editPageList, defaultInfo, pageModelRef] = useModel();
    watch(
      () => defaultInfo,
      (newvalue: any) => {
        defaultCheckedKeys.value = mapId(newvalue.value.menuList);
        nextTick(() => {
          treeRef.value?.setCheckedKeys(defaultCheckedKeys.value);
        });
      },
      { deep: true }
    );
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch();
    const storeName = 'system';
    const dialogTitle = '新建角色';
    const defaultProps = {
      children: 'children',
      label: 'name'
    };
    const otherInfo = ref({});
    const data = computed(() => {
      return store.state.menuData;
    });
    const check = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      tableConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick,
      allFormProps,
      pageName,
      storeName,
      dialogTitle,
      defaultInfo,
      modelConfig,
      addPageList,
      editPageList,
      pageModelRef,
      defaultProps,
      data,
      check,
      otherInfo,
      defaultCheckedKeys,
      treeRef
    };
  }
});
</script>

<style scoped>
.elTree {
  margin-left: 20px;
}
</style>
