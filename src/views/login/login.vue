<template>
  <div class="login">
    <loadingPanel></loadingPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loadingPanel from './cnps/login-panel.vue';
export default defineComponent({
  name: 'login',
  components: {
    loadingPanel
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../assets/image/login/background.svg');
}
</style>
