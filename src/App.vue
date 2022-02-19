<template>
  <main>
    <div class="wrapper">
      <SmartDevice class="smart-device" v-for="n in 10" :id="n" />
    </div>
  </main>
</template>

<script>
import SmartDevice from './components/SmartDevice.vue'

export default {
  components: {
    SmartDevice
  },
  data() {
    return {
      SmartDevices: []
    }
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
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  align-items: center;
  justify-items: center;
}

.smart-device {
  margin: 10px;
}
</style>
