import React, { useCallback } from 'react';
import { IPropertyConfig, PROPERTY_VALUE_TYPE } from '../../../interfaces/property-metadata';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { IFormElement } from '../../../interfaces/form-element';

interface ElementProps {
  value: IFormElement;
  propertiesConfig: IPropertyConfig;
}

export const ParameterType: React.FC<ElementProps> = (props) => {
  const { value, propertiesConfig } = props;

  const haveProperty = useCallback(() => {
    if (value.properties === undefined) return false;
    return value.properties.hasOwnProperty(propertiesConfig.code);
  }, [propertiesConfig.code, value.properties]);

  const [config, setConfig] = React.useState(haveProperty());

  const changeValue = (val: any) => {
    if (value.properties === undefined) value.properties = {};
    value.properties[propertiesConfig.code] = val;
    setConfig(true);
    console.log('properties: ' + value.properties[propertiesConfig.code]);
  };

  const cleanValue = () => {
    if (value.properties === undefined) return;
    if (value.properties.hasOwnProperty(propertiesConfig.code)) {
      delete value.properties[propertiesConfig.code];
    }
    setConfig(false);
  };

  const generateProperties = (value: IPropertyConfig) => {
    console.log('value.type: ' + value.type);
    switch (value.type) {
      case PROPERTY_VALUE_TYPE.STRING:
        return <TextField id="outlined" label={value.name} size={'small'} />;
      case PROPERTY_VALUE_TYPE.INTEGER:
        return <TextField id="outlined" label={value.name} size={'small'} />;
      case PROPERTY_VALUE_TYPE.BOOLEAN:
        return (
          <FormControlLabel
            value="start"
            style={{ width: '100%', marginLeft: 2 }}
            control={
              <Checkbox
                checked={config}
                onChange={(e) => {
                  if (e.target.checked) {
                    changeValue(true);
                  } else {
                    cleanValue();
                  }
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={value.name}
            labelPlacement="end"
          />
        );
      case PROPERTY_VALUE_TYPE.DATE:
        return <TextField></TextField>;
      case PROPERTY_VALUE_TYPE.LIST:
        return <TextField></TextField>;
    }
  };

  return generateProperties(propertiesConfig);
};
