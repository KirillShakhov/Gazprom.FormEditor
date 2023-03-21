import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const RadioGroupType: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [valueCheckBox, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl style={{ marginLeft: 2 }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={valueCheckBox}
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
};
