import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'
import router from './router'

// Supports weights 100-900
import '@fontsource-variable/onest';

const app = createApp(App);
app.use(router)
app.mount('#app')