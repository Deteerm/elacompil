<template>
  <div class="smart-device-details-root">
    <div class="exit-icon">&#10006</div>
    <div class="device-label">
      <img class="icon" :src="iconSrc" alt />
      <div class="device-name font-bold">{{ this.SmartDeviceDetails.name }}</div>
    </div>
    <div class="common-details">
      <div v-for="key in DetailsWithoutTheName" class="details-row">
        <span class="font-bold details-key">{{ camelCaseToSentence(key) }}:</span>
        <span
          v-if="key === 'temperature'"
          class="details-data"
        >{{ this.SmartDeviceDetails[key] }}&degC</span>
        <span v-else class="details-data">{{ this.SmartDeviceDetails[key] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    SmartDeviceDetails: Object,
    iconSrc: String
  },
  computed: {
    DetailsWithoutTheName() {
      return Object.getOwnPropertyNames(this.SmartDeviceDetails).filter(key => key != 'name')
    }
  },
  methods: {
    camelCaseToSentence(input) {
      if (typeof input !== 'string') {
        return input
      }

      if (input === 'isTurnedOn') {
        return 'Turned On'
      }

      return input.replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
    }
  }
}
</script>

<style scoped>
.smart-device-details-root {
  position: absolute;
  bottom: -300px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0 10px;
  border-radius: 5px;
  padding: 5px 5px 10px 5px;
}

.device-label {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.device-name {
  font-size: 1.2em;
  margin: 0 10px 8px 10px;
}
.common-details {
  margin: 0 10px;
}
.details-row {
  display: flex;
}
.icon {
  width: 64px;
  height: 64px;
  margin: 10px 15px;
}
.details-key {
  min-width: 150px;
}
.details-data {
  margin-left: 10px;
}
.font-bold {
  font-weight: 500;
}
.exit-icon {
  position: absolute;
  top: 5px;
  right: 10px;
}

.exit-icon:hover {
  color: #a233ff;
  cursor: pointer;
}
</style>