import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
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
    <div hidden={value.properties && value.properties.hasOwnProperty('hidden') && value.properties['hidden'] === true}>
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
      {value.properties && value.properties.hasOwnProperty('hint') && (
        <div
          style={{
            fontSize: 12,
            marginTop: 5,
            marginLeft: 5,
            color: '#9b9b9b',
          }}
        >
          {value.properties['hint']}
        </div>
      )}
    </div>
  );
};
