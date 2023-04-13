import React from 'react';
import { IForm, IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { checkImplementFormControl, checkImplementParameter } from '../../../../utils/check-objects';
import { generateElement } from '../../../../utils/element-generators';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';

interface GroupProps {
  form: IForm;
  formGroup: IFormGroup;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { form, formGroup, selectedItem, onSelectItem, update } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) return;
    if (formGroup.items == undefined) formGroup.items = [];
    const param = dropResult.payload;
    if (checkImplementFormControl(param)) {
      if (removedIndex != null) {
        formGroup.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        formGroup.items?.splice(addedIndex, 0, param);
      }
    } else if (checkImplementParameter(param)) {
      if (addedIndex != null) {
        const item = generateElement(form, param);
        formGroup.items?.splice(addedIndex, 0, item);
      }
    }
    update();
  };

  const handleClick = () => {
    if (selectedItem == formGroup) {
      onSelectItem(undefined);
      return;
    }
    onSelectItem(formGroup);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        border: 1,
        borderRadius: 10,
        borderColor: selectedItem == formGroup ? '#3373d9' : '#e0e0e0',
        borderStyle: 'dotted',
        zIndex: 0,
        marginTop: 10,
      }}
      role="presentation"
    >
      <span
        style={{ fontSize: 16, margin: 0, marginTop: 10 }}
        key={formGroup.code}
        role="presentation"
        onClick={handleClick}
      >
        {formGroup.name} {formGroup.direction}
      </span>
      <Container
        getChildPayload={(i) => (formGroup.items ? formGroup.items[i] : [])}
        groupName={'parameters'}
        onDrop={onDrop}
        removeOnDropOut={true}
        dropPlaceholder={{
          className: 'dropPlaceholderElement',
          animationDuration: 250,
          showOnTop: true,
        }}
      >
        {formGroup.items?.map((item, index) => {
          return (
            <Draggable key={index}>
              <Element
                value={item as IFormControl}
                key={index}
                selectedItem={selectedItem}
                onSelectItem={onSelectItem}
              />
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
