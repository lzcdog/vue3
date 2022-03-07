import { ref } from 'vue';
import pageModel from '../../../../components/page-model/page-model.vue';

export function useModel(newCallback?: () => void, editCallback?: () => void) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>();
  const defaultInfo = ref({});
  const addPageList = () => {
    defaultInfo.value = {};
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true;
    }
    console.log(newCallback);
    if (newCallback) {
      newCallback();
    }
  };
  const editPageList = (row: any) => {
    defaultInfo.value = { ...row };
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true;
    }
    if (editCallback) {
      editCallback();
    }
  };
  return [addPageList, editPageList, defaultInfo, pageModelRef];
}
