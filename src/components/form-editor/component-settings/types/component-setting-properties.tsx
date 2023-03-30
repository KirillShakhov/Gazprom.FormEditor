import React, { useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { IPropertyConfig, IPropertyMetadata } from '../../../../interfaces/property-metadata';
import { ParameterTypesElements } from '../parameter-types';

interface ElementProps {
  value: IFormControl;
  config: IPropertyMetadata;
  update: () => void;
}

export const ComponentSettingProperties: React.FC<ElementProps> = (props) => {
  const { value, config, update } = props;
  // const [isHaveHelperText, setIsHaveHelperText] = React.useState(false);
  const [name, setName] = React.useState<string>(value.name);
  useEffect(() => {
    setName(value.name);
  }, [value]);

  // const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsHaveHelperText(event.target.checked);
  // };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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
        gap: '20px',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 10,
      }}
    >
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <TextField id="outlined" label="Название поля" size={'small'} value={name} onChange={handleChangeName} />
      {/*<FormControlLabel
        style={{ width: '100%' }}
        control={<Switch checked={isHaveHelperText} onChange={handleSwitchChange} color="primary" />}
        label="Подсказки к полю"
        labelPlacement="end"
      />
      {isHaveHelperText && (
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Текст подсказки"
          size="small"
          multiline
          minRows={4}
          maxRows={6}
          fullWidth
        />
      )}*/}
      {config && <ParameterTypesElements propertiesConfig={getAllProperties()} value={value} update={update} />}
    </div>
  );
};
