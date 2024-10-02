import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button"
import Checkbox from 'primevue/checkbox'

import './style.css'
import App from './App.vue'
const app = createApp(App)

app.component('Button', Button);
app.component('Checkbox', Checkbox);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')
