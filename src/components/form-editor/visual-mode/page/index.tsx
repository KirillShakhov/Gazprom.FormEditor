import React from 'react';
import { IFormGroup, ITabPage } from '../../../../interfaces/form-config';
import { Group } from '../group';

interface PageProps {
  value: ITabPage;
}

export const Page: React.FC<PageProps> = (props) => {
  const { value } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {value.items?.map((item, index) => {
        return <Group value={item as IFormGroup} key={index}></Group>;
      })}
    </div>
  );
};
