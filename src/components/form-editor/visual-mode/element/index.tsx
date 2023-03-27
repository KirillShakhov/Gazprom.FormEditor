import React, {useEffect} from 'react';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { DefaultType } from './types/default-type';
import { NumberType } from './types/number-type';
import { TextType } from './types/text-type';
import { TextAreaType } from './types/textarea-type';
import { DatePickerType } from './types/datepicker-type';
import { SwitchType } from './types/switch-type';
import { CheckBoxType } from './types/checkbox-type';
import { RadioGroupType } from './types/radiogroup-type';

interface ElementProps {
  value: IFormControl;
  isSelected: boolean;
  onSelectItem: (value: IFormControl) => void;
}

function renderSwitch(value: IFormControl) {
  switch (value.type) {
    case CONTROL_TYPE.NUMBER:
      return <NumberType value={value}></NumberType>;
    case CONTROL_TYPE.TEXT:
      return <TextType value={value}></TextType>;
    case CONTROL_TYPE.TEXTAREA:
      return <TextAreaType value={value}></TextAreaType>;
    case CONTROL_TYPE.DATEPICKER:
      return <DatePickerType value={value}></DatePickerType>;
    case CONTROL_TYPE.SWITCH:
      return <SwitchType value={value}></SwitchType>;
    case CONTROL_TYPE.CHECKBOX:
      return <CheckBoxType value={value}></CheckBoxType>;
    case CONTROL_TYPE.RADIOGROUP:
      return <RadioGroupType value={value}></RadioGroupType>;
    default:
      return <DefaultType value={value}></DefaultType>;
  }
}

export const Element: React.FC<ElementProps> = (props) => {
  const { value, isSelected, onSelectItem } = props;

  const onClick = () => {
    if (!isSelected) {
      // console.log(JSON.stringify(value));
      onSelectItem(value);
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        border: 1,
        borderColor: isSelected ? '#3373d9' : '#e0e0e0',
        borderStyle: 'dotted',
        padding: 5,
      }}
      role="presentation"
      onClick={onClick}
    >
      {renderSwitch(value)}
    </div>
  );
};
