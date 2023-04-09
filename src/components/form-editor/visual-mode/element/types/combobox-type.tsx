import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { Autocomplete, TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const ComboBoxType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={[]}
      fullWidth
      size={'small'}
      disabled
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={value.name} />}
    />
  );
};
