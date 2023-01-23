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
        key: 'AIzaSyB5gBrCERWIe3aYDiEv07LZQy7HCC8Mu58',
    },
})
.use(PrimeVue)
.mount('#app')


