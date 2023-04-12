import React, { useState } from 'react';
import { IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { checkImplementFormControl, checkImplementParameter } from '../../../../utils/check-objects';
import { generateElement } from '../../../../utils/element-generators';
import '../style.css';
import { IFormElement } from '../../../../interfaces/form-element';

interface GroupProps {
  value: IFormGroup;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { value, onSelectItem, update } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) return;
    if (value.items == undefined) value.items = [];
    const param = dropResult.payload;
    if (checkImplementFormControl(param)) {
      if (removedIndex != null) {
        value.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        value.items?.splice(addedIndex, 0, param);
      }
    } else if (checkImplementParameter(param)) {
      if (addedIndex != null) {
        const item = generateElement(param);
        value.items?.splice(addedIndex, 0, item);
      }
    }
    update();
  };

  const [isOnElement, setIsOnElement] = useState(false);

  const handleClick = () => {
    if (isOnElement) {
      onSelectItem(value);
    }
  };

  return (
    <div
      onMouseEnter={() => {
        setIsOnElement(true);
        console.log('setIsOnElement(true)');
      }}
      onMouseLeave={() => {
        setIsOnElement(false);
        console.log('setIsOnElement(false)');
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        border: '#ddd solid',
        zIndex: 0,
      }}
      role="presentation"
      onClick={handleClick}
    >
      <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>
        {value.name} {value.direction}
      </span>
      <Container
        getChildPayload={(i) => (value.items ? value.items[i] : [])}
        groupName={'parameters'}
        onDrop={onDrop}
        removeOnDropOut={true}
        dropPlaceholder={{
          className: 'dropPlaceholderElement',
          animationDuration: 250,
          showOnTop: true,
        }}
      >
        {value.items?.map((item, index) => {
          return (
            <Draggable key={index}>
              <Element value={item as IFormControl} key={index} onSelectItem={onSelectItem} />
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
