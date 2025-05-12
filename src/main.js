import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./app/routers/router.js";


import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'


const app = createApp(App);

app.use(router)
app.use(PrimeVue);
app.component('pv-card', Card);
app.component('pv-inputtext', InputText)
app.component('pv-password', Password)
app.component('pv-button', Button)

app.mount('#app');
