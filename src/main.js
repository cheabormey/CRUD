import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Create Vue app instance
const app = createApp(App);

// Set up router

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light', // Force light mode
            cssLayer: false
        }
    }
});
app.use(router);
app.mount('#app');