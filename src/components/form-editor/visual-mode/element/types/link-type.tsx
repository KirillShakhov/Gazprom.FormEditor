import React from 'react';
import { IFormControl } from '../../../../../interfaces/form-control';
import Link from '@mui/material/Link';

interface ElementProps {
  value: IFormControl;
}

export const LinkType: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <Link component="button" variant="body2">
      {value.name}
    </Link>
  );
};
