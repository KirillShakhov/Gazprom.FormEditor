import React from 'react';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { DefaultType } from './types/default-type';
import { NumberType } from './types/number-type';
import { TextType } from './types/text-type';
import {TextAreaType} from "./types/textarea-type";

interface ElementProps {
  value: IFormControl;
}

function renderSwitch(value: IFormControl) {
  switch (value.type) {
    case CONTROL_TYPE.NUMBER:
      return <NumberType value={value}></NumberType>;
    case CONTROL_TYPE.TEXT:
      return <TextType value={value}></TextType>;
    case CONTROL_TYPE.TEXTAREA:
      return <TextAreaType value={value}></TextAreaType>;
    default:
      return <DefaultType value={value}></DefaultType>;
  }
}

export const Element: React.FC<ElementProps> = (props) => {
  const { value } = props;

  return <div style={{ marginTop: 20 }}>{renderSwitch(value)}</div>;
};
