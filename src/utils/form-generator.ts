import { FORM_GROUP_DIRECTION, IForm, IFormItem } from '../interfaces/form-config';
import { IParameter } from '../interfaces/parameter';
import { generateElement } from './element-generators';

/** Генерация стандартной формы. */
export const generateStandardForm = (parameters: IParameter[]): IForm => {
  const items: IFormItem[] = [];
  const form = {
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
                direction: FORM_GROUP_DIRECTION.VERTICAL,
                items: items,
              },
            ],
          },
        ],
      },
    ],
  };
  parameters.forEach((param) => {
    items.push(generateElement(form, param));
  });
  return form;
};
