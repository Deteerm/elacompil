export default function mockDeviceByType(device) {
  return (
    fetch(`/api/v1/devices/${device.id}`)
      //Mocking response from backend
      .then((_) => {
        if (device.type === "bulb") {
          return {
            //SmartBulb
            type: "bulb",
            id: device.id,
            name: device.name,
            connectionState: device.connectionState,
            isTurnedOn: Math.ceil(Math.random() * 100) % 2 === 0,
            brightness: Math.floor(Math.random() * 101),
            color: "#a163f5",
          };
        }

        if (device.type === "outlet") {
          return {
            //SmartOutlet
            type: "outlet",
            id: device.id,
            name: device.name,
            connectionState: device.connectionState,
            isTurnedOn: Math.ceil(Math.random() * 100) % 2 === 0,
            powerConsumption: Math.floor(Math.random() * 300), // in watts
          };
        }

        if (device.type === "temperatureSensor") {
          return {
            //SmartTemperatureSensor
            type: "temperatureSensor",
            id: device.id,
            name: device.name,
            connectionState: device.connectionState,
            temperature: Math.floor(Math.random() * 50) - 10, // in Celsius
          };
        } else throw new Error("Unknown device type");
      })
      .catch((e) => {
        alert("Error: " + e.message);
      })
  );
}
