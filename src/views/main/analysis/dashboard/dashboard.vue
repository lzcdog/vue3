<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hyCard :cardName="categoryGoodsCountTitle1">
          <hyEcharts :option="option"></hyEcharts>
        </hyCard>
      </el-col>
      <el-col :span="10">
        <hyCard :cardName="addressGoodsSaleTitle"></hyCard>
      </el-col>
      <el-col :span="7">
        <hyCard :cardName="categoryGoodsCountTitle2"></hyCard>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <hyCard :cardName="categoryGoodsSaleTitle"></hyCard>
      </el-col>
      <el-col :span="12">
        <hyCard :cardName="categoryGoodsFavorTitle"></hyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../../../store/index';
import hyCard from '../../../../base-ui/hyCard/hyCard.vue';
import hyEcharts from '../../../../base-ui/hyEcharts/hyEcharts.vue';
// import hyCard from '../../../../base-ui/hyCard';

export default defineComponent({
  name: 'dashboard',
  components: {
    hyCard,
    hyEcharts
  },
  setup() {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    const categoryGoodsCountTitle1 = '分类商品数量(饼图)';
    const categoryGoodsCountTitle2 = '分类商品数量(玫瑰图)';
    const categoryGoodsSaleTitle = '分类商品的销量';
    const categoryGoodsFavorTitle = '分类商品的收藏';
    const addressGoodsSaleTitle = '不同城市商品销量';
    const store = useStore();
    store.dispatch('analysis/categoryGoodsCountAction');
    console.log(store.state.analysis.categoryGoodsCount);
    console.log(store.state.analysis.categoryGoodsSale);
    console.log(store.state.analysis.categoryGoodsFavor);
    console.log(store.state.analysis.addressGoodsSale);

    return {
      categoryGoodsCountTitle1,
      categoryGoodsCountTitle2,
      categoryGoodsSaleTitle,
      categoryGoodsFavorTitle,
      addressGoodsSaleTitle,
      option
    };
  }
});
</script>

<style scoped></style>
