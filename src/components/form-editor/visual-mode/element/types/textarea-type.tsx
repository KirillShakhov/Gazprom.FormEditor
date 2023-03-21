import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const TextAreaType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value,
    // });
  };

  return (
    <TextField
      label={value.name}
      onChange={handleChange}
      name={value.name}
      id={value.code}
      size={'small'}
      variant="outlined"
      placeholder="Текст подсказки"
      multiline
      minRows={4}
      maxRows={6}
      disabled
      fullWidth
    />
  );
};
