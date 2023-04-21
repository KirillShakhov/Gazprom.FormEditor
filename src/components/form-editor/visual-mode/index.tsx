import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { IForm } from '../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { isFormItem } from '../../../utils/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { FormItem } from './form-item';

interface VisualModeProps {
  form: IForm;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const VisualMode: React.FC<VisualModeProps> = (props) => {
  const { form, selectedItem, onSelectItem, update } = props;

  const print = () => {
    console.log(JSON.stringify(form.items));
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    console.log('removedIndex ' + removedIndex);
    console.log('addedIndex ' + addedIndex);
    if (payload == null) return;
    const param = payload;
    if (isFormItem(param)) {
      if (removedIndex != null) {
        form.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        form.items?.splice(addedIndex, 0, param);
      }
    }
    update();
  };

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    return isFormItem(payload);
  };

  return (
    <div className="visual-mode" style={{ zoom: 1 }}>
      <div className="box">
        <div style={{ overflowY: 'auto', height: 640 }}>
          <Container
            getChildPayload={(i) => (form.items ? form.items[i] : [])}
            groupName={'pages-groups'}
            onDrop={onDrop}
            dropPlaceholder={{
              className: 'dropPlaceholderPageGroup',
              animationDuration: 250,
              showOnTop: true,
            }}
            shouldAcceptDrop={shouldAcceptDrop}
          >
            {form.items?.map((item, index) => {
              return (
                <Draggable key={item.code + item.name + index}>
                  <FormItem
                    form={form}
                    formItem={item}
                    onSelectItem={onSelectItem}
                    selectedItem={selectedItem}
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
