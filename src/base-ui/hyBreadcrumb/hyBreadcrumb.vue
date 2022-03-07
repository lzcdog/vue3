<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbData" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { breadcrumbDataType } from './hyBreadcrumb';

export default defineComponent({
  props: {
    breadcrumbData: {
      type: Array as PropType<breadcrumbDataType[]>,
      default: () => {
        return [];
      }
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
