import React from 'react';
import { TextField } from '@mui/material';
import { IPropertyConfig } from '../../../../interfaces/property-metadata';

interface ElementProps {
  config: IPropertyConfig;
  value: string;
  changeValue: (value: any) => void;
  cleanValue: () => void;
}

export const StringType: React.FC<ElementProps> = (props) => {
  const { config, value, changeValue, cleanValue } = props;

  return (
    <TextField
      id="outlined"
      label={config.name}
      size={'small'}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
          changeValue(event.target.value);
        } else {
          cleanValue();
        }
      }}
    />
  );
};
