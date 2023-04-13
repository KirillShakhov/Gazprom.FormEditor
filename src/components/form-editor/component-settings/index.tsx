import React from 'react';
import { IParameter } from '../../../interfaces/parameter';
import { ComponentSettingProperties } from './types/component-setting-properties';
import { FormControlSetting } from './form-control-setting';
import { IPropertyMetadata } from '../../../interfaces/property-metadata';
import { isFormControl } from '../../../utils/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { IForm } from '../../../interfaces/form-config';
import { PropertyConfig } from './types/property-config';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';

interface VisualModeProps {
  form: IForm;
  value: IFormElement | undefined;
  properties: IParameter[];
  config: IPropertyMetadata;
  update: () => void;
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const { form, value, properties, config, update } = props;

  return (
    <div
      style={{
        background: '#ffffff',
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 20,
          flexDirection: 'column',
          padding: 20,
        }}
      >
        {config && config.byElementType.FORM && <span style={{ fontSize: 18 }}>Настройки формы</span>}
        {config &&
          config.byElementType.FORM &&
          config.byElementType.FORM.map((property, index) => {
            return <PropertyConfig propertiesConfig={property} key={index} value={form} update={update} />;
          })}
        <span style={{ fontSize: 18 }}>Настройки компонента</span>
        {!value && (
          <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>
            <BlockRoundedIcon sx={{ color: '#808080', mr: 0.5 }} fontSize={'small'} />
            Компонент не выбран
          </span>
        )}
        {value && isFormControl(value) && (
          <FormControlSetting form={form} value={value} properties={properties} update={update} />
        )}
        {value && <ComponentSettingProperties formItem={value} config={config} update={update} />}
      </div>
    </div>
  );
};
