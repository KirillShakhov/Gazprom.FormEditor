import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const NumberType: React.FC<ElementProps> = (props) => {
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
      // InputProps={{
      //   inputComponent: NumericFormat as never,
      // }}
      value={'Значение'}
      disabled
      fullWidth
    />
  );
};
