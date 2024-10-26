import React from 'react';
import MqttTestAccuracy from './components/MqttTestAccuracy';

import NewAccuracy from './components/NewAccuracy';

function App() {
  const headerStyle = {
    color: '#343131',
    textAlign: 'center',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <div className="App">
      <h1 style={headerStyle}>Federated Learning Dashboard</h1>
      {/* <CurrentRound /> */}
      {/* <MqttTestAccuracy /> */}
      
      
      <div style={{marginTop:'10px'}}>

        <NewAccuracy/>
        {/* <AcknowledgmentComponent /> */}
        {/* <TrainingCompletion /> */}
      </div>
    </div>
  );
}

export default App;