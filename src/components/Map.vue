<script>
import axios from 'axios'
import moment from 'moment'
import "moment/dist/locale/nb";
import PButton from  'primevue/button'
import PSpinner from 'primevue/progressspinner';
import PMessage from 'primevue/message';

export default {
   name: 'App',
   components: {
    PButton, PSpinner, PMessage,
   },
   props: {
    title: {
        type: String,
        required: false,
        defaut: 'Kart som viser bysykkel stasjoner med status'
        }
   },
   data() {
    return {
      openedMarkerID: null,
      stations: [],
      center: { lat: 59.92690325987634, lng: 10.745410928102167 },
      loading: false,
      label: 'Oppdater kart',
      updated: '',
      error: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    openMarker(id) {
       this.openedMarkerID = id
    },
    async loadData() {  
        try {
            moment.locale('nb')
            this.loading = true;
            this.label = 'Laster...'
            const stations = []
            const station_information = await axios.get(`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`, {
                header: { 'Client-Identifier': 'christian-stenvik-bymonitor' },
            })
            const station_status = await axios.get(`https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`, {
                header: { 'Client-Identifier': 'christian-stenvik-bymonitor' },
            })

            station_information.data.data.stations.forEach((s) => {
                const status = station_status.data.data.stations.find((e) => e.station_id == s.station_id)
                const marker = {
                    id: s.station_id,
                    position: { lat: s.lat, lng: s.lon },
                    name: s.name,
                    address: s.address,
                    capacity: s.capacity ,
                    num_bikes_available: status?.num_bikes_available,
                    num_docks_available: status?.num_docks_available,
                    last_reported: moment.unix(status?.last_reported).fromNow(),     
                }
                stations.push(marker)     
            })
            this.stations = stations
            this.loading = false;
            this.label = 'Oppdater kart'
            this.updated = moment(Date.now()).fromNow()
        }
        catch(e) {
            console.log(e) 
            this.loading = false; 
            this.label = 'Oppdater kart'
            this.error = "Noe gikk galt ved henting av stasjoner. Vennligst prøv igjen!"
        } 
    },
  },

}
</script>

<template>
    <div>
        <h2>{{title}}</h2>
    </div>
    <GMapMap
        :center="center"
        :zoom="13"
        style="width: 100%; height: 900px"
    >
        <GMapMarker
        :key="index"
        v-for="(m, index) in stations"
        :position="m.position"
        :label="m.num_bikes_available.toString()+ '/' + m.capacity.toString()"
        :clickable="true"
        :draggable="true"
        @click="openMarker(m.id)" >
          <GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === m.id"
      >
        <div><b>{{ m.name }}</b><br/>
            Addresse: {{ m.address }}<br/>
            Tilgjengelige sykler: {{ m.num_bikes_available }}<br/>
            Tilgjengelige låser: {{ m.num_docks_available }}<br/>
            Status oppdatert for {{ m.last_reported }}<br/>
        </div>
      </GMapInfoWindow>
     </GMapMarker>
    </GMapMap>
    <div :style="{'margin-top':'10px'}">
        <PButton :label=label  @click="loadData()" :style="{'margin-right':'10px', 'min-width': '200px'}" />
        <PSpinner v-if="loading" style="width:35px;height:35px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="loading"/>
    </div>
    <div :style="{'margin-top':'10px'}">
        <PMessage v-if="this.updated && !this.error && !this.loading" severity="success" :life="5000" :sticky="false">Status oppdatert for {{ this.updated }}</PMessage>
        <PMessage v-if="this.error" severity="error">{{ this.error }}</PMessage> 
    </div>
  </template>
