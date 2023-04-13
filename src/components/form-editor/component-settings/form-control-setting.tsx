import React, { useCallback } from 'react';
import { IFormControl } from '../../../interfaces/form-control';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IParameter } from '../../../interfaces/parameter';
import { datasourceMatch, getTypesByParameter } from '../../../utils/datasource-match';
import { generateElement } from '../../../utils/element-generators';
import { IForm } from '../../../interfaces/form-config';

interface ElementProps {
  form: IForm;
  value: IFormControl;
  properties: IParameter[];
  update: () => void;
}

export const FormControlSetting: React.FC<ElementProps> = (props) => {
  const { form, value, properties, update } = props;

  const currentPropertyIndex = useCallback(() => {
    let indexProperty = -1;
    properties?.forEach((p, index) => {
      if (p.code === value.dataSource) {
        indexProperty = index;
      }
    });
    return indexProperty;
  }, [properties, value.dataSource]);

  const getTypes = useCallback(() => {
    const parameter = properties[currentPropertyIndex()];
    return getTypesByParameter(parameter.type);
  }, [currentPropertyIndex, properties]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value);
    const parameter = properties[index];
    if (!datasourceMatch(parameter.type, value.type)) {
      const standardElement = generateElement(form, parameter);
      value.properties = standardElement.properties;
      value.type = standardElement.type;
    }
    value.dataSource = parameter.code;
    update();
  };

  const handleChangeType = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value);
    value.type = getTypes()[index];
    update();
  };

  const getCurrentTypeIndex = useCallback(() => {
    let indexProperty = -1;
    getTypes()?.forEach((type, index) => {
      if (type === value.type) {
        indexProperty = index;
      }
    });
    return indexProperty;
  }, [getTypes, value.type]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
        <InputLabel id="data-source-parameters-label">Источник данных</InputLabel>
        <Select
          labelId="data-source-parameters-label"
          id="data-source-parameters"
          value={currentPropertyIndex()}
          label="Источник данных"
          onChange={handleChange}
          fullWidth
        >
          {properties?.map((param, index) => {
            return (
              <MenuItem value={index} key={index}>
                {param.name} | {param.type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, marginTop: 2 }} size="small" fullWidth>
        <InputLabel id="data-source-types-label">Поле ввода</InputLabel>
        <Select
          labelId="data-source-types-label"
          id="data-source-types"
          value={getCurrentTypeIndex()}
          label="Поле ввода"
          onChange={handleChangeType}
          fullWidth
        >
          {getTypes().map((param, index) => {
            return (
              <MenuItem value={index} key={index}>
                {param}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
