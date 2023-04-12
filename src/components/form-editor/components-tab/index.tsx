import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IForm } from '../../../interfaces/form-config';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { generateElement, generateGroup, generatePage, generatePageGroup } from '../../../utils/element-generators';
import { IParameter } from '../../../interfaces/parameter';

interface ComponentsTabProps {
  form: IForm;
  parameters: IParameter[];
}

export const ComponentsTab: React.FC<ComponentsTabProps> = (props) => {
  const { form, parameters } = props;

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <div className="tab-item">
      <Container getChildPayload={generatePageGroup} groupName={'pages-groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа страниц
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={generatePage} groupName={'pages'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Страницы
          </div>
        </Draggable>
      </Container>
      <Container getChildPayload={generateGroup} groupName={'groups'} behaviour={'copy'}>
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={onClick} />
            Группа
          </div>
        </Draggable>
      </Container>
      {parameters?.length > 0 && (
        <Container getChildPayload={() => generateElement(parameters[0])} groupName={'parameters'} behaviour={'copy'}>
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
