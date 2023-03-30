import React from 'react';
import { IPropertyConfig } from '../../../interfaces/property-metadata';
import { ParameterType } from './parameter-type';
import { IFormElement } from '../../../interfaces/form-element';

interface ElementProps {
  value: IFormElement;
  propertiesConfig: IPropertyConfig[];
  update: () => void;
}

export const ParameterTypesElements: React.FC<ElementProps> = (props) => {
  const { value, propertiesConfig, update } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {propertiesConfig.map((property, index) => {
        return <ParameterType propertiesConfig={property} key={index} value={value} update={update}></ParameterType>;
      })}
    </div>
  );
};
