import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { PageGroup } from './page-group';
import { IForm, ITabPageController } from '../../../interfaces/form-config';

interface VisualModeProps {
  form: IForm;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const { form } = props;

  const print = () => {
    console.log(JSON.stringify(form.items));
  };

  return (
    <div className="visual-mode">
      <div className="box">
        <div style={{ overflowY: 'auto', height: 640 }}>
          {form.items?.map((item, index) => {
            return <PageGroup value={item as ITabPageController} key={index}></PageGroup>;
          })}
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          <Button variant="contained" onClick={print}>
            Ок
          </Button>
          <Button color="secondary" variant="contained">
            Отменить
          </Button>
        </div>
      </div>
    </div>
  );
};
