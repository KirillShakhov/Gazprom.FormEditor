import React, { useCallback } from 'react';
import { IPropertyConfig, PROPERTY_VALUE_TYPE } from '../../../interfaces/property-metadata';
import { IFormElement } from '../../../interfaces/form-element';
import { IForm } from '../../../interfaces/form-config';
import { StringType } from './types/string-type';
import { IntegerType } from './types/integer-type';
import { BooleanType } from './types/boolean-type';
import { DateType } from './types/date-type';
import { ListType } from './types/list-type';

interface ElementProps {
  value: IFormElement | IForm;
  propertyConfig: IPropertyConfig;
  update: () => void;
}

export const PropertyConfig: React.FC<ElementProps> = (props) => {
  const { value, propertyConfig, update } = props;

  const getPropertyValue = useCallback(() => {
    if (propertyConfig.isOwnProperty == true) {
      const obj = value as any;
      if (obj.hasOwnProperty(propertyConfig.code)) {
        return obj[propertyConfig.code];
      }
    } else {
      if (value.properties === undefined) return '';
      if (value.properties.hasOwnProperty(propertyConfig.code)) {
        return value.properties[propertyConfig.code];
      }
    }
    return '';
  }, [propertyConfig, value]);

  const changeValue = (val: any) => {
    if (propertyConfig.isOwnProperty == true) {
      const obj = value as any;
      obj[propertyConfig.code] = val;
    } else {
      if (value.properties === undefined) value.properties = {};
      value.properties[propertyConfig.code] = val;
    }
    update();
  };

  const cleanValue = () => {
    if (propertyConfig.isOwnProperty == true) {
      const obj = value as any;
      if (obj.hasOwnProperty(propertyConfig.code)) {
        delete obj[propertyConfig.code];
      }
    } else {
      if (value.properties === undefined) return;
      if (value.properties.hasOwnProperty(propertyConfig.code)) {
        delete value.properties[propertyConfig.code];
      }
    }
    update();
  };

  return (
    <div>
      {propertyConfig.type == PROPERTY_VALUE_TYPE.STRING && (
        <StringType
          changeValue={changeValue}
          cleanValue={cleanValue}
          config={propertyConfig}
          value={getPropertyValue()}
        />
      )}
      {propertyConfig.type == PROPERTY_VALUE_TYPE.INTEGER && (
        <IntegerType
          changeValue={changeValue}
          cleanValue={cleanValue}
          config={propertyConfig}
          value={getPropertyValue() !== '' ? Number(getPropertyValue()) : undefined}
        />
      )}
      {propertyConfig.type == PROPERTY_VALUE_TYPE.BOOLEAN && (
        <BooleanType
          changeValue={changeValue}
          cleanValue={cleanValue}
          config={propertyConfig}
          value={getPropertyValue() === '' ? false : getPropertyValue()}
        />
      )}
      {propertyConfig.type == PROPERTY_VALUE_TYPE.DATE && (
        <DateType
          changeValue={changeValue}
          cleanValue={cleanValue}
          config={propertyConfig}
          value={getPropertyValue()}
        />
      )}
      {propertyConfig.type == PROPERTY_VALUE_TYPE.LIST && (
        <ListType
          changeValue={changeValue}
          cleanValue={cleanValue}
          config={propertyConfig}
          value={getPropertyValue()}
        />
      )}
    </div>
  );
};
