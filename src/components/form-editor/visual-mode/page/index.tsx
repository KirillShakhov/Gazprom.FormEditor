import React from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import {IForm, IFormGroup, ITabPage} from '../../../../interfaces/form-config';
import { Group } from '../group';
import { isFormGroup } from '../../../../utils/form-config';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';

interface PageProps {
  form: IForm;
  value: ITabPage;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const Page: React.FC<PageProps> = (props) => {
  const { form, value, selectedItem, onSelectItem, update } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) return;
    if (value.items == undefined) value.items = [];
    const group = dropResult.payload;
    if (isFormGroup(group)) {
      if (removedIndex != null) {
        value.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        value.items?.splice(addedIndex, 0, group);
      }
    }
    update();
  };

  return (
    <Container
      groupName={'groups'}
      getChildPayload={(i) => (value.items ? value.items[i] : [])}
      onDrop={onDrop}
      dropPlaceholder={{
        className: 'dropPlaceholderGroup',
        animationDuration: 250,
        showOnTop: true,
      }}
    >
      {value.items?.map((item, index) => {
        return (
          <Draggable key={index}>
            <Group
              form={form}
              formGroup={item as IFormGroup}
              key={index}
              selectedItem={selectedItem}
              onSelectItem={onSelectItem}
              update={update}
            />
          </Draggable>
        );
      })}
    </Container>
  );
};
