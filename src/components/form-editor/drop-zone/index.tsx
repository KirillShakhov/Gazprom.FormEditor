import React from 'react';
import { Container } from 'react-smooth-dnd';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import './style.css';

export const DropZone: React.FC = () => {
  const [draggable, setDraggable] = React.useState(false);

  const onDrop = () => {
    setDraggable(false);
  };

  return (
    <Container
      style={{ height: '100%', width: '100%', display: 'flex' }}
      shouldAcceptDrop={() => true}
      behaviour={'drop-zone'}
      onDrop={onDrop}
      onDragEnter={() => {
        setDraggable(true);
      }}
      onDragLeave={() => {
        setDraggable(false);
      }}
      dragClass={'dropClass'}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          margin: 10,
          border: draggable ? '3px solid #dc7777' : '3px dotted #e0e0e0',
          borderRadius: '6px',
        }}
        className={'noSelect'}
      >
        <DeleteForeverRoundedIcon sx={{ color: draggable ? '#dc7777' : '#808080' }} />
        <span
          style={{
            color: draggable ? '#dc7777' : '#808080',
          }}
        >
          Удаление компонента
        </span>
      </div>
    </Container>
  );
};
