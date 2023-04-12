import { generateCode } from './id-generator';
import {FORM_GROUP_DIRECTION, IFormGroup, IFormItem, ITabPage, ITabPageController} from '../interfaces/form-config';
import { CONTROL_TYPE, IFormControl } from '../interfaces/form-control';
import { IParameter, PARAMETER_TYPE } from '../interfaces/parameter';

export const generatePageGroup = (): ITabPageController => {
  return {
    code: 'TabGroup ' + generateCode(),
    name: 'Группа табы',
    pages: [],
  };
};

export const generatePage = (): ITabPage => {
  return {
    code: 'Page1' + generateCode(),
    name: 'Страница',
    items: [],
  };
};

export const generateGroup = (): IFormGroup => {
  return {
    code: 'Group1',
    name: 'Группа',
    direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
    items: [],
  };
};

/** Генерация стандартного поля. */
export const generateElement = (parameter: IParameter): IFormItem & IFormControl => {
  const item: IFormItem & IFormControl = {
    code: `Element(${parameter.code})`,
    name: `Элемент(${parameter.name})`,
    dataSource: parameter.code,
    type: CONTROL_TYPE.TEXT,
    properties: {},
  };
  switch (parameter.type) {
    case PARAMETER_TYPE.STRING:
      item.type = CONTROL_TYPE.TEXT;
      item.properties = {};
      break;
    case PARAMETER_TYPE.NUMBER:
      item.type = CONTROL_TYPE.NUMBER;
      item.properties = {};
      break;
    case PARAMETER_TYPE.INTEGER:
      item.type = CONTROL_TYPE.NUMBER;
      item.properties = {};
      break;
    case PARAMETER_TYPE.BOOLEAN:
      item.type = CONTROL_TYPE.CHECKBOX;
      item.properties = {};
      break;
    case PARAMETER_TYPE.DATE:
      item.type = CONTROL_TYPE.DATEPICKER;
      item.properties = {};
      break;
    case PARAMETER_TYPE.DATETIME:
      item.type = CONTROL_TYPE.DATETIMEPICKER;
      item.properties = {};
      break;
    case PARAMETER_TYPE.REF:
      item.type = CONTROL_TYPE.SELECT;
      item.properties = {};
      break;
    case PARAMETER_TYPE.FILE:
      item.type = CONTROL_TYPE.FILE;
      item.properties = {};
      break;
  }
  return item;
};
