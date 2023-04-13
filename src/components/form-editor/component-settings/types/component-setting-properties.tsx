import React, { useCallback } from 'react';
import { TextField } from '@mui/material';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { IPropertyConfig, IPropertyMetadata } from '../../../../interfaces/property-metadata';
import { PropertyConfig } from './property-config';
import { isFormControl } from '../../../../utils/form-config';
import { IFormElement } from '../../../../interfaces/form-element';

interface ElementProps {
  formItem: IFormElement;
  config: IPropertyMetadata;
  update: () => void;
}

export const ComponentSettingProperties: React.FC<ElementProps> = (props) => {
  const { formItem, config, update } = props;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    formItem.name = event.target.value;
    update();
  };

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    formItem.code = event.target.value;
    update();
  };

  const getSettingComponent = (value: IFormControl): IPropertyConfig[] | undefined => {
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
        return undefined;
    }
  };

  const getAllProperties = useCallback(() => {
    const list: IPropertyConfig[] = [];
    list.push(...(config.byElementType.CONTROL ?? []));
    if (isFormControl(formItem)) {
      list.push(...(getSettingComponent(formItem) ?? []));
      list.push(...(config.byControlType[formItem.type] ?? []));
    }
    return list;
  }, [config.byControlType, config.byElementType.CONTROL, getSettingComponent, formItem]);

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
      <TextField id="outlined" label="Code" size={'small'} value={formItem.code} onChange={handleChangeCode} />
      <TextField id="outlined" label="Название поля" size={'small'} value={formItem.name} onChange={handleChangeName} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {config &&
          getAllProperties().map((property, index) => {
            return <PropertyConfig propertiesConfig={property} key={index} value={formItem} update={update} />;
          })}
      </div>
    </div>
  );
};
