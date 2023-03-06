import { Box } from '@mui/material';
import React from 'react';
import './visual-mode.css';

interface VisualModeProps {
  value: string;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  return (
    <div className="box">
      <span>{props.value}</span>
    </div>
  );
};
