import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IForm } from '../../../../interfaces/form-config';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

interface ComponentsTabProps {
  form: IForm;
  update: () => void;
}

export const ComponentsTab: React.FC<ComponentsTabProps> = (props) => {
  const { form } = props;

  const list: any[] = [{ name: '123' }, { name: '123' }, { name: '123' }, { name: '123' }];

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <div className="tab-item">
      <Container getChildPayload={(i) => list[i]} groupName={'pages-groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа страниц
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={(i) => list[i]} groupName={'pages'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Страницы
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={(i) => list[i]} groupName={'groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={(i) => list[i]} groupName={'parameters'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Поле ввода
          </div>
        </Draggable>
      </Container>
    </div>
  );
};
