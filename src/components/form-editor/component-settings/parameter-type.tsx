import React, { useCallback } from 'react';
import { IPropertyConfig, PROPERTY_VALUE_TYPE } from '../../../interfaces/property-metadata';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { IFormElement } from '../../../interfaces/form-element';
import { NumericFormat } from 'react-number-format';

interface ElementProps {
  value: IFormElement;
  propertiesConfig: IPropertyConfig;
  update: () => void;
}

export const ParameterType: React.FC<ElementProps> = (props) => {
  const { value, propertiesConfig, update } = props;

  const haveProperty = useCallback(() => {
    if (value.properties === undefined) return false;
    return value.properties.hasOwnProperty(propertiesConfig.code);
  }, [propertiesConfig, value]);

  const getPropertyValue = useCallback(() => {
    if (value.properties === undefined) return '';
    if (value.properties.hasOwnProperty(propertiesConfig.code)) {
      return value.properties[propertiesConfig.code];
    }
    return '';
  }, [propertiesConfig, value]);

  // const [config, setConfig] = React.useState(haveProperty());
  const [index, setIndex] = React.useState(0);

  const changeValue = (val: any) => {
    if (value.properties === undefined) value.properties = {};
    value.properties[propertiesConfig.code] = val;
    console.log('properties: ' + value.properties[propertiesConfig.code]);
    update();
  };

  const cleanValue = () => {
    if (value.properties === undefined) return;
    if (value.properties.hasOwnProperty(propertiesConfig.code)) {
      delete value.properties[propertiesConfig.code];
    }
    update();
  };

  const generateProperties = (propertyConfig: IPropertyConfig) => {
    console.log('value.type: ' + propertyConfig.type);
    switch (propertyConfig.type) {
      case PROPERTY_VALUE_TYPE.STRING:
        return (
          <TextField
            id="outlined"
            label={propertyConfig.name}
            size={'small'}
            value={getPropertyValue()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value !== '') {
                changeValue(event.target.value);
              } else {
                cleanValue();
              }
            }}
          />
        );
      case PROPERTY_VALUE_TYPE.INTEGER:
        return (
          <TextField
            id="outlined"
            label={propertyConfig.name}
            size={'small'}
            value={getPropertyValue() !== '' ? Number(getPropertyValue()) : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value !== '') {
                changeValue(Number(event.target.value));
              } else {
                cleanValue();
              }
            }}
            InputProps={{
              inputComponent: NumericFormat as any,
            }}
          />
        );
      case PROPERTY_VALUE_TYPE.BOOLEAN:
        return (
          <FormControlLabel
            value="start"
            style={{ width: '100%', marginLeft: 2 }}
            control={
              <Checkbox
                checked={
                  value.properties !== undefined &&
                  value.properties.hasOwnProperty(propertiesConfig.code) &&
                  value.properties[propertiesConfig.code] === true
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    changeValue(true);
                  } else {
                    cleanValue();
                  }
                }}
                size={'small'}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={propertyConfig.name}
            labelPlacement="end"
          />
        );
      case PROPERTY_VALUE_TYPE.DATE:
        return <TextField />;
      case PROPERTY_VALUE_TYPE.LIST:
        return (
          <FormControl size="small" fullWidth>
            <InputLabel id="data-source-label">{value.name}</InputLabel>
            <Select
              labelId="data-source-label"
              id="data-source"
              value={index}
              label={propertyConfig.name}
              onChange={(event: SelectChangeEvent<number>) => {
                if (propertyConfig.options !== undefined) {
                  const index = Number(event.target.value);
                  changeValue(propertyConfig.options[index]);
                  setIndex(index);
                }
              }}
              fullWidth
            >
              {propertyConfig.options?.map((param, index) => {
                return (
                  <MenuItem value={index} key={index}>
                    {param}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
    }
  };

  return generateProperties(propertiesConfig);
};
