import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

interface ElementProps {
  value: IFormControl;
}

export const DatePickerType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
    </LocalizationProvider>
  );
};
