<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch @tab-click="tabclick">
      <el-tab-pane label="account">
        <template #label>
          <div class="iconText">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <!-- 账号登录组件 -->
        <loginAccount ref="loginAccountRef"></loginAccount>
      </el-tab-pane>
      <el-tab-pane label="phone">
        <template #label>
          <span class="iconText">
            <el-icon><Iphone /></el-icon>
            手机登录
          </span>
        </template>
        <!-- 手机登录组件 -->
        <loginPhone ref="loginPhoneRef"></loginPhone>
      </el-tab-pane>
    </el-tabs>
    <!-- 记住密码 -->
    <div class="control-input">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" href="https://element.eleme.io" target="_blank">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <div>
      <el-button type="primary" class="loginButton" @click="login">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import loginAccount from './login-account.vue';
import loginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    UserFilled,
    Iphone,
    loginAccount,
    loginPhone
  },
  setup() {
    let isKeepPassword = ref(true); //是否记住密码
    let loginAccountRef = ref<InstanceType<typeof loginAccount>>(); //账号登录组件ref
    let loginPhoneRef = ref<InstanceType<typeof loginPhone>>(); //账号登录组件ref
    let tabState = 'account'; // tab状态
    // tab点击
    const tabclick = (e: any) => {
      tabState = e.props.label;
      console.log(tabState);
    };
    //登录点击
    const login = () => {
      if (tabState == 'account') {
        loginAccountRef.value?.verify(isKeepPassword.value);
      } else {
        loginPhoneRef.value?.verify();
      }
    };
    return {
      isKeepPassword,
      loginAccountRef,
      loginPhoneRef,
      tabclick,
      tabState,
      login
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  text-align: center;
  margin-bottom: 80px;
}
.iconText {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.el-tabs--border-card > .el-tabs__content {
  padding: 15px 15px 25px 15px;
}
.control-input {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}
.loginButton {
  width: 320px;
  height: 40px;
}
</style>
