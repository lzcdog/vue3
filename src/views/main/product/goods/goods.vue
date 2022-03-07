<template>
  <div class="goods">
    <div class="content">
      <pageContent ref="pageContentRef" :tableConfig="tableConfig" :pageName="pageName" :storeName="storeName">
        <template #enable="scope">
          <el-button plain size="small" :type="!scope.row.status ? 'success' : 'danger'">{{
            !scope.row.status ? '开启' : '禁用'
          }}</el-button>
        </template>
        <template #imageUrl="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]">
          </el-image>
        </template>
      </pageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageContent from '../../../../components/pageContent/pageContent.vue';
import { tableConfig } from './table.config';
export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    const pageName = 'goods';
    const storeName = 'product';
    return {
      tableConfig,
      pageName,
      storeName
    };
  }
});
</script>

<style scoped></style>
