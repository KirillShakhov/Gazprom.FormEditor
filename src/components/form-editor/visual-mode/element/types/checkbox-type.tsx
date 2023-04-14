import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { Checkbox, FormControlLabel } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const CheckBoxType: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      value="start"
      style={{ width: '100%', marginLeft: 2 }}
      control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />}
      label={value.name}
      labelPlacement="end"
      disabled
    />
  );
};
