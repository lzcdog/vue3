<template>
  <div class="hyEcharts" ref="hyEchartsRef" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { defineComponent, withDefaults, defineProps, onMounted, ref } from 'vue';
const prop = withDefaults(
  defineProps<{
    option: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%',
    height: '300px'
  }
);
const hyEchartsRef = ref<HTMLElement>();
onMounted(() => {
  console.log(hyEchartsRef.value);

  let echartsInstance = echarts.init(hyEchartsRef.value!);
  echartsInstance.setOption(prop.option);
});
</script>
<style scoped></style>
