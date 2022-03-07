<template>
  <div>
    <el-form :model="phoneInfo" :rules="rules" label-width="70px" ref="elFormRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phoneInfo.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="codeBox">
        <el-input v-model="phoneInfo.code"></el-input>
        <el-button type="primary" class="codeButton">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElForm } from 'element-plus/lib/components';

export default defineComponent({
  setup() {
    //手机数据
    let phoneInfo = reactive({
      num: '',
      code: ''
    });
    //elform Ref
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    //验证
    const verify = () => {
      console.log(12341);
      elFormRef.value?.validate((valid) => {
        if (valid) {
          accounLogin();
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    //登录
    const accounLogin = () => {
      console.log('能登录');
    };
    const rules = reactive({
      num: [
        {
          required: true,
          message: '手机不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          message: '手机号码不正确',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{4,}$/,
          message: '验证码格式不正确',
          trigger: 'blur'
        }
      ]
    });
    return {
      phoneInfo,
      rules,
      verify,
      elFormRef,
      accounLogin
    };
  }
});
</script>

<style scoped lang="less">
.codeButton {
  margin-left: 8px;
}
/deep/.el-form-item__content {
  flex-wrap: nowrap;
}
</style>
