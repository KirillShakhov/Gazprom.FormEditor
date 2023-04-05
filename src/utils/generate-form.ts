import { FORM_GROUP_DIRECTION, IForm, IFormItem } from '../interfaces/form-config';
import { CONTROL_TYPE } from '../interfaces/form-control';
import { IParameter, PARAMETER_TYPE } from '../interfaces/parameter';

/** Генерация стандартной формы. */
export const generateStandardForm = (parameters: IParameter[]): IForm => {
  const items: IFormItem[] = [];
  parameters.forEach((param, index) => {
    const item: IFormItem = {
      code: `Element${index + 1}`,
      name: `Элемент${index + 1}`,
      dataSource: param.code,
      type: CONTROL_TYPE.TEXT,
      properties: {},
    };
    switch (param.type) {
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
    items.push(item);
  });
  return {
    code: 'FormCode',
    name: 'Пример формы',
    description: 'FormDescription',
    items: [
      {
        code: 'TabGroup',
        name: 'Группа табы',
        pages: [
          {
            code: 'Page1',
            name: 'Страница 1',
            items: [
              {
                code: 'Group1',
                name: 'Группа 1',
                direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
                items: items,
              },
            ],
          },
        ],
      },
    ],
  };
};

/** Генерация стандартного поля. */
export const generateStandardElement = (parameter: IParameter): IFormItem => {
  const item: IFormItem = {
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
