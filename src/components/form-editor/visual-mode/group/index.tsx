import React from 'react';
import { IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';

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
      const items = [...list];
      const item = {
        code: param.name,
        name: param.name,
        dataSource: param.code,
        type: CONTROL_TYPE.TEXT,
        properties: {},
      };
      items.splice(addedIndex, 0, item);
      setList(items);
      console.log('list ' + list);
    }
    if (removedIndex == null || addedIndex == null) return;
    // const items = [...lists];
    // const item = items[removedIndex];
    // items.splice(removedIndex, 1);
    // items.splice(addedIndex, 0, item);
    // setLists(items);
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
