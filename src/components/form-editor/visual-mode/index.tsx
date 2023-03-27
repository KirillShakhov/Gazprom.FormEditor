import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { PageGroup } from './page-group';
import { IForm, ITabPageController } from '../../../interfaces/form-config';
import { Container } from 'react-smooth-dnd';
import { IFormControl } from '../../../interfaces/form-control';

interface VisualModeProps {
  form: IForm;
  onSelectItem: (value: IFormControl) => void;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const { form, onSelectItem } = props;

  const print = () => {
    console.log(JSON.stringify(form.items));
  };

  return (
    <div className="visual-mode">
      <div className="box">
        <div style={{ overflowY: 'auto', height: 640 }}>
          <Container groupName={'pages-groups'}>
            {form.items?.map((item, index) => {
              return <PageGroup value={item as ITabPageController} key={index} onSelectItem={onSelectItem}></PageGroup>;
            })}
          </Container>
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
