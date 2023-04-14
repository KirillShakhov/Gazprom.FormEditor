import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IForm } from '../../../interfaces/form-config';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { generateElement, generateGroup, generatePage, generatePageGroup } from '../../../utils/element-generators';
import { IParameter } from '../../../interfaces/parameter';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '@mui/material';

interface ComponentsTabProps {
  form: IForm;
  parameters: IParameter[];
}

export const ComponentsTab: React.FC<ComponentsTabProps> = (props) => {
  const { form, parameters } = props;

  const onClick = () => {
    console.log('onClick');
  };

  const getGhostParent = (): HTMLElement => {
    return document.body;
  };

  return (
    <div className="tab-item">
      <Container
        getChildPayload={() => {
          return generatePageGroup(form);
        }}
        groupName={'pages-groups'}
        behaviour={'copy'}
      >
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа страниц
          </div>
        </Draggable>
      </Container>
      <Container
        getChildPayload={() => {
          const page = generatePage(form) as any;
          page.isNew = true;
          return page;
        }}
        groupName={'pages'}
        behaviour={'copy'}
        dragClass={'page-blob'}
        getGhostParent={(): HTMLElement => {
          return document.body;
        }}
      >
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Страница
          </div>
        </Draggable>
      </Container>
      <Container
        getChildPayload={() => {
          return generateGroup(form);
        }}
        groupName={'groups'}
        behaviour={'copy'}
      >
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа
          </div>
        </Draggable>
      </Container>
      {parameters?.length > 0 && (
        <Container
          getChildPayload={() => {
            return generateElement(form, parameters[0]);
          }}
          groupName={'parameters'}
          behaviour={'copy'}
        >
          <Draggable>
            <div className="component-item">
              <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
              Поле ввода
            </div>
          </Draggable>
        </Container>
      )}
    </div>
  );
};
