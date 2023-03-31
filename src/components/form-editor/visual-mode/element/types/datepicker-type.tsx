import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface ElementProps {
  value: IFormControl;
}

export const DatePickerType: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleChange = function (event: any) {
    setDate(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={value.name} value={date} onChange={handleChange} disabled />
    </LocalizationProvider>
  );
};
