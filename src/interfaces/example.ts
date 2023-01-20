import { FORM_GROUP_DIRECTION, IForm } from './form-config';
import { CONTROL_TYPE } from './form-control';
import { IParameter, PARAMETER_TYPE } from './parameter';

export const parameters: IParameter[] = [
  {
    code: 'Parameter1',
    name: 'Параметр 1',
    type: PARAMETER_TYPE.NUMBER,
  },
  {
    code: 'Parameter2',
    name: 'Параметр 2',
    type: PARAMETER_TYPE.STRING,
  }
]

/** Пример объекта. */
export const form: IForm = {
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
              items: [
                {
                  code: 'Element1',
                  name: 'Элемент1',
                  dataSource: 'Parameter1',
                  type: CONTROL_TYPE.NUMBER,
                  properties: {
                    minValue: 0,
                    maxValue: 100,
                  },
                },
                {
                  code: 'Element2',
                  name: 'Элемент2',
                  dataSource: 'Parameter2',
                  type: CONTROL_TYPE.TEXT,
                  properties: {
                    multiline: true,
                    lineCount: 2,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
