<template>
  <div>
    <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="30%" center destroy-on-close>
      <Hyform v-bind="modelConfig" v-model="modelData"></Hyform>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '../../store/index';

import Hyform from '../../base-ui/Hyform/Hyform.vue';

export default defineComponent({
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageName: {
      type: String,
      default: ''
    },
    otherInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    Hyform
  },
  setup(props) {
    console.log(props.modelConfig);
    const store = useStore();
    let modelData = ref<any>({});
    const centerDialogVisible = ref(false);
    const confirm = () => {
      //编辑
      if (Object.keys(props.defaultInfo).length != 0) {
        store.dispatch('system/addorupdatePageListAction', {
          pageName: props.pageName,
          queryInfo: { id: props.defaultInfo.id, ...modelData.value, ...props.otherInfo }
        });
      }
      //新增
      else {
        store.dispatch('system/addorupdatePageListAction', {
          pageName: props.pageName,
          queryInfo: { ...modelData.value, ...props.otherInfo }
        });
      }
      centerDialogVisible.value = false;
    };
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (let item of props.modelConfig.formConfig) {
          modelData.value[item.filed] = newValue[item.filed];
        }
        console.log(modelData);
      }
    );
    return {
      modelData,
      centerDialogVisible,
      confirm
    };
  }
});
</script>

<style scoped></style>
