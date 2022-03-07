<template>
  <div class="navHeader">
    <div class="iconBox">
      <el-icon @click="foldIconClick">
        <component :is="isClickFoldIcon ? 'ArrowRightBold' : 'ArrowLeftBold'"></component>
      </el-icon>
      <hyBreadcrumb :breadcrumbData="breadcrumbData"></hyBreadcrumb>
    </div>
    <div class="userInfo">
      <div class="userInfoicon">
        <el-icon :size="20"><component :is="bell"></component></el-icon>
        <el-icon :size="20"><component :is="ChatDotRound"></component></el-icon>

        <el-badge is-dot class="item">
          <el-icon :size="20"><component :is="Postcard"></component></el-icon>
        </el-badge>
      </div>

      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="40" :src="require('../../assets/image/login/logo.jpg')"></el-avatar>
          <span class="userName">{{ userName }}</span>
          <!-- <el-icon class="el-icon--right">
            <component :is="arrow - down"></component>
          </el-icon> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item>系统信息</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import hyBreadcrumb from '../../base-ui/hyBreadcrumb/hyBreadcrumb';
import { getHyBreadcrumbData } from '../../utils/mapMenu';
import localCacheInstance from '../../utils/cache';
export default defineComponent({
  emits: ['sendMainFold'],
  components: {
    hyBreadcrumb
  },
  setup(proxy, content) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const userName = store.state.login.userInfo.name;
    const bell = 'bell';
    const ChatDotRound = 'ChatDotRound';
    const Postcard = 'Postcard';
    const src = '../../assets/image/login/logo.jpg';
    let isClickFoldIcon = ref(false);
    const foldIconClick = () => {
      isClickFoldIcon.value = !isClickFoldIcon.value;
      content.emit('sendMainFold', isClickFoldIcon.value);
    };
    let breadcrumbData = computed(() => {
      return getHyBreadcrumbData(store.state.login.menu, route.path);
    });
    const loginOut = () => {
      localCacheInstance.removeCache('token');
      router.push('/login');
    };
    return {
      foldIconClick,
      isClickFoldIcon,
      userName,
      bell,
      ChatDotRound,
      Postcard,
      src,
      breadcrumbData,
      loginOut
    };
  }
});
</script>

<style scoped lang="less">
.navHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  .iconBox {
    display: flex;
    align-items: center;
  }
  .userInfo {
    display: flex;
    align-items: center;
    .img {
      width: 40px;
      height: 40px;
    }
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.userName {
  font-weight: 700;
  margin-left: 5px;
}
.userInfoicon {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 30px;
  cursor: pointer;
}
.item {
  display: flex;
  align-items: center;
}
.is-fixed {
  top: 2px;
}
</style>
