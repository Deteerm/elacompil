<template>
  <div class="smart-device-root">
    <div>type: {{ this.id }}</div>
    <div>name</div>
    <div>connectionState</div>
  </div>
</template>

<script>
export default {
  props: {
    type: String, // 'bulb', 'outlet' or 'temperatureSensor';
    id: String,
    name: String,
    connectionState: String
  }
}
</script>

<style scoped>
.smart-device-root {
  border: 1px solid black;
  padding: 10px;
  width: fit-content;
}
</style>