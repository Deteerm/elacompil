<template>
  <main>
    <div class="wrapper">
      <SmartDevice
        class="smart-device"
        v-for="(device, index) in SmartDevices"
        :key="index"
        :id="device.id"
        :type="device.type"
        :name="device.name"
        :connectionState="device.connectionState"
        @openDetials="openDetials"
      />
      <SmartDeviceDetails
        v-if="detailsActive"
        :iconSrc="iconSrc"
        :SmartDeviceDetails="SmartDeviceDetails"
      />
      <h1>todo: ENDPOINT WebSocket</h1>
      <h1>todo: PopUpWindow dragging</h1>
    </div>
  </main>
</template>

<script>
import SmartDevice from './components/SmartDevice.vue';
import SmartDeviceDetails from './components/SmartDeviceDetails.vue'

export default {
  components: {
    SmartDevice,
    SmartDeviceDetails
  },
  data() {
    return {
      SmartDevices: [],
      SmartDeviceDetails: {},
      detailsActive: false,
      iconSrc: ''
    }
  },
  methods: {
    async openDetials(payload) {
      const device = payload

      this.detailsActive = true
      this.iconSrc = payload.iconSrc
      this.SmartDeviceDetails =

        //Mocking request to backend
        await fetch(`/api/v1/devices/${device.id}`).then(function (_) {
          if (device.type === 'bulb') {
            return {
              //SmartBulb
              type: 'bulb',
              id: device.id,
              name: device.name,
              connectionState: device.connectionState,
              isTurnedOn: Math.ceil(Math.random() * 100) % 2 === 0,
              brightness: Math.floor(Math.random() * 101),
              color: "#a163f5"
            }
          }

          if (device.type === 'outlet') {
            return {
              //SmartOutlet
              type: 'outlet',
              id: device.id,
              name: device.name,
              connectionState: device.connectionState,
              isTurnedOn: Math.ceil(Math.random() * 100) % 2 === 0,
              powerConsumption: Math.floor(Math.random() * 300), // in watts
            }
          }

          if (device.type === 'temperatureSensor') {
            return {
              //SmartTemperatureSensor
              type: 'temperatureSensor',
              id: device.id,
              name: device.name,
              connectionState: device.connectionState,
              temperature: Math.floor(Math.random() * 50) - 10 // in Celsius
            }
          }

          else throw new Error('Unknown device type')
        }).catch(e => {
          alert("Error: " + e.message)
        })
    }
  },
  created() {
    //mock data
    fetch('/api/v1/devices').then(_ => {
      this.SmartDevices = [
        {
          type: 'bulb',
          id: 'aaa',
          name: 'Bright Ball',
          connectionState: 'connected'
        },
        {
          type: 'bulb',
          id: 'aab',
          name: 'Bright Ball Two',
          connectionState: 'poorConnection'
        },
        {
          type: 'outlet',
          id: 'abb',
          name: 'Smart Socket',
          connectionState: 'connected'
        },
        {
          type: 'temperatureSensor',
          id: 'bbb',
          name: 'Old Termometer',
          connectionState: 'disconnected'
        },
        {
          type: 'bulb',
          id: 'bbc',
          name: 'Bright Ball Three',
          connectionState: 'connected'
        },
        {
          type: 'temperatureSensor',
          id: 'bcc',
          name: 'New Termometer',
          connectionState: 'connected'
        },
        {
          type: 'bulb',
          id: 'ccc',
          name: 'Bright Ball Four',
          connectionState: 'connected'
        },
        {
          type: 'outlet',
          id: 'ccd',
          name: 'Smart Socket Two',
          connectionState: 'poorConnection'
        },
        {
          type: 'outlet',
          id: 'cdd',
          name: 'Smart Socket Three',
          connectionState: 'connected'
        },
        {
          type: 'temperatureSensor',
          id: 'ddd',
          name: 'Another Termometer',
          connectionState: 'disconnected'
        }
      ]
    })
  }
}
</script>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 20px;
  grid-column-gap: 10px;
  align-items: center;
  justify-items: center;
}
</style>
