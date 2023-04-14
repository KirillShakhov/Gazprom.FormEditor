import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import { Button } from '@mui/material';

interface ElementProps {
  value: IFormControl;
}

export const FileType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <div>
      <div style={{ fontSize: 12, color: '#a4a4a4', marginLeft: 3, marginBottom: 3 }}>{value.name}</div>
      <Button variant="contained" component="label" disabled>
        Upload File
        <input type="file" hidden />
      </Button>
    </div>
  );
};
