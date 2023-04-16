import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { IPropertyConfig } from '../../../../interfaces/property-metadata';

interface ElementProps {
  config: IPropertyConfig;
  value: boolean;
  changeValue: (value: boolean) => void;
  cleanValue: () => void;
}

export const BooleanType: React.FC<ElementProps> = (props) => {
  const { config, value, changeValue, cleanValue } = props;

  return (
    <FormControlLabel
      value="start"
      style={{ width: '100%', marginLeft: 2 }}
      control={
        <Checkbox
          checked={value}
          onChange={(e) => {
            if (e.target.checked) {
              changeValue(true);
            } else {
              cleanValue();
            }
          }}
          size={'small'}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={config.name}
      labelPlacement="end"
    />
  );
};
