import mqtt from 'mqtt';

const brokerAddress = 'ws://192.168.8.100:8081';  // Use WebSocket connection
const options = {
  reconnectPeriod: 1000,
};

export const connectToMQTT = (setCurrentRound, setClients, setGlobalAccuracy) => {
  const client = mqtt.connect(brokerAddress, options);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('federated/weights');
    client.subscribe('federated/ack');
  });

  client.on('message', (topic, message) => {
    const payload = JSON.parse(message.toString());
    console.log('MQTT Message Received:', topic, payload);  // Log the incoming message

    if (topic === 'federated/weights') {
      const roundNumber = payload.round_number;
      setCurrentRound(roundNumber);

      if (payload.accuracy) {
        setGlobalAccuracy(prevAcc => [...prevAcc, payload.accuracy]);
      }
    }

    if (topic === 'federated/ack') {
      const clientIndex = payload.client_index;
      const newClient = {
        id: payload.client_id,
        status: 'Acknowledged',
        lastCommunication: new Date().toLocaleString(),
      };

      setClients(prevClients => {
        const updatedClients = [...prevClients];
        const clientIdx = updatedClients.findIndex(client => client.id === newClient.id);

        if (clientIdx >= 0) {
          updatedClients[clientIdx] = newClient;
        } else {
          updatedClients.push(newClient);
        }

        return updatedClients;
      });
    }
  });

  client.on('error', (err) => {
    console.error('MQTT connection error:', err);
  });
};
