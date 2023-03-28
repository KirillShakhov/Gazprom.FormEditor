import React, { useEffect } from 'react';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { IPropertyConfig } from '../../../../interfaces/property-metadata';
import { ParameterTypes } from '../../../../interfaces/parameter';
import {ParameterTypesElements} from "../parameter-types";

type KeyType = number | string | symbol;
type ParameterConfigMap<T extends KeyType> = { [key in T]?: IPropertyConfig[] };

interface ElementProps {
  value: IFormControl;
  config: ParameterConfigMap<ParameterTypes>;
}

export const ComponentSettingProperties: React.FC<ElementProps> = (props) => {
  const { value, config } = props;
  const [isHaveHelperText, setIsHaveHelperText] = React.useState(false);
  const [name, setName] = React.useState<string>(value.name);
  useEffect(() => {
    setName(value.name);
  }, [value]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsHaveHelperText(event.target.checked);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    value.name = event.target.value;
  };

  function getSettingComponent(): IPropertyConfig[] | undefined {
    switch (value.type) {
      case CONTROL_TYPE.TEXT:
        return config.STRING;
      case CONTROL_TYPE.NUMBER:
        return config.NUMBER;
      case CONTROL_TYPE.CHECKBOX:
        return config.BOOLEAN;
      case CONTROL_TYPE.SWITCH:
        return config.BOOLEAN;
      case CONTROL_TYPE.DATEPICKER:
        return config.DATE;
      case CONTROL_TYPE.DATETIMEPICKER:
        return config.DATETIME;
      case CONTROL_TYPE.LINK:
        return config.REF;
      case CONTROL_TYPE.FILE:
        return config.FILE;
      case CONTROL_TYPE.TEXTAREA:
        return config.STRING;
      case CONTROL_TYPE.RADIOGROUP:
        return config.REF;
      case CONTROL_TYPE.COMBOBOX:
        return config.REF;
      case CONTROL_TYPE.SELECT:
        return config.REF;
      default:
        return config.STRING;
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <TextField id="outlined" label="Название поля" size={'small'} value={name} onChange={handleChangeName} />

      <FormControlLabel
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
      )}
      {config && <ParameterTypesElements propertiesConfig={getSettingComponent()} value={value} />}
    </div>
  );
};
