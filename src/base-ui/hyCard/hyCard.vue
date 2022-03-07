<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ cardName }}</span>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineComponent } from 'vue';
withDefaults(
  defineProps<{
    cardName?: string;
  }>(),
  {
    cardName: ''
  }
);
</script>

<style scoped></style>
