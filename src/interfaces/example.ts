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
  },
];

/** Пример объекта. */
// export const form: IForm = {
//   code: 'FormCode',
//   name: 'Пример формы',
//   description: 'FormDescription',
//   items: [
//     {
//       code: 'TabGroup',
//       name: 'Группа табы',
//       pages: [
//         {
//           code: 'Page1',
//           name: 'Страница 1',
//           items: [
//             {
//               code: 'Group1',
//               name: 'Группа 1',
//               direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
//               items: [
//                 {
//                   code: 'Element1',
//                   name: 'Элемент1',
//                   dataSource: 'Parameter1',
//                   type: CONTROL_TYPE.NUMBER,
//                   properties: {
//                     minValue: 0,
//                     maxValue: 100,
//                   },
//                 },
//                 {
//                   code: 'Element2',
//                   name: 'Элемент2',
//                   dataSource: 'Parameter2',
//                   type: CONTROL_TYPE.TEXT,
//                   properties: {
//                     multiline: true,
//                     lineCount: 2,
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

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
            {
              code: 'Group2',
              name: 'Группа 2',
              direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
              items: [
                {
                  code: 'Element3',
                  name: 'Элемент3',
                  dataSource: 'Parameter1',
                  type: CONTROL_TYPE.NUMBER,
                  properties: {
                    minValue: 0,
                    maxValue: 100,
                  },
                },
                {
                  code: 'Element4',
                  name: 'Элемент4',
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
        {
          code: 'Page1',
          name: 'Страница 2',
          items: [
            {
              code: 'Group1',
              name: 'Группа 3',
              direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
              items: [
                {
                  code: 'Element5',
                  name: 'Элемент5',
                  dataSource: 'Parameter1',
                  type: CONTROL_TYPE.NUMBER,
                  properties: {
                    minValue: 0,
                    maxValue: 100,
                  },
                },
                {
                  code: 'Element6',
                  name: 'Элемент6',
                  dataSource: 'Parameter2',
                  type: CONTROL_TYPE.TEXT,
                  properties: {
                    multiline: true,
                    lineCount: 2,
                  },
                },
              ],
            },
            {
              code: 'Group4',
              name: 'Группа 4',
              direction: FORM_GROUP_DIRECTION.FORCE_HORIZONTAL,
              items: [
                {
                  code: 'Element7',
                  name: 'Элемент7',
                  dataSource: 'Parameter1',
                  type: CONTROL_TYPE.NUMBER,
                  properties: {
                    minValue: 0,
                    maxValue: 100,
                  },
                },
                {
                  code: 'Element8',
                  name: 'Элемент8',
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
