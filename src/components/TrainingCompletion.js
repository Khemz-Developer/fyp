import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend's Socket.IO server
const socket = io('http://localhost:5000'); // Adjust the URL to match your backend server

function TrainingCompletion() {
  const [trainingComplete, setTrainingComplete] = useState(false);

  useEffect(() => {
    // Listen for the 'training_complete' event from the backend
    socket.on('training_complete', (data) => {
      if (data.status === 'complete') {
        setTrainingComplete(true);
      }
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      socket.off('training_complete');
    };
  }, []);

  return (
    <div style={{marginTop: '40px',}}>
      {trainingComplete ? (
        <div style={styles.completeMessage}>
          🎉 Training process is complete! 🎉
        </div>
      ) : (
        <div style={styles.inProgressMessage}>
          Training is still in progress...
        </div>
      )}
    </div>
  );
}

// Simple styles for the messages
const styles = {
  completeMessage: {
    padding: '20px',
    backgroundColor: '#C4D7FF',
    color: '#343131',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  
  },
  inProgressMessage: {
    padding: '20px',
    backgroundColor: '#C4D7FF',
    color: '#343131',
    border: '1px solid #ffeeba',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

export default TrainingCompletion;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // Connect to the backend's Socket.IO server
// const socket = io('http://localhost:5000'); // Adjust the URL to match your backend server

// function TrainingCompletion() {
//   const [trainingComplete, setTrainingComplete] = useState(false);

//   useEffect(() => {
//     // Listen for the 'training_complete' event from the backend
//     socket.on('training_complete', (data) => {
//       if (data.status === 'complete') {
//         setTrainingComplete(true);
//       }
//     });

//     // Cleanup the socket connection when the component is unmounted
//     return () => {
//       socket.off('training_complete');
//     };
//   }, []);

//   return (
//     <footer style={styles.footer}>
//       {trainingComplete ? (
//         <div style={styles.completeMessage}>
//           🎉 Training process is complete! 🎉
//         </div>
//       ) : (
//         <div style={styles.inProgressMessage}>
//           Training is still in progress...
//         </div>
//       )}
//     </footer>
//   );
// }

// // Simple styles for the footer and messages
// const styles = {
//   footer: {
//     position: 'fixed',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#f8f9fa',
//     padding: '30px',
//     textAlign: 'center',
//     borderTop: '1px solid #dee2e6',
//     marginRight: '10px',
//   },
//   completeMessage: {
//     backgroundColor: '#C4D7FF',
//     color: '#343131',
//     border: '1px solid #c3e6cb',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//     fontSize: '18px',
//   },
//   inProgressMessage: {
//     backgroundColor: '#C4D7FF',
//     color: '#343131',
//     border: '1px solid #ffeeba',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//     fontSize: '18px',
//   },
// };

// export default TrainingCompletion;

