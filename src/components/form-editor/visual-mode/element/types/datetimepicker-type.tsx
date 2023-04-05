import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface ElementProps {
  value: IFormControl;
}

export const DateTimePickerType: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const handleChange = function (event: any) {
    setDate(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label={value.name} value={date} onChange={handleChange} disabled />
    </LocalizationProvider>
  );
};
