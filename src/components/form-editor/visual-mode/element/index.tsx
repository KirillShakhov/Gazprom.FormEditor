import React from 'react';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
import { DefaultType } from './types/default-type';
import { NumberType } from './types/number-type';
import { TextType } from './types/text-type';
import { TextAreaType } from './types/textarea-type';
import { DatePickerType } from './types/datepicker-type';
import { SwitchType } from './types/switch-type';
import { CheckBoxType } from './types/checkbox-type';
import { RadioGroupType } from './types/radiogroup-type';
import { DateTimePickerType } from './types/datetimepicker-type';
import { LinkType } from './types/link-type';
import { FileType } from './types/file-type';
import { ComboBoxType } from './types/combobox-type';
import { SelectType } from './types/select-type';
import { IFormElement } from '../../../../interfaces/form-element';

interface ElementProps {
  value: IFormControl;
  onSelectItem: (value: IFormElement) => void;
}

function renderSwitch(value: IFormControl) {
  switch (value.type) {
    case CONTROL_TYPE.NUMBER:
      return <NumberType value={value} />;
    case CONTROL_TYPE.TEXT:
      return <TextType value={value} />;
    case CONTROL_TYPE.TEXTAREA:
      return <TextAreaType value={value} />;
    case CONTROL_TYPE.SWITCH:
      return <SwitchType value={value} />;
    case CONTROL_TYPE.CHECKBOX:
      return <CheckBoxType value={value} />;
    case CONTROL_TYPE.RADIOGROUP:
      return <RadioGroupType value={value} />;
    case CONTROL_TYPE.DATEPICKER:
      return <DatePickerType value={value} />;
    case CONTROL_TYPE.DATETIMEPICKER:
      return <DateTimePickerType value={value} />;
    case CONTROL_TYPE.LINK:
      return <LinkType value={value} />;
    case CONTROL_TYPE.FILE:
      return <FileType value={value} />;
    case CONTROL_TYPE.COMBOBOX:
      return <ComboBoxType value={value} />;
    case CONTROL_TYPE.SELECT:
      return <SelectType value={value} />;
    default:
      return <DefaultType value={value}></DefaultType>;
  }
}

export const Element: React.FC<ElementProps> = (props) => {
  let { value, onSelectItem } = props;

  const [isSelected, setIsSelected] = React.useState(false);

  const useOutsideClick = (callback) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClick = (event) => {
        callback();
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [callback]);

    return ref;
  };

  const onClick = (e: any) => {
    e.preventDefault();
    onSelectItem(value);
    setIsSelected(true);
  };

  const handleClickOutside = () => {
    setIsSelected(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div
      ref={ref}
      style={{
        marginTop: 20,
        border: 1,
        borderRadius: 10,
        borderColor: isSelected ? '#3373d9' : '#e0e0e0',
        borderStyle: 'dotted',
        padding: 5,
        background: '#ffffff',
        zIndex: 100,
      }}
      role="presentation"
      onClick={onClick}
    >
      {renderSwitch(value)}
    </div>
  );
};
