import React from 'react';
import { IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';

interface GroupProps {
  value: IFormGroup;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { value } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>
        {value.name} {value.direction}
      </span>
      {value.items?.map((item) => {
        return (
          <Element
            value={item as IFormControl}
            key={item.code}
            isSelected={false}
            onClick={() => {
              console.log('click');
            }}
          ></Element>
        );
      })}
    </div>
  );
};
