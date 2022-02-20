<template>
  <div @click="openDetials" class="smart-device-root">
    <div>
      <img :src="icon" alt />
    </div>
    <div class="device-name">{{ this.name }}</div>
    <div class="device-state">{{ this.connectionState }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: String, // 'bulb', 'outlet' or 'temperatureSensor';
    id: String,
    name: String,
    connectionState: String
  },
  computed: {
    icon() {
      return `src/assets/icons/icons8-${this.type}-64.png`
    }
  },
  methods: {
    openDetials(e) {
      this.$emit("openDetials", { id: this.id, type: this.type, name: this.name, connectionState: this.connectionState, iconSrc: this.icon })
    }
  }
}
</script>

<style scoped>
.smart-device-root {
  box-shadow: 0 0 10px;
  padding: 10px;
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.smart-device-root:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.device-name {
  font-size: 1.2em;
}

.device-state {
  color: green;
}
</style>