<template>
  <div>
    <div class="logoBox">
      <img class="img" src="../../assets/image/login/logo.jpg" alt="logo" />
      <span class="title">coderLzc</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      active-text-color="white"
      class="el-menu-vertical-demo"
      background-color="#001228"
      text-color="rgb(191, 203, 217)"
      :collapse="isFold"
    >
      <template v-for="item in menu" :key="item.id">
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon"><component :is="iconComputed(item.icon)"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="menuItem in item.children" :key="menuItem.id">
              <el-menu-item :index="menuItem.id + ''" @click="elMenuItemClick(menuItem.url)">
                <el-icon v-if="menuItem.icon"><component :is="iconComputed(menuItem.icon)"></component></el-icon>
                <span>{{ menuItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else-if="item.type == 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon"><component :is="iconComputed(item.icon)"></component></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '../../store/index';
import { useRouter, useRoute } from 'vue-router';
import { routerDefaultActive } from '../../utils/mapMenu';

export default defineComponent({
  props: {
    isFold: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const menu = computed(() => {
      return store.state.login.menu;
    });
    const iconComputed = computed(() => {
      return function (icon: any) {
        return icon.split('el-icon-')[1];
      };
    });
    const elMenuItemClick = (url: string) => {
      router.push(url);
    };
    //根据url 菜单激活id
    const route = useRoute();
    let nowMenuInfo = routerDefaultActive(menu.value, route.path);
    console.log(nowMenuInfo, 'nowMenuInfonowMenuInfo');

    let defaultActive = nowMenuInfo.id + '';

    return {
      menu,
      iconComputed,
      elMenuItemClick,
      defaultActive
    };
  }
});
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  border-right: 1px solid #304156;
}
/deep/.is-active {
  background-color: #005bc1;
}
/deep/.el-menu {
  border-right: none;
}
.logoBox {
  display: flex;
  align-items: center;
  margin: 20px 0 20px 20px;
  .img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .title {
    font-size: 1.2em;
    color: white;
  }
}
</style>
