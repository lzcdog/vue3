import { createApp } from 'vue';
import App from './App.vue';
//全局引用element-plus
// import elementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import global from './global/index';
import router from '../src/router/index';
import store from '../src/store/index';
//引入normalize.css和base.css
import 'normalize.css';
import './assets/css/index.less';
import { setupStore } from './store/index';
setupStore();
const app = createApp(App);

global(app);
app.use(router);
app.use(store);
// app.use(elementPlus); //全局引用element-plus
app.mount('#app');
