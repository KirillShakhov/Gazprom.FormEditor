import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IParameter } from '../../../interfaces/parameter';

interface ParametersTabProps {
  properties: IParameter[];
}

export const ParametersTab: React.FC<ParametersTabProps> = (props) => {
  const { properties } = props;

  return (
    <div className="tab-item parameters-tab">
      <Container getChildPayload={(i) => properties[i]} groupName={'parameters'} behaviour={'copy'}>
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
