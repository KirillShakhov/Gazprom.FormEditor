import React from 'react';
import { IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IPropertyConfig } from '../../../../interfaces/property-metadata';

interface ElementProps {
  config: IPropertyConfig;
  value: string;
  changeValue: (value: string) => void;
  cleanValue: () => void;
}

export const DateType: React.FC<ElementProps> = (props) => {
  const { config, value, changeValue, cleanValue } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={config.name}
          value={value === '' ? null : value}
          onChange={(e: any) => {
            if (e != null) {
              changeValue(e);
            } else {
              cleanValue();
            }
          }}
        />
      </LocalizationProvider>
      <IconButton
        aria-label="clean"
        component="label"
        onClick={() => {
          cleanValue();
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </div>
  );
};
