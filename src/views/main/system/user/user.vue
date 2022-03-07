<template>
  <div class="user">
    <div class="searchBox">
      <!-- <Hyform v-bind="allFormProps" v-model:formData="formData">
        <template #header>
          <div class="header">用户管理</div>
        </template>
        <template #footer>
          <div class="footer">
            <el-button :icon="Refresh">重置</el-button>
            <el-button type="primary" :icon="Search">搜索</el-button>
          </div>
        </template>
      </Hyform> -->
      <pageSearch :allFormProps="allFormProps" @resetBtnClick="resetBtnClick" @queryBtnClick="queryBtnClick">
      </pageSearch>
    </div>
    <div class="content">
      <pageContent
        @editPageList="editPageList"
        @addPageList="addPageList"
        ref="pageContentRef"
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
        ref="pageModelRef"
        :modelConfig="modelConfigRef"
        :dialogTitle="dialogTitle"
        :pageName="pageName"
      ></pageModel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import allFormProps from './form.config';
import pageSearch from '../../../../components/pageSearch/pageSearch.vue';
import pageContent from '../../../../components/pageContent/pageContent.vue';
import { usePageSearch } from '../../../../hooks/user-search-page';
import { useModel } from '../../../../hooks/use-model';

import { tableConfig } from './table.config';
import modelConfig from './model.config';
import pageModel from '../../../../components/page-model/page-model.vue';
export default defineComponent({
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  name: 'user',
  setup() {
    const store = useStore();
    const pageName = 'users';
    const storeName = 'system';
    const dialogTitle = '新增用户';
    //增加编辑
    const newCallback = () => {
      let isHiddenOption = modelConfig.formConfig.find((v) => {
        return v.filed == 'password';
      });
      if (isHiddenOption) {
        isHiddenOption.isHidden = false;
      }
    };
    const editCallback = () => {
      let isHiddenOption = modelConfig.formConfig.find((v) => {
        return v.filed == 'password';
      });
      if (isHiddenOption) {
        isHiddenOption.isHidden = true;
      }
    };
    //角色部门
    const modelConfigRef = computed(() => {
      let departmentOption = modelConfig.formConfig.find((v) => {
        return v.filed == 'departmentId';
      });
      if (departmentOption) {
        departmentOption.optionValue = store.state.departmentData.map((v: any) => {
          return {
            label: v.name,
            value: v.id
          };
        });
      }
      let roleOption = modelConfig.formConfig.find((v) => {
        return v.filed == 'roleId';
      });
      if (roleOption) {
        roleOption.optionValue = store.state.roleData.map((v: any) => {
          return {
            label: v.name,
            value: v.id
          };
        });
      }
      return modelConfig;
    });
    const [addPageList, editPageList, defaultInfo, pageModelRef] = useModel(newCallback, editCallback);
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch();
    return {
      allFormProps,
      tableConfig,
      pageName,
      resetBtnClick,
      queryBtnClick,
      pageContentRef,
      storeName,
      dialogTitle,
      modelConfigRef,
      pageModelRef,
      addPageList,
      editPageList,
      defaultInfo
    };
  }
});
</script>

<style scoped lang="less"></style>
