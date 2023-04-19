import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IParameter } from '../../../interfaces/parameter';
import { generateElement } from '../../../utils/element-generators';
import { IForm } from '../../../interfaces/form-config';

interface ParametersTabProps {
  form: IForm;
  properties: IParameter[];
}

export const ParametersTab: React.FC<ParametersTabProps> = (props) => {
  const { form, properties } = props;

  return (
    <div className="tab-item parameters-tab">
      <Container
        getChildPayload={(i) => generateElement(form, properties[i])}
        groupName={'parameters'}
        behaviour={'copy'}
      >
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
