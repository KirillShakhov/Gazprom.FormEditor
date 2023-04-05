import React, { useEffect } from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const TextType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <TextField
      label={value.name}
      name={value.name}
      id={value.code}
      size={'small'}
      variant="outlined"
      value={'Значение'}
      disabled
      fullWidth
    />
  );
};
