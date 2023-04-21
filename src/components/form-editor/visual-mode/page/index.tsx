import React from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IForm, ITabPage } from '../../../../interfaces/form-config';
import { isFormItem } from '../../../../utils/form-config';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';
import { FormItem } from '../form-item';

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
    if (isFormItem(group)) {
      if (removedIndex != null) {
        value.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        value.items?.splice(addedIndex, 0, group);
      }
    }
    update();
  };

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    return isFormItem(payload);
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
      getGhostParent={(): HTMLElement => {
        return document.body;
      }}
      shouldAcceptDrop={shouldAcceptDrop}
    >
      {value.items?.map((item, index) => {
        return (
          <Draggable key={item.code + item.name + index}>
            <FormItem
              form={form}
              formItem={item}
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
