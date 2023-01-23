import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import './assets/main.css'
import "primevue/resources/themes/tailwind-light/theme.css"
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app
.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    },
})
.use(PrimeVue)
.mount('#app')


