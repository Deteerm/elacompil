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
        :position="position"
        @close="detailsActive = false"
        class="smart-device-details"
      />
    </div>
  </main>
</template>

<script>
import SmartDevice from './components/SmartDevice.vue';
import SmartDeviceDetails from './components/SmartDeviceDetails.vue'
import interact from 'interactjs'
import SocketMock from 'socket.io-mock'

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
      activeDevice: null,
      iconSrc: '',
      position: {
        x: 0,
        y: 0,
      }
    }
  },
  methods: {
    async openDetials(payload) {
      const device = payload

      this.detailsActive = true
      this.activeDevice = device
      this.iconSrc = payload.iconSrc
      this.getDeviceDetails(device)
    },
    getDevices() {
      fetch('/api/v1/devices').then(_ => {
        this.SmartDevices = [
          {
            type: 'bulb',
            id: 'aaa',
            name: 'Bright Ball',
          },
          {
            type: 'bulb',
            id: 'aab',
            name: 'Bright Ball Two',
          },
          {
            type: 'outlet',
            id: 'abb',
            name: 'Smart Socket',
          },
          {
            type: 'temperatureSensor',
            id: 'bbb',
            name: 'Old Termometer',
          },
          {
            type: 'bulb',
            id: 'bbc',
            name: 'Bright Ball Three',
          },
          {
            type: 'temperatureSensor',
            id: 'bcc',
            name: 'New Termometer',
          },
          {
            type: 'bulb',
            id: 'ccc',
            name: 'Bright Ball Four',
          },
          {
            type: 'outlet',
            id: 'ccd',
            name: 'Smart Socket Two',
          },
          {
            type: 'outlet',
            id: 'cdd',
            name: 'Smart Socket Three',
          },
          {
            type: 'temperatureSensor',
            id: 'ddd',
            name: 'Another Termometer',
          }
        ]
        this.SmartDevices.forEach(device => {
          device.connectionState = this.randomDeviceConnectionState();
        })
      })
    },
    async getDeviceDetails(device) {
      this.SmartDeviceDetails = await fetch(`/api/v1/devices/${device.id}`)
        //Mocking response from backend
        .then(function (_) {
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
    },
    refresh() {
      this.getDevices()
      if (this.activeDevice) this.getDeviceDetails(this.activeDevice)
    },
    randomDeviceConnectionState() {
      return ['disconnected', 'poorConnection', 'connected'][Math.floor(Math.random() * 3)]
    }
  },
  computed: {
    restrictToWindow() {
      return interact.modifiers.restrictRect({
        restriction: { width: window.innerWidth, height: window.innerHeight }
      })
    }
  },
  created() {
    const io = new SocketMock() //io.('/api/v1/refresh')
    io.on('refresh', this.refresh)

    //Mock incoming MessageEvents from the server
    setInterval(() => {
      io.socketClient.emit('refresh')
    }, 15000)

    //mock request for data
    this.getDevices()

    const position = this.position;

    interact('.smart-device-details').draggable({
      modifiers: [this.restrictToWindow],
      listeners: {
        move(event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        },
      }
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
