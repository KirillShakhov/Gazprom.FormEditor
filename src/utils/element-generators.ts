import { generateCode } from './id-generator';
import {
  FORM_GROUP_DIRECTION,
  IForm,
  IFormGroup,
  IFormItem,
  ITabPage,
  ITabPageController,
} from '../interfaces/form-config';
import { CONTROL_TYPE, IFormControl } from '../interfaces/form-control';
import { IParameter, PARAMETER_TYPE } from '../interfaces/parameter';

export const generatePageGroup = (form: IForm): ITabPageController => {
  return {
    code: generateCode(form, 'TabGroup'),
    name: 'Группа табы',
    pages: [],
  };
};

export const generatePage = (form: IForm): ITabPage => {
  return {
    code: generateCode(form, 'Page'),
    name: 'Страница',
    items: [],
  };
};

export const generateGroup = (form: IForm): IFormGroup => {
  return {
    code: generateCode(form, 'Group'),
    name: 'Группа',
    direction: FORM_GROUP_DIRECTION.VERTICAL,
    items: [],
  };
};

/** Генерация стандартного поля. */
export const generateElement = (form: IForm, parameter: IParameter): IFormItem & IFormControl => {
  const item: IFormItem & IFormControl = {
    code: generateCode(form, 'Element'),
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
