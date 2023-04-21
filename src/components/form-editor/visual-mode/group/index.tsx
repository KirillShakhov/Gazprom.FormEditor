import React from 'react';
import { FORM_GROUP_DIRECTION, IForm, IFormGroup } from '../../../../interfaces/form-config';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';
import { FormItem } from '../form-item';
import { isFormItem } from '../../../../utils/form-config';
import type { Property } from 'csstype';

interface GroupProps {
  zoom: number;
  form: IForm;
  formGroup: IFormGroup;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { zoom, form, formGroup, selectedItem, onSelectItem, update } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) return;
    if (formGroup.items == undefined) formGroup.items = [];
    const param = dropResult.payload;
    if (isFormItem(param)) {
      if (removedIndex != null) {
        formGroup.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        formGroup.items?.splice(addedIndex, 0, param);
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

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    if (formGroup == payload) return false;
    return isFormItem(payload);
  };

  const getFlexDirection = (): Property.FlexDirection => {
    switch (formGroup.direction) {
      case FORM_GROUP_DIRECTION.FORCE_HORIZONTAL:
        return 'row';
      case FORM_GROUP_DIRECTION.HORIZONTAL:
        return 'row';
      case FORM_GROUP_DIRECTION.VERTICAL:
        return 'column';
    }
    return 'column';
  };
  const getFlexWrap = (): Property.FlexWrap => {
    switch (formGroup.direction) {
      case FORM_GROUP_DIRECTION.FORCE_HORIZONTAL:
        return 'nowrap';
      case FORM_GROUP_DIRECTION.HORIZONTAL:
        return 'wrap';
      case FORM_GROUP_DIRECTION.VERTICAL:
        return 'wrap';
    }
    return 'wrap';
  };

  const [dropped, setDropped] = React.useState<boolean>(false);

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
        style={{
          zoom: zoom,
          fontSize: 16,
          margin: 0,
          marginTop: 10,
        }}
        key={formGroup.code}
        role="presentation"
        onClick={handleClick}
      >
        {formGroup.name}
      </span>
      <Container
        getChildPayload={(i) => (formGroup.items ? formGroup.items[i] : [])}
        orientation={'vertical'}
        groupName={'parameters'}
        onDrop={onDrop}
        dropPlaceholder={{
          className: 'dropPlaceholderElement',
          animationDuration: 250,
          showOnTop: true,
        }}
        style={{
          display: 'flex',
          flexWrap: dropped ? 'nowrap' : getFlexWrap(),
          flexDirection: dropped ? 'column' : getFlexDirection(),
        }}
        onDragStart={({ payload }) => {
          if (payload == formGroup) return;
          setDropped(true);
        }}
        onDragEnd={() => {
          setDropped(false);
        }}
        getGhostParent={(): HTMLElement => {
          return document.body;
        }}
        shouldAcceptDrop={shouldAcceptDrop}
      >
        {formGroup.items?.map((item, index) => {
          return (
            <Draggable key={item.code + item.name + index}>
              <FormItem
                form={form}
                formItem={item}
                onSelectItem={onSelectItem}
                selectedItem={selectedItem}
                update={update}
                zoom={zoom}
              />
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
