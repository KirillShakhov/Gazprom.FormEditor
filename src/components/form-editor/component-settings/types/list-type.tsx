import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
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
