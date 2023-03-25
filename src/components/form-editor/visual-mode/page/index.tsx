import React from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormGroup, ITabPage } from '../../../../interfaces/form-config';
import { Group } from '../group';
import { generateStandardElement } from '../../../../utils/generate-form';

interface PageProps {
  value: ITabPage;
}

export const Page: React.FC<PageProps> = (props) => {
  const { value } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    //

    //
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
      <Container groupName={'groups'} onDrop={onDrop} onDragEnter={onDragEnter}>
        {value.items?.map((item, index) => {
          return (
            <Draggable key={index}>
              <Group value={item as IFormGroup} key={index}></Group>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
