<template>
  <div>
    <el-container class="container">
      <el-aside :width="isFold ? '60.4px' : '210px'" class="aside">
        <navMenu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <navHeader @sendMainFold="mainFold"></navHeader>
        </el-header>
        <el-main class="main">
          <div class="mainView">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import navMenu from '@/components/nav-menu/navMenu.vue';
import navHeader from '../../components/nav-header/navHeader.vue';

export default defineComponent({
  // name: 'main',
  components: {
    navMenu,
    navHeader
  },
  setup() {
    let isFold = ref(false);
    const mainFold = (isClickFoldIcon: boolean) => {
      isFold.value = isClickFoldIcon;
    };
    return {
      mainFold,
      isFold
    };
  }
});
</script>

<style scoped lang="less">
.aside {
  background-color: #061d33;
  height: initial;
  transition: width 0.3s linear;
}
.main {
  text-align: center;
  background-color: #efeff3;
}
.header {
  line-height: 60px;
}
.container {
  height: 100vh;
}
</style>
