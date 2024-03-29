import React from 'react';
import { IForm } from '../../../../interfaces/form-config';
import { IFormElement } from '../../../../interfaces/form-element';
import { isFormItem } from '../../../../utils/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Button } from '@mui/material';
import { FormItem } from '../form-item';
import '../style.css';

interface FormViewProps {
  zoom: number;
  readOnly: boolean;
  scrollable: boolean;
  form: IForm;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
  setDraggable?: (value: boolean) => void;
}

export const FormView: React.FC<FormViewProps> = (props) => {
  const { zoom, readOnly, scrollable, form, selectedItem, onSelectItem, update, setDraggable } = props;

  const print = () => {
    console.log(JSON.stringify(form.items));
  };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
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
    <div
      style={
        !scrollable
          ? {
              height: '100%',
              background: '#565963',
              padding: 20,
            }
          : {
              padding: 50,
            }
      }
    >
      <div
        style={
          scrollable
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 30 * zoom > 30 ? 30 : 30 * zoom,
                borderRadius: 10,
                background: '#ffffff',
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '80%',
                padding: 30 * zoom > 30 ? 30 : 30 * zoom,
                borderRadius: 10,
                background: '#ffffff',
              }
        }
      >
        <div style={{ overflowY: 'auto', height: '100%' }}>
          {!readOnly && (
            <Container
              getChildPayload={(i) => (form.items ? form.items[i] : [])}
              groupName={'pages-groups'}
              onDrop={onDrop}
              dropPlaceholder={{
                className: 'dropPlaceholderPageGroup',
                animationDuration: 250,
                showOnTop: true,
              }}
              getGhostParent={() => document.body}
              shouldAcceptDrop={shouldAcceptDrop}
              onDragStart={() => {
                console.log('setDraggable(true)');
                if (setDraggable) {
                  setDraggable(true);
                }
              }}
              onDragEnd={() => {
                if (setDraggable) {
                  setDraggable(false);
                }
              }}
            >
              {form.items?.map((item, index) => {
                return (
                  <Draggable key={item.code + item.name + index}>
                    <FormItem
                      readOnly={readOnly}
                      zoom={zoom}
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
          )}
          {readOnly &&
            form.items?.map((item, index) => {
              return (
                <FormItem
                  key={item.code + item.name + index}
                  zoom={zoom}
                  readOnly={readOnly}
                  form={form}
                  formItem={item}
                  onSelectItem={onSelectItem}
                  selectedItem={selectedItem}
                  update={update}
                />
              );
            })}
        </div>
        <div style={{ zoom: zoom, display: 'flex', gap: 20, marginTop: 20 }}>
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
