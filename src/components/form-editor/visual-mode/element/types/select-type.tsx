import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const SelectType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <Box>
      <FormControl style={{ minWidth: 160 }} size={'small'} fullWidth>
        <InputLabel id="simple-select-type-label">{value.name}</InputLabel>
        <Select
          labelId="simple-select-type-label"
          id="demo-simple-select"
          // value={}
          label={value.name}
          disabled
          fullWidth
        >
          {/*<MenuItem value={10}>Ten</MenuItem>*/}
          {/*<MenuItem value={20}>Twenty</MenuItem>*/}
          {/*<MenuItem value={30}>Thirty</MenuItem>*/}
        </Select>
      </FormControl>
    </Box>
  );
};
