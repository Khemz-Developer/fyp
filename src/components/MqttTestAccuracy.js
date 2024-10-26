


import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MqttTestAccuracyBarChart = () => {
  const [accuracyData, setAccuracyData] = useState(() => {
    // Retrieve saved data from localStorage
    const savedData = localStorage.getItem('accuracyData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const client = mqtt.connect("ws://192.168.8.100:8083"); // Replace with your broker's WebSocket address

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("federated/test_accuracy", (err) => {
        if (!err) {
          console.log("Subscribed to federated/test_accuracy");
        }
      });
    });

    client.on("message", (topic, message) => {
      if (topic === "federated/test_accuracy") {
        const payload = JSON.parse(message.toString());
        setAccuracyData((prevData) => {
          const updatedData = [...prevData, { round: payload.round_number, accuracy: payload.test_accuracy }];
          localStorage.setItem('accuracyData', JSON.stringify(updatedData)); // Save to localStorage
          return updatedData;
        });
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const clearAccuracyData = () => {
    setAccuracyData([]); // Clear state
    localStorage.removeItem('accuracyData'); // Clear localStorage
  };

  const rounds = accuracyData.map((data) => `Round ${data.round}`);
  const accuracies = accuracyData.map((data) => data.accuracy);

  const data = {
    labels: rounds,
    datasets: [
      {
        label: "Test Accuracy",
        data: accuracies,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Global Model Test Accuracy per Round",
        color: "#000",
        font: {
          size: 20,
          weight: "bold",
          family: "Arial",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: {
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Rounds",
          color: "#666",
          font: {
            size: 16,
            weight: "bold",
            family: "Arial",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        title: {
          display: true,
          text: "Accuracy",
          color: "#87A2FF",
          font: {
            size: 16,
            weight: "bold",
            family: "Arial",
          },
        },
        min: 0.5,
        max: 1,
        ticks: {
          stepSize: 0.05,
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#F4F4F9", padding: "20px", borderRadius: "8px" }}>
      {accuracyData.length === 0 ? (
        <p style={{ textAlign: "center", marginBottom: "30px" }}>Nto accuracy data received yet.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
      {accuracyData.length > 0 && (
        <button style={buttonStyle} onClick={clearAccuracyData}>
          Clear Accuracy Data
        </button>
      )}
    </div>
  );
};

export default MqttTestAccuracyBarChart;
