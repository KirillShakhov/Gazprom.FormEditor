import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { TextField } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const TextType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <div hidden={value.properties && value.properties.hasOwnProperty('hidden') && value.properties['hidden'] === true}>
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
      {value.properties && value.properties.hasOwnProperty('counter') && (
        <div
          style={{
            fontSize: 12,
            marginTop: 5,
            marginLeft: 5,
            color: '#9b9b9b',
          }}
        >
          Количество символов: 0
        </div>
      )}
    </div>
  );
};
