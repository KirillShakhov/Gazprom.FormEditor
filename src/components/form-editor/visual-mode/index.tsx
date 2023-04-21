import React, { useEffect } from 'react';
import './style.css';
import { Button } from '@mui/material';
import { IForm } from '../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { isFormItem } from '../../../utils/form-config';
import { IFormElement } from '../../../interfaces/form-element';
import { FormItem } from './form-item';
import { useKeyDown, useMouseWheelZoom } from '../../../utils/key-down';
import {useLocalStorage} from "../../../utils/local-storage";

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

  const [zoom, setZoom] = useLocalStorage('zoom', 1.0);

  useMouseWheelZoom((delta) => {
    const newZoom = zoom + delta / 200;
    if (newZoom > 0.1 && newZoom < 5.0) {
      setZoom(newZoom);
    }
    console.log('zoom ' + zoom);
    update();
  });

  // useEffect(() => {
  //   update();
  // }, [update, zoom]);

  useKeyDown(() => {
    console.log('Escape');
  }, ['Escape', 'Control']);

  return (
    <div className="visual-mode" role={'presentation'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '80%',
          padding: 30 * zoom > 30 ? 30 : 30 * zoom,
          borderRadius: 10,
          background: '#ffffff',
        }}
      >
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
