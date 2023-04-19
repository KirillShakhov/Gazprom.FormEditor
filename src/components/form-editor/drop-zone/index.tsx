import React from 'react';
import { Container } from 'react-smooth-dnd';
import { IForm } from '../../../interfaces/form-config';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface ElementProps {
  form: IForm;
}

export const DropZone: React.FC<ElementProps> = (props) => {
  const { form } = props;
  return (
    <Container style={{ height: '100%', width: '100%', display: 'flex' }} shouldAcceptDrop={() => true} behaviour={'drop-zone'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          margin: 10,
          border: '3px dotted #e0e0e0',
          borderRadius: '6px',
        }}
      >
        <DeleteForeverRoundedIcon sx={{ color: '#808080' }} />
        <span
          style={{
            color: '#808080',
          }}
        >
          Удаление компонента
        </span>
      </div>
    </Container>
  );
};
