import React, {useEffect} from 'react';
import { IFormGroup } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { generateStandardElement } from '../../../../utils/generate-form';
import { checkImplementFormControl, checkImplementParameter } from '../../../../utils/check-objects';

interface GroupProps {
  value: IFormGroup;
  onSelectItem: (value: IFormControl) => void;
}

export const Group: React.FC<GroupProps> = (props) => {
  const { value, onSelectItem } = props;
  const [list, setList] = React.useState(value.items ?? []);

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    console.log('removedIndex ' + dropResult.removedIndex);
    console.log('addedIndex ' + dropResult.addedIndex);
    console.log('element ' + dropResult.element);
    console.log('payload ' + JSON.stringify(dropResult.payload));
    if (dropResult.payload != null) {
      const param = dropResult.payload;
      if (checkImplementFormControl(param)) {
        if (removedIndex != null) {
          list.splice(removedIndex, 1);
        }
        if (addedIndex != null) {
          list.splice(addedIndex, 0, param);
        }
        setList([...list]);
        value.items = list;
      } else if (checkImplementParameter(param)) {
        if (addedIndex != null) {
          const item = generateStandardElement(param);
          list.splice(addedIndex, 0, item);
          setList([...list]);
          value.items = list;
        }
      }
    }
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
      <Container getChildPayload={(i) => list[i]} groupName={'parameters'} onDrop={onDrop}>
        {list.map((item, index) => {
          return (
            <Draggable key={index}>
              <Element
                value={item as IFormControl}
                key={index}
                isSelected={false}
                onSelectItem={onSelectItem}
              ></Element>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
