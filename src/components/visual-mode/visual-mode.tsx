import React from 'react';

interface VisualModeProps {
  value: string;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  return <div>{props.value}</div>;
};
