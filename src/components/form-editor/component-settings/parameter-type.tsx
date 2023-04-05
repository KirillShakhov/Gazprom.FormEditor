import React, { useCallback } from 'react';
import { IPropertyConfig, PROPERTY_VALUE_TYPE } from '../../../interfaces/property-metadata';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { IFormElement } from '../../../interfaces/form-element';
import { NumericFormat } from 'react-number-format';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ElementProps {
  value: IFormElement;
  propertiesConfig: IPropertyConfig;
  update: () => void;
}

export const ParameterType: React.FC<ElementProps> = (props) => {
  const { value, propertiesConfig, update } = props;
  const [index, setIndex] = React.useState(0);

  const getPropertyValue = useCallback(() => {
    if (value.properties === undefined) return '';
    if (value.properties.hasOwnProperty(propertiesConfig.code)) {
      return value.properties[propertiesConfig.code];
    }
    return '';
  }, [propertiesConfig, value]);

  const changeValue = (val: any) => {
    if (value.properties === undefined) value.properties = {};
    value.properties[propertiesConfig.code] = val;
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
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={propertyConfig.name}
                value={getPropertyValue() === '' ? null : getPropertyValue()}
                onChange={(e: any) => {
                  if (e) {
                    changeValue(e);
                  } else {
                    cleanValue();
                  }
                }}
              />
            </LocalizationProvider>
            <IconButton
              aria-label="clean"
              component="label"
              onClick={() => {
                cleanValue();
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        );
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
