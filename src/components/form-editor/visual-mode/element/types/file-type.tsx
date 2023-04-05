import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { Button } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const FileType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return <Button name={value.name} fullWidth></Button>;
};
