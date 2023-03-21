import React from 'react';
import './style.css';
import {
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


interface VisualModeProps {
  properties: IParameter[];
  onChangeProperty: (value: IParameter) => void;
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const { properties, onChangeProperty } = props;
  const [selectPropertyIndex, setSelectPropertyIndex] = React.useState<number>(-1);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value);
    setSelectPropertyIndex(index);
    const property = properties[index];
    onChangeProperty(property);
  };

  return (
    <div className="component-settings">
      <span style={{ fontSize: 16 }}>Настройки компоненты</span>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="data-source-label">Источник данных</InputLabel>
        <Select
          labelId="data-source-label"
          id="data-source"
          value={selectPropertyIndex}
          label="Источник данных"
          onChange={handleChange}
        >
          {properties?.map((param, index) => {
            return (
              <MenuItem value={index} key={index}>
                {param.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="data-source2-label">Название поля</InputLabel>
        <Select labelId="data-source2-label" id="data-source2" value={0} label="Название поля" onChange={handleChange}>
          <MenuItem value={10}>Qwerty</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        value="start"
        style={{ width: '100%' }}
        control={<Switch color="primary" />}
        label="Подсказки к полю"
        labelPlacement="end"
      />
      <TextField
        id="outlined-multiline-flexible"
        placeholder="Текст подсказки"
        size="small"
        multiline
        minRows={4}
        maxRows={6}
      />
    </div>
  );
};
