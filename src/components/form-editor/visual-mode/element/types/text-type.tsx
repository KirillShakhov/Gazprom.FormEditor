import React, { useEffect } from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const TextType: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [name, setName] = React.useState<string>(value.name);
  useEffect(() => {
    setName(value.name);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value,
    // });
  };

  return (
    <TextField
      label={name}
      onChange={handleChange}
      name={name}
      id={value.code}
      size={'small'}
      variant="outlined"
      value={'Значение'}
      disabled
      fullWidth
    />
  );
};
