import { ref } from 'vue';
import PageContent from '../components/pageContent/pageContent.vue';
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const resetBtnClick = () => {
    pageContentRef.value?.getPageData();
  };
  const queryBtnClick = (formData: any) => {
    pageContentRef.value?.getPageData(formData);
  };
  return [pageContentRef, resetBtnClick, queryBtnClick];
}
