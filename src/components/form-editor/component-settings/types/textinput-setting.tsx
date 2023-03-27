import React, { useEffect } from 'react';
import { Fade, FormControlLabel, Switch, TextField } from '@mui/material';
import { IFormControl } from '../../../../interfaces/form-control';

interface ElementProps {
  value: IFormControl;
}

export const TextTypeSetting: React.FC<ElementProps> = (props) => {
  const { value } = props;
  const [isHaveHelperText, setIsHaveHelperText] = React.useState(false);
  const [name, setName] = React.useState<string>(value.name);
  useEffect(() => {
    setName(value.name);
  }, [value]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsHaveHelperText(event.target.checked);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    value.name = event.target.value;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <h5 style={{ margin: 0 }}>Text Input</h5>
      <TextField id="outlined" label="Название поля" size={'small'} value={name} onChange={handleChangeName} />
      <FormControlLabel
        style={{ width: '100%' }}
        control={<Switch checked={isHaveHelperText} onChange={handleSwitchChange} color="primary" />}
        label="Подсказки к полю"
        labelPlacement="end"
      />
      <Fade in={isHaveHelperText}>
        {
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Текст подсказки"
            size="small"
            multiline
            minRows={4}
            maxRows={6}
            fullWidth
          />
        }
      </Fade>
    </div>
  );
};
