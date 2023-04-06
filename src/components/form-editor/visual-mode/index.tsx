import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { PageGroup } from './page-group';
import { IForm, ITabPageController } from '../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormControl } from '../../../interfaces/form-control';
import {checkImplementForm, checkImplementFormControl, checkImplementParameter} from '../../../utils/check-objects';
import { generateStandardElement } from '../../../utils/generate-form';
import {isTabPageController} from "../../../utils/form-config";

interface VisualModeProps {
  form: IForm;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const { form, onSelectItem, update } = props;

  const print = () => {
    console.log(JSON.stringify(form.items));
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload != null) {
      const param = dropResult.payload;
      if (isTabPageController(param)) {
        if (removedIndex != null) {
          form.items?.splice(removedIndex, 1);
        }
        if (addedIndex != null) {
          form.items?.splice(addedIndex, 0, param);
        }
      }
      update();
    }
  };

  return (
    <div className="visual-mode">
      <div className="box">
        <div style={{ overflowY: 'auto', height: 640 }}>
          <Container
            getChildPayload={(i) => (form.items ? form.items[i] : [])}
            groupName={'pages-groups'}
            onDrop={onDrop}
          >
            {form.items?.map((item, index) => {
              return (
                <Draggable key={index}>
                  <PageGroup
                    value={item as ITabPageController}
                    key={index}
                    onSelectItem={onSelectItem}
                    update={update}
                  />
                </Draggable>
              );
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
