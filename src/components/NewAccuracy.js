// import React, { useEffect, useState, useCallback } from 'react';
// import { io } from 'socket.io-client';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// const socket = io('http://localhost:5000'); // Change to your backend URL

// function NewAccuracy() {
//   const [accuracyData, setAccuracyData] = useState([]);

//   // Function to update accuracy data and save it to local storage
//   const updateAccuracyData = useCallback((newData) => {
//     const updatedData = [...accuracyData, newData];
//     setAccuracyData(updatedData);
//     localStorage.setItem('accuracyData', JSON.stringify(updatedData));
//   }, [accuracyData]);

//   // Function to clear accuracy data
//   const clearAccuracyData = () => {
//     setAccuracyData([]);
//     localStorage.removeItem('accuracyData');
//   };

//   useEffect(() => {
//     // Load accuracy data from local storage when component mounts
//     const storedData = localStorage.getItem('accuracyData');
//     if (storedData) {
//       setAccuracyData(JSON.parse(storedData));
//     }

//     socket.on('accuracy_update', (data) => {
//       updateAccuracyData(data);
//     });

//     return () => {
//       socket.off('accuracy_update');
//     };
//   }, [updateAccuracyData]);

//   // Prepare data for the line chart
//   const chartData = {
//     labels: accuracyData.map(item => `Round ${item.round}`),
//     datasets: [
//       {
//         label: 'Accuracy (%)',
//         data: accuracyData.map(item => item.accuracy.toFixed(4) * 100),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderWidth: 2,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: '#333',
//           font: {
//             size: 14,
//             weight: 'bold',
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: '#333',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         callbacks: {
//           label: function(tooltipItem) {
//             return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`;
//           },
//         },
//         titleFont: {
//           size: 14,
//           weight: 'bold',
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         title: {
//           display: true,
//           text: 'Rounds',
//           color: '#666',
//           font: {
//             size: 16,
//             weight: 'bold',
//             family: 'Arial',
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: 'rgba(200, 200, 200, 0.3)',
//         },
//         title: {
//           display: true,
//           text: 'Accuracy',
//           color: '#87A2FF',
//           font: {
//             size: 16,
//             weight: 'bold',
//             family: 'Arial',
//           },
//         },
//         min: 0.5,
//         max: 1,
//         ticks: {
//           stepSize: 0.05,
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//   };

//   const buttonStyle = {
//     display: 'block',
//     width: '100%',
//     padding: '10px',
//     marginTop: '20px',
//     backgroundColor: '#ff6347',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#F4F4F9', padding: '20px', borderRadius: '8px' }}>
//       <h1 style={{ textAlign: 'center' }}>New Accuracy</h1>
//       {accuracyData.length === 0 ? (
//         <p style={{ textAlign: 'center', marginBottom: '30px' }}>No accuracy data received yet.</p>
//       ) : (
//         <Bar data={chartData} options={options} />
//       )}
//       {accuracyData.length > 0 && (
//         <button style={buttonStyle} onClick={clearAccuracyData}>
//           Clear Data
//         </button>
//       )}
//     </div>
//   );
// }

// export default NewAccuracy;
import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const socket = io('http://localhost:5000'); // Change to your backend URL

function NewAccuracy() {
  const [accuracyData, setAccuracyData] = useState([]);

  // Function to update accuracy data and save it to local storage
  const updateAccuracyData = useCallback((newData) => {
    const updatedData = [...accuracyData, newData];
    setAccuracyData(updatedData);
    localStorage.setItem('accuracyData', JSON.stringify(updatedData));
  }, [accuracyData]);

  // Function to clear accuracy data
  const clearAccuracyData = () => {
    setAccuracyData([]);
    localStorage.removeItem('accuracyData');
  };

  useEffect(() => {
    // Load accuracy data from local storage when component mounts
    const storedData = localStorage.getItem('accuracyData');
    if (storedData) {
      setAccuracyData(JSON.parse(storedData));
    }

    socket.on('accuracy_update', (data) => {
      updateAccuracyData(data);
    });

    return () => {
      socket.off('accuracy_update');
    };
  }, [updateAccuracyData]);

  // Prepare data for the bar chart
  const chartData = {
    labels: accuracyData.map(item => `Round ${item.round}`),
    datasets: [
      {
        label: 'Test Accuracy',
        data: accuracyData.map(item => item.accuracy.toFixed(4) * 100),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
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
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Global Model Test Accuracy per Round',
        color: '#000',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Arial',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold',
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
          text: 'Rounds',
          color: '#666',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
        title: {
          display: true,
          text: 'Accuracy (%)',
          color: '#87A2FF',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial',
          },
        },
        min: 50,
        max: 100,
        ticks: {
          stepSize: 5,
          color: '#333',
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
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#F4F4F9', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Global Model Test Accuracy</h1>
      {accuracyData.length === 0 ? (
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>No accuracy data received yet.</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
      {accuracyData.length > 0 && (
        <button style={buttonStyle} onClick={clearAccuracyData}>
          Clear Data
        </button>
      )}
    </div>
  );
}

export default NewAccuracy;
