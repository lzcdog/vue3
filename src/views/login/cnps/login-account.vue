<template>
  <div>
    <el-form :model="accountInfo" :rules="rules" label-width="60px" ref="elFormRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="accountInfo.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElForm } from 'element-plus/lib/components';
import { useStore } from 'vuex';
import localCacheInstance from '../../../utils/cache';

export default defineComponent({
  setup() {
    //使用vuex
    let store = useStore();
    //账号数据
    const localAccounInfo = localCacheInstance.getCache('accountInfo');
    let accountInfo = reactive({
      name: localAccounInfo ? localAccounInfo.name : '',
      password: localAccounInfo ? window.atob(localAccounInfo.password) : ''
    });

    //elform组件ref
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    //elform规则
    const rules = reactive({
      name: [
        {
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '账号必须为5~10个字符',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码必须为3个字符',
          trigger: 'blur'
        }
      ]
    });
    //验证
    const verify = (isKeepPassword: boolean) => {
      elFormRef.value?.validate((valid) => {
        if (valid) {
          accounLogin(isKeepPassword);
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    //登录
    const accounLogin = (isKeepPassword: boolean) => {
      store.dispatch('login/accountLoginAction', { ...accountInfo, isKeepPassword });
    };
    return {
      accountInfo,
      rules,
      verify,
      elFormRef,
      accounLogin
    };
  }
});
</script>

<style scoped></style>
