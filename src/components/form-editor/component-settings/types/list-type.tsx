import React from 'react';
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {IPropertyConfig} from "../../../../interfaces/property-metadata";

interface ElementProps {
  config: IPropertyConfig;
  value: string;
  changeValue: (value: string) => void;
  cleanValue: () => void;
}

export const ListType: React.FC<ElementProps> = (props) => {
  const { config, value, changeValue, cleanValue } = props;

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="data-source-label">{config.name}</InputLabel>
      <Select
        labelId="data-source-label"
        id="data-source"
        value={value}
        label={config.name}
        onChange={(event: SelectChangeEvent) => {
          changeValue(event.target.value);
        }}
        fullWidth
      >
        {config.options?.map((param, index) => {
          return (
            <MenuItem value={param} key={index}>
              {param}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
