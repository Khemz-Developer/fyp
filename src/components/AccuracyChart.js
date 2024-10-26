// AccuracyChart.js
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AccuracyChart = () => {
  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    fontSize: '2.0rem',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif'
  };
  const [rounds, setRounds] = useState([]);
  const [accuracies, setAccuracies] = useState([]);

  useEffect(() => {
    // Connect to MQTT broker
    const client = mqtt.connect('mqtt://192.168.8.100:8081'); // Use your broker's address

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('federated/accuracy');
    });

    client.on('message', (topic, message) => {
      if (topic === 'federated/accuracy') {
        const data = JSON.parse(message.toString());
        const { round_number, accuracy } = data;

        setRounds((prevRounds) => [...prevRounds, round_number]);
        setAccuracies((prevAccuracies) => [...prevAccuracies, accuracy]);
      }
    });

    return () => client.end(); // Cleanup on unmount
  }, []);

  const data = {
    labels: rounds, // X-axis labels (rounds)
    datasets: [
      {
        label: 'Model Accuracy',
        data: accuracies, // Y-axis data (accuracy per round)
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1, // Since accuracy is between 0 and 1
      },
    },
  };

  return (
    <div>
      <h1 style={headingStyle}>Federated Learning Accuracy Chart</h1>
      <h2>Global Model Accuracy Over Rounds</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default AccuracyChart;
