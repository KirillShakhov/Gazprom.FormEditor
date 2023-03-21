import React from 'react';
import { IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { generateStandardElement } from '../../../../utils/generate-form';

interface GroupProps {
  value: IFormGroup;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { value } = props;
  const [list, setList] = React.useState(value.items ?? []);

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    console.log('removedIndex ' + dropResult.removedIndex);
    console.log('addedIndex ' + dropResult.addedIndex);
    console.log('element ' + dropResult.element);
    console.log('payload ' + JSON.stringify(dropResult.payload));
    if (dropResult.payload != null) {
      if (addedIndex == null) return;
      const param = dropResult.payload;
      const item = generateStandardElement(param);
      list.splice(addedIndex, 0, item);
      setList([...list]);
      value.items = list;
      console.log('list ' + list);
    } else {
      if (removedIndex == null || addedIndex == null) return;
      const item = list[removedIndex];
      list.splice(removedIndex, 1);
      list.splice(addedIndex, 0, item);
      setList([...list]);
      value.items = list;
    }
  };

  const onDragEnter = () => {
    console.log('onDragEnter ');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>
        {value.name} {value.direction}
      </span>
      <Container groupName={'parameters'} onDrop={onDrop} onDragEnter={onDragEnter}>
        {list.map((item, index) => {
          return (
            <Draggable key={index}>
              <Element
                value={item as IFormControl}
                key={index}
                isSelected={false}
                onClick={() => {
                  console.log('click');
                }}
              ></Element>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
