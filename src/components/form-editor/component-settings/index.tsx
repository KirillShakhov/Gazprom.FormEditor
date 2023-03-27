import React from 'react';
import './style.css';
import {
  Collapse,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { IParameter } from '../../../interfaces/parameter';
import { CONTROL_TYPE, IFormControl } from '../../../interfaces/form-control';
import { TextTypeSetting } from './types/textinput-setting';
import { DatasourceSetting } from './datasource-setting';

interface VisualModeProps {
  value: IFormControl | undefined;
  properties: IParameter[];
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const { value, properties } = props;

  function renderSettingComponent(value: IFormControl) {
    switch (value.type) {
      case CONTROL_TYPE.TEXT:
        return <TextTypeSetting value={value}></TextTypeSetting>;
      default:
        return <TextTypeSetting value={value}></TextTypeSetting>;
    }
  }

  return (
    <div className="component-settings">
      <span style={{ fontSize: 16 }}>Настройки компоненты</span>
      {!value && <span style={{ fontSize: 12 }}>Компонент не выбран</span>}
      {value && <DatasourceSetting value={value} properties={properties} />}
      {value && renderSettingComponent(value)}
    </div>
  );
};
