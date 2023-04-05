import React, { useCallback, useEffect } from 'react';
import { IFormControl } from '../../../interfaces/form-control';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IParameter } from '../../../interfaces/parameter';
import { datasourceMatch } from '../../../utils/datasource-match';

interface ElementProps {
  value: IFormControl;
  properties: IParameter[];
  update: () => void;
}

export const DatasourceSetting: React.FC<ElementProps> = (props) => {
  const { value, properties, update } = props;

  const getParameters = useCallback((): IParameter[] => {
    const list: IParameter[] = [];
    properties?.forEach((p) => {
      if (datasourceMatch(p.type, value.type)) {
        list.push(p);
      }
    });
    return list;
  }, [properties, value.type]);

  const currentProperty = useCallback(() => {
    let indexProperty = -1;
    getParameters().forEach((p, index) => {
      if (p.code === value.dataSource) {
        indexProperty = index;
      }
    });
    return indexProperty;
  }, [getParameters, value.dataSource]);

  const [selectPropertyIndex, setSelectPropertyIndex] = React.useState<number>(currentProperty);
  useEffect(() => {
    setSelectPropertyIndex(currentProperty);
  }, [currentProperty, value]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value);
    value.dataSource = properties[index].code;
    setSelectPropertyIndex(index);
    update();
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
        <InputLabel id="data-source-label">Источник данных</InputLabel>
        <Select
          labelId="data-source-label"
          id="data-source"
          value={selectPropertyIndex}
          label="Источник данных"
          onChange={handleChange}
          fullWidth
        >
          {getParameters().map((param, index) => {
            return (
              <MenuItem value={index} key={index}>
                {param.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
