import React, { useEffect } from 'react';
import './style.css';
import { IParameter } from '../../../interfaces/parameter';
import { IFormControl } from '../../../interfaces/form-control';
import { ComponentSettingProperties } from './types/component-setting-properties';
import { DatasourceSetting } from './datasource-setting';
import { IPropertyMetadata } from '../../../interfaces/property-metadata';

interface VisualModeProps {
  value: IFormControl | undefined;
  properties: IParameter[];
  config: IPropertyMetadata;
  update: () => void;
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const { value, properties, config, update } = props;

  return (
    <div className="component-settings">
      <span style={{ fontSize: 16 }}>Настройки компоненты</span>
      {!value && <span style={{ fontSize: 12 }}>Компонент не выбран</span>}
      {value && <DatasourceSetting value={value} properties={properties} update={update} />}
      {value && <ComponentSettingProperties value={value} config={config} update={update}></ComponentSettingProperties>}
      {/*{value && <ParameterTypesElements value={value} propertiesConfig={config.byElementType.CONTROL} />}*/}
    </div>
  );
};
