import React from 'react';
import { IParameter } from '../../../interfaces/parameter';
import { ComponentSettingProperties } from './component-setting-properties';
import { FormControlSetting } from './form-control-setting';
import { IPropertyMetadata } from '../../../interfaces/property-metadata';
import { isFormControl } from '../../../utils/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { IForm } from '../../../interfaces/form-config';
import { PropertyConfig } from './property-config';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import { Button } from '@mui/material';

interface VisualModeProps {
  form: IForm;
  value: IFormElement | undefined;
  properties: IParameter[];
  config: IPropertyMetadata;
  update: () => void;
  deleteObject: () => void;
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const { form, value, properties, config, update, deleteObject } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
            return <PropertyConfig propertyConfig={property} key={index} value={form} update={update} />;
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
      {value && (
        <div
          style={{
            padding: 10,
          }}
        >
          <Button
            sx={{
              color: '#cecece',
              '&:hover': {
                backgroundColor: '#dc7777',
                color: '#ffffff',
              },
            }}
            fullWidth
            onClick={deleteObject}
          >
            Удалить компонент
          </Button>
        </div>
      )}
    </div>
  );
};
