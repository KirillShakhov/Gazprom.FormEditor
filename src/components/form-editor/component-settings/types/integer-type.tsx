import React from 'react';
import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { IPropertyConfig } from '../../../../interfaces/property-metadata';

interface ElementProps {
  config: IPropertyConfig;
  value: number | undefined;
  changeValue: (value: any) => void;
  cleanValue: () => void;
}

export const IntegerType: React.FC<ElementProps> = (props) => {
  const { config, value, changeValue, cleanValue } = props;

  return (
    <NumericFormat
      customInput={TextField}
      label={config.name}
      value={value}
      size={'small'}
      onChange={(event) => {
        if (event.target.value !== '') {
          changeValue(Number(event.target.value));
        } else {
          cleanValue();
        }
      }}
    />
  );
};
