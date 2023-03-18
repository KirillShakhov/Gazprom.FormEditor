import React from 'react';
import { IFormControl } from '../../../../interfaces/form-control';

interface ElementProps {
  value: IFormControl;
}

export const Element: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return (
    <div style={{ marginTop: 20 }}>
      <span>name: {value.name}</span>
      <br />
      <span>type: {value.type}</span>
      <br />
      <span>dataSource: {value.dataSource}</span>
      <br />
      <span>code: {value.code}</span>
      <br />
      <span>properties: {JSON.stringify(value.properties)}</span>
    </div>
  );
};
