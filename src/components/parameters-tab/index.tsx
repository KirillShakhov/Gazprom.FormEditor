import React, { useState } from 'react';
import './style.css';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';

interface ParametersTabProps {
  lists: string[];
  setLists: (value: string[]) => void;
}

export const ParametersTab: React.FC<ParametersTabProps> = () => {
  const [lists, setLists] = useState([
    'Параметр 1 / Строка',
    'Параметр 2 / Число',
    'Параметр 3 / Ссылка',
    'Параметр 4 / Число',
    'Параметр 5 / Число',
  ]);

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex == null || addedIndex == null) return;
    const items = [...lists];
    const item = items[removedIndex];
    items.splice(removedIndex, 1);
    items.splice(addedIndex, 0, item);
    setLists(items);
  };

  return (
    <div className="parameters-tab">
      <Container onDrop={onDrop}>
        {lists.map((item) => {
          return (
            <Draggable key={item}>
              <div className="parameter-item">{item}</div>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};
