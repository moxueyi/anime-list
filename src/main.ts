import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from './store';
import setupRouter from './router';


const app = createApp(App);

setupStore(app);
setupRouter(app);

app.mount('#app');