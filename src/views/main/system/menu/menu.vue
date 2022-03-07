<template>
  <div class="menu">
    <div class="content">
      <pageContent
        ref="pageContentRef"
        :tableConfig="tableConfig"
        :pageName="pageName"
        :storeName="storeName"
        :childrenProps="childrenProps"
      >
        <template #createAt="scope">
          <div>{{ $utcFormat(scope.row.createAt) }}</div>
        </template>
        <template #updateAt="scope">
          <div>{{ $utcFormat(scope.row.updateAt) }}</div>
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
  name: 'menu1',
  components: {
    pageContent
  },
  setup() {
    const pageName = 'menu';
    const storeName = 'system';
    return {
      tableConfig,
      pageName,
      storeName
    };
  }
});
</script>

<style scoped></style>
