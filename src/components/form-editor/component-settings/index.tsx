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

interface VisualModeProps {
  value: number;
  onChange: (value: string) => void;
}

export const ComponentSettings: React.FC<VisualModeProps> = (props) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    console.log('event: ' + JSON.stringify(event.target.value));
  };

  return (
    <div className="component-settings">
      <span style={{ fontSize: 16 }}>Настройки компоненты</span>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="data-source-label">Источник данных</InputLabel>
        <Select
          labelId="data-source-label"
          id="data-source"
          value={props.value}
          label="Источник данных"
          onChange={handleChange}
        >
          <MenuItem value={10}>Qwerty</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="data-source2-label">Название поля</InputLabel>
        <Select
          labelId="data-source2-label"
          id="data-source2"
          value={props.value}
          label="Название поля"
          onChange={handleChange}
        >
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
