<template>
  <div class="smart-device-details-root">
    <img class="icon" :src="iconSrc" alt />
    <div class="common">
      <div>id: {{ this.SmartDeviceDetails.id }}</div>
      <div>name: {{ this.SmartDeviceDetails.name }}</div>
      <div>connectionState: {{ this.SmartDeviceDetails.connectionState }}</div>
    </div>
    <div class="specific">
      <p>isTurnedOn</p>
      <p>brightness</p>
      <p>color</p>
      <p>powerConsumption</p>
      <p>temperature</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    SmartDeviceDetails: Object,
    iconSrc: String
  }
}
</script>

<style scoped>
.smart-device-details-root {
  position: absolute;
  bottom: -150px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.icon {
  width: 64px;
  height: 64px;
}
</style>