// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // Connect to the backend's Socket.IO server
// const socket = io('http://localhost:5000'); // Replace with your backend server URL

// function CurrentRound() {
//   const [currentRound, setCurrentRound] = useState(1); // Initial round value

//   useEffect(() => {
//     // Listen for 'round_acknowledgment' events from the backend
//     socket.on('round_acknowledgment', (data) => {
//       setCurrentRound(data.round);
//     });

//     // Cleanup socket connection on component unmount
//     return () => {
//       socket.off('round_acknowledgment');
//     };
//   }, []);

//   return (
//     <div style={styles.container}>
//       <div style={styles.spiral}></div>
//       <h5 style={styles.text}>Current Round: {currentRound}</h5>
//     </div>
//   );
// }

// // Styling for the component and animation
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '20px',
//   },
//   spiral: {
//     width: '50px',
//     height: '50px',
//     border: '8px solid #FFD7C4',
//     borderTop: '8px solid #C4D7FF',
//     borderRadius: '50%',
//     animation: 'spin 2s linear infinite', // Infinite spinning animation
//     marginBottom: '20px',
//   },
//   text: {
//     textAlign: 'center',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#333',
//   },
// };

// // Adding the CSS for animation using JavaScript
// const styleSheet = document.styleSheets[0];
// const keyframes =
//   `@keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }`;
// styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

// export default CurrentRound;


import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the backend's Socket.IO server
const socket = io('http://localhost:5000'); // Replace with your backend server URL

function CurrentRound() {
  const [currentRound, setCurrentRound] = useState(() => {
    // Retrieve saved current round from localStorage
    const savedRound = localStorage.getItem('currentRound');
    return savedRound ? JSON.parse(savedRound) : 1; // Default round is 1 if nothing is saved
  });

  useEffect(() => {
    // Listen for 'current_round' events from the backend
    socket.on('current_round', (data) => {
      setCurrentRound(data.round);
      // Save current round to localStorage
      localStorage.setItem('currentRound', JSON.stringify(data.round));
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.off('current_round');
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spiral}></div>
      <h5 style={styles.text}>Current Round: {currentRound}</h5>
    </div>
  );
}

// Styling for the component and animation
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
  spiral: {
    width: '50px',
    height: '50px',
    border: '8px solid #FFD7C4',
    borderTop: '8px solid #C4D7FF',
    borderRadius: '50%',
    animation: 'spin 2s linear infinite', // Infinite spinning animation
    marginBottom: '20px',
  },
  text: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
};

// Adding the CSS for animation using JavaScript
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default CurrentRound;
