import React from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormGroup, ITabPage } from '../../../../interfaces/form-config';
import { Group } from '../group';
import { IFormControl } from '../../../../interfaces/form-control';
import { isFormGroup } from '../../../../utils/form-config';
import '../style.css';

interface PageProps {
  value: ITabPage;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
}

export const Page: React.FC<PageProps> = (props) => {
  const { value, onSelectItem, update } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload != null) {
      const group = dropResult.payload;
      if (isFormGroup(group)) {
        console.log('param: ' + JSON.stringify(group));
        if (removedIndex != null) {
          value.items?.splice(removedIndex, 1);
        }
        if (addedIndex != null) {
          value.items?.splice(addedIndex, 0, group);
        }
      }
      update();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        groupName={'groups'}
        getChildPayload={(i) => (value.items ? value.items[i] : [])}
        onDrop={onDrop}
      >
        {value.items?.map((item, index) => {
          return (
            <Draggable key={index}>
              <Group value={item as IFormGroup} key={index} onSelectItem={onSelectItem}></Group>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
