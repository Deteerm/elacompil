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

import mockSmartDevices from './lib/mockSmartDevices'
import mockDeviceByType from './lib/mockDeviceByType'

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
      },
      interactable: null
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
        this.SmartDevices = mockSmartDevices()
      })
    },
    async getDeviceDetails(device) {
      this.SmartDeviceDetails = await mockDeviceByType(device)
    },
    refresh() {
      this.getDevices()
      if (this.activeDevice) this.getDeviceDetails(this.activeDevice)
    },
    restrictToWindow() {
      return interact.modifiers.restrictRect({
        restriction: {
          width: document.body.clientWidth, height: document.body.clientHeight
        }
      })
    },
    defineInteractable() {
      const position = this.position;

      this.interactable = interact('.smart-device-details').draggable({
        modifiers: [this.restrictToWindow()],
        listeners: {
          move(event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
              `translate(${position.x}px, ${position.y}px)`
          },
        }
      })

      window.removeEventListener('load', this.defineInteractable)
    },
    recalculateRestict() {
      console.log('aa')
      this.interactable.draggable({
        modifiers: [this.restrictToWindow()]
      })
    },
    debounce(func, timeout = 300) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, timeout);
      };
    }
  },
  computed: {
    debouncedRestrict() {
      return this.debounce(this.recalculateRestict)
    }
  },
  created() {
    const io = new SocketMock() //io.('/api/v1/refresh')
    io.on('refresh', this.refresh)

    window.onload = this.defineInteractable

    //Mock incoming MessageEvents from the server
    const refreshSocket = () => {
      io.socketClient.emit('refresh')
    }

    setInterval(refreshSocket, 15000)

    //mock request for data
    this.getDevices()
  },
  mounted() {
    window.addEventListener('resize', this.debouncedRestrict)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.debouncedRestrict)
    clearInterval(refreshSocket)
  },
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
