import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { FORM_GROUP_DIRECTION, IForm } from '../../../../interfaces/form-config';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {CONTROL_TYPE} from "../../../../interfaces/form-control";

interface ComponentsTabProps {
  form: IForm;
  update: () => void;
}

export const ComponentsTab: React.FC<ComponentsTabProps> = (props) => {
  const { form, update } = props;

  const list: any[] = [
    {
      code: 'TabGroup',
      name: 'Группа табы',
      pages: [],
    },
    {
      code: 'Page1',
      name: 'Страница 1',
      items: [],
    },
    {
      code: 'Group1',
      name: 'Группа 1',
      direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
      items: [],
    },
    {
      code: 'Element1',
      name: 'Элемент1',
      dataSource: 'Parameter1',
      type: CONTROL_TYPE.NUMBER,
      properties: {
        minValue: 0,
        maxValue: 100,
      },
    },
  ];

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <div className="tab-item">
      <Container getChildPayload={() => list[0]} groupName={'pages-groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа страниц
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={() => list[1]} groupName={'pages'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Страницы
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={() => list[2]} groupName={'groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={() => list[3]} groupName={'parameters'} behaviour={'copy'}>
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
