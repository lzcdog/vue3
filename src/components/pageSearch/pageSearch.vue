<template>
  <div class="searchBox">
    <Hyform v-bind="allFormProps" v-model="formData">
      <template #header>
        <div class="header">高级检索</div>
      </template>
      <template #footer>
        <div class="footer">
          <el-button :icon="Refresh" @click="handlerResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handlerSearchClick">搜索</el-button>
        </div>
      </template>
    </Hyform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Hyform from '../../base-ui/Hyform/Hyform.vue';
import { Refresh, Search } from '@element-plus/icons-vue';

export default defineComponent({
  props: {
    allFormProps: {
      type: Object,
      required: true
    }
  },
  components: {
    Hyform
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(prop, { emit }) {
    const formFile = prop.allFormProps?.formConfig ?? [];
    let nullFormData: any = {};
    for (let item of formFile) {
      nullFormData[item.filed] = '';
    }
    const formData = ref(nullFormData);
    const handlerResetClick = () => {
      // 用双向绑定的语法糖
      for (let item in nullFormData) {
        console.log(nullFormData[item]);

        formData.value[`${item}`] = nullFormData[item];
      }
      emit('resetBtnClick');
      // 不用双向绑定的语法糖
      // formData.value = nullFormData;
    };
    const handlerSearchClick = () => {
      emit('queryBtnClick', formData);
    };
    return {
      Refresh,
      Search,
      formData,
      handlerResetClick,
      handlerSearchClick
    };
  }
});
</script>

<style scoped>
.header {
  margin: 0 0 19px;
  font-weight: 700;
  font-size: 1.3em;
}
.footer {
  text-align: right;
  padding: 0 20px 20px 0;
}
.searchBox {
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
}
</style>
