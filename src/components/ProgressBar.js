import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ currentRound, totalRounds }) => {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <LinearProgress variant="determinate" value={progress} />
  );
};

export default ProgressBar;
