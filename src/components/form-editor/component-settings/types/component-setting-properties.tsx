import React, { useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { IPropertyConfig, IPropertyMetadata } from '../../../../interfaces/property-metadata';
import { ParameterType } from '../parameter-type';

interface ElementProps {
  value: IFormControl;
  config: IPropertyMetadata;
  update: () => void;
}

export const ComponentSettingProperties: React.FC<ElementProps> = (props) => {
  const { value, config, update } = props;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    value.name = event.target.value;
    update();
  };

  const getSettingComponent = (): IPropertyConfig[] | undefined => {
    switch (value.type) {
      case CONTROL_TYPE.TEXT:
        return config.byParameterType.STRING;
      case CONTROL_TYPE.NUMBER:
        return config.byParameterType.NUMBER;
      case CONTROL_TYPE.CHECKBOX:
        return config.byParameterType.BOOLEAN;
      case CONTROL_TYPE.SWITCH:
        return config.byParameterType.BOOLEAN;
      case CONTROL_TYPE.DATEPICKER:
        return config.byParameterType.DATE;
      case CONTROL_TYPE.DATETIMEPICKER:
        return config.byParameterType.DATETIME;
      case CONTROL_TYPE.LINK:
        return config.byParameterType.REF;
      case CONTROL_TYPE.FILE:
        return config.byParameterType.FILE;
      case CONTROL_TYPE.TEXTAREA:
        return config.byParameterType.STRING;
      case CONTROL_TYPE.RADIOGROUP:
        return config.byParameterType.REF;
      case CONTROL_TYPE.COMBOBOX:
        return config.byParameterType.REF;
      case CONTROL_TYPE.SELECT:
        return config.byParameterType.REF;
      default:
        return [];
    }
  };

  const getAllProperties = useCallback(() => {
    const list: IPropertyConfig[] = [];
    list.push(...(config.byElementType.CONTROL ?? []));
    list.push(...(getSettingComponent() ?? []));
    list.push(...(config.byControlType[value.type] ?? []));
    return list;
  }, [config.byControlType, config.byElementType.CONTROL, getSettingComponent, value.type]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        height: '100%',
      }}
    >
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <TextField id="outlined" label="Название поля" size={'small'} value={value.name} onChange={handleChangeName} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          overflowY: 'scroll',
        }}
      >
        {config &&
          getAllProperties().map((property, index) => {
            return <ParameterType propertiesConfig={property} key={index} value={value} update={update} />;
          })}
      </div>
    </div>
  );
};
