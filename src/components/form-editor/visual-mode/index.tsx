import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { PageGroup } from './page-group';
import { IForm, IFormGroup, ITabPageController } from '../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { isFormControl, isFormGroup, isTabPageController } from '../../../utils/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { Group } from './group';
import { Element } from './element';
import { IFormControl } from '../../../interfaces/form-control';

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
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload != null) {
      const param = dropResult.payload;
      if (isTabPageController(param) || isFormGroup(param) || isFormControl(param)) {
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

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    return isTabPageController(payload) || isFormGroup(payload) || isFormControl(payload);
  };

  return (
    <div className="visual-mode">
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
                <Draggable key={index}>
                  {isTabPageController(item) && (
                    <PageGroup
                      form={form}
                      value={item as ITabPageController}
                      key={index}
                      selectedItem={selectedItem}
                      onSelectItem={onSelectItem}
                      update={update}
                    />
                  )}
                  {isFormGroup(item) && (
                    <Group
                      form={form}
                      formGroup={item as IFormGroup}
                      key={index}
                      selectedItem={selectedItem}
                      onSelectItem={onSelectItem}
                      update={update}
                    />
                  )}
                  {isFormControl(item) && (
                    <Element
                      value={item as IFormControl}
                      key={index}
                      selectedItem={selectedItem}
                      onSelectItem={onSelectItem}
                    />
                  )}
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
