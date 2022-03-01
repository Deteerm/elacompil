export default function mockSmartDevices() {
  const SmartDevices = [
    {
      type: "bulb",
      id: "aaa",
      name: "Bright Ball",
    },
    {
      type: "bulb",
      id: "aab",
      name: "Bright Ball Two",
    },
    {
      type: "outlet",
      id: "abb",
      name: "Smart Socket",
    },
    {
      type: "temperatureSensor",
      id: "bbb",
      name: "Old Termometer",
    },
    {
      type: "bulb",
      id: "bbc",
      name: "Bright Ball Three",
    },
    {
      type: "temperatureSensor",
      id: "bcc",
      name: "New Termometer",
    },
    {
      type: "bulb",
      id: "ccc",
      name: "Bright Ball Four",
    },
    {
      type: "outlet",
      id: "ccd",
      name: "Smart Socket Two",
    },
    {
      type: "outlet",
      id: "cdd",
      name: "Smart Socket Three",
    },
    {
      type: "temperatureSensor",
      id: "ddd",
      name: "Another Termometer",
    },
  ];

  SmartDevices.forEach((device) => {
    device.connectionState = randomDeviceConnectionState();
  });

  return SmartDevices;
}

function randomDeviceConnectionState() {
  return ["disconnected", "poorConnection", "connected"][
    Math.floor(Math.random() * 3)
  ];
}
