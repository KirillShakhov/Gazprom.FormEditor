import { FORM_GROUP_DIRECTION, IForm } from './form-config';
import { CONTROL_TYPE } from './form-control';

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
                    boolProperty: true,
                    stringProperty: 'Строковое значение',
                    numberProperty: 1,
                    nullProperty: null,
                  },
                },
              ],
            },
          ],
        },
        {
          code: 'Page1',
          name: 'Страница 1',
        },
      ],
    },
  ],
};
