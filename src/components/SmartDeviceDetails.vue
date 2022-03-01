<template>
  <div class="smart-device-details-root">
    <div @click="$emit('close')" class="exit-icon">&#10006</div>
    <div class="device-label">
      <img class="icon" :src="iconSrc" alt />
      <div class="device-name font-bold">{{ this.SmartDeviceDetails.name }}</div>
    </div>
    <div class="common-details">
      <div v-for="key in DetailsWithoutTheName()" class="details-row">
        <span class="font-bold details-key">{{ camelCaseToSentence(key) }}:</span>
        <span class="details-data">
          {{ this.camelToSentenceInLowerCase(this.SmartDeviceDetails[key]) }}
          <i
            v-html="this.suffix(key)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import camelCaseToSentence from "../lib/camelCaseToSentence";

export default {
  props: {
    SmartDeviceDetails: Object,
    iconSrc: String,
    position: Object
  },
  methods: {
    camelCaseToSentence,
    camelToSentenceInLowerCase(input) {
      const data = this.camelCaseToSentence(input)
      if (typeof data === 'string') {
        return data.toLocaleLowerCase()
      }
      return data
    },
    DetailsWithoutTheName() {
      return Object.getOwnPropertyNames(this.SmartDeviceDetails).filter(key => key != 'name')
    },
    suffix(key) {
      if (key === 'temperature') {
        return '&#8451;'
      }

      if (key === 'powerConsumption') {
        return 'W'
      }

      if (key === 'brightness') {
        return '/ 100'
      }

      return ''
    }
  },
  mounted() {
    this.$el.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
  }
}
</script>

<style scoped>
.smart-device-details-root {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0 10px;
  border-radius: 5px;
  padding: 5px 5px 10px 5px;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 100;
  touch-action: none;
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