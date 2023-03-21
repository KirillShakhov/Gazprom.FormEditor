import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { FormControlLabel, Switch } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const SwitchType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <FormControlLabel
      value="start"
      style={{ width: '100%', marginLeft: 5 }}
      control={<Switch color="primary" value={true} disabled={true} />}
      label=""
      labelPlacement="end"
    />
  );
};
