import React from 'react';
import './style.css';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IParameter } from '../../../../interfaces/parameter';

interface ParametersTabProps {
  properties: IParameter[];
  // setLists: (value: string[]) => void;
}

export const ParametersTab: React.FC<ParametersTabProps> = (props) => {
  const { properties } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null || addedIndex == null) return;
    // const items = [...lists];
    // const item = items[removedIndex];
    // items.splice(removedIndex, 1);
    // items.splice(addedIndex, 0, item);
    // setLists(items);
  };

  return (
    <div className="tab-item parameters-tab">
      <Container onDrop={onDrop}>
        {properties.map((param, index) => {
          return (
            <Draggable key={index}>
              <div className="parameter-item">
                {param.name} / {param.type}
              </div>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
