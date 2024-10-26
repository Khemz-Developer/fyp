// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const AcknowledgmentComponent = () => {
//   const [acknowledgedRounds, setAcknowledgedRounds] = useState([]);

//   useEffect(() => {
//     const socket = io('http://localhost:5000'); // Adjust server URL as necessary

//     // Listen for acknowledgment messages
//     socket.on('round_acknowledgment', (data) => {
//       setAcknowledgedRounds((prevRounds) => [...prevRounds, data.round]);
//     });

//     // Clean up on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const containerStyle = {
//     padding: '20px',
//     backgroundColor: '#f4f4f9',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '500px',
//     margin: '0 auto',
    
//   };

//   const titleStyle = {
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: '15px'
//   };

//   const listStyle = {
//     listStyleType: 'none',
//     padding: 0
//   };

//   const listItemStyle = {
//     padding: '10px',
//     marginBottom: '10px',
//     backgroundColor: '#fff',
//     borderRadius: '4px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={titleStyle}>Client Acknowledgments</h2>
//       <ul style={listStyle}>
//         {acknowledgedRounds.map((round, index) => (
//           <li key={index} style={listItemStyle}>
//             All clients have acknowledged for round {round}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AcknowledgmentComponent;


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AcknowledgmentComponent = () => {
  const [acknowledgedRounds, setAcknowledgedRounds] = useState(() => {
    // Retrieve saved rounds from localStorage
    const savedRounds = localStorage.getItem('acknowledgedRounds');
    return savedRounds ? JSON.parse(savedRounds) : [];
  });

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Adjust server URL as necessary

    // Listen for acknowledgment messages
    socket.on('round_acknowledgment', (data) => {
      setAcknowledgedRounds((prevRounds) => {
        const updatedRounds = [...prevRounds, data.round];
        localStorage.setItem('acknowledgedRounds', JSON.stringify(updatedRounds)); // Save to localStorage
        return updatedRounds;
      });
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const clearAcknowledgments = () => {
    setAcknowledgedRounds([]); // Clear state
    localStorage.removeItem('acknowledgedRounds'); // Clear localStorage
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: '20px',
  };

  const titleStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '15px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Client Acknowledgments</h2>
      <ul style={listStyle}>
        {acknowledgedRounds.map((round, index) => (
          <li key={index} style={listItemStyle}>
            All clients have acknowledged for round {round}
          </li>
        ))}
      </ul>
      {acknowledgedRounds.length > 0 && (
        <button style={buttonStyle} onClick={clearAcknowledgments}>
          Clear Acknowledgments
        </button>
      )}
    </div>
  );
};

export default AcknowledgmentComponent;

