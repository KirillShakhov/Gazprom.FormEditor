import { ErrorObject, Schema } from 'ajv/lib/types';

// const formElement = object<IFormElement>().shape({
//   code: string().required(),
//   name: string().required(),
//   properties: object().optional(),
// });
//
// const formControl = object<IFormControl>()
//   .shape({
//     dataSource: string().required(),
//     type: string().oneOf(Object.values(CONTROL_TYPE)).required(),
//   })
//   .test((value) => {
//     return new Promise((res, rej) => {
//       formElement
//         .validate(value)
//         .then(() => res(true))
//         .catch((e) => {
//           rej(e);
//         });
//     });
//   });

// const formItem = object<IFormItem>().test((value) => {
//   return new Promise((res, rej) => {
//     formElement
//       .validate(value)
//       .then(() => {
//         tabPageController
//           .validate(value)
//           .then(() => res(true))
//           .catch((e1) => {
//             formControl
//               .validate(value)
//               .then(() => res(true))
//               .catch((e2) => {
//                 formGroup
//                   .validate(value)
//                   .then(() => res(true))
//                   .catch((e3) => {
//                     let errors = '';
//                     errors += `tabPageController ${e1}\n`;
//                     errors += `formControl ${e2}\n`;
//                     errors += `formGroup ${e3}\n`;
//                     rej(`IFormItem ${errors}`);
//                   });
//               });
//           });
//       })
//       .catch((e) => {
//         rej(e);
//       });
//   });
// });

// const formGroup = object<IFormGroup>()
//   .shape({
//     direction: string().oneOf(Object.values(FORM_GROUP_DIRECTION)).required(),
//     items: array(formItem).optional(),
//   })
//   .test((value) => {
//     return new Promise((res, rej) => {
//       formElement
//         .validate(value)
//         .then(() => res(true))
//         .catch((e) => {
//           rej(e);
//         });
//     });
//   });
//
// const tabPage = object<ITabPage>()
//   .shape({
//     items: array(formItem).required(),
//   })
//   .test((value) => {
//     return new Promise((res, rej) => {
//       formElement
//         .validate(value)
//         .then(() => res(true))
//         .catch((e) => {
//           rej(e);
//         });
//     });
//   });
//
// const tabPageController = object<ITabPageController>()
//   .shape({
//     pages: array(tabPage).required(),
//   })
//   .test((value) => {
//     return new Promise((res, rej) => {
//       formElement
//         .validate(value)
//         .then(() => res(true))
//         .catch((e) => {
//           rej(e);
//         });
//     });
//   });

const schemaFormElement: Schema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' },
    properties: { type: 'object' },
  },
  required: ['code', 'name'],
  additionalProperties: true,
};

const arrayFormItems: Schema = {
  type: 'array',
  items: schemaFormElement,
};

const schemaFormItem: Schema = {
  type: 'object',
  properties: {
    pages: arrayFormItems,
    items: arrayFormItems,
  },
  additionalProperties: true,
};

const schemaForm: Schema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' },
    properties: { type: 'object' },
    description: { type: 'string' },
    items: {
      type: 'array',
      items: schemaFormItem,
    },
  },
  required: ['code', 'name', 'description'],
  additionalProperties: true,
};

// const formElement = object<IFormElement>().shape({
//   code: string().required(),
//   name: string().required(),
//   properties: object().optional(),
// });

const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

export const validate = async (json: unknown): Promise<null | ErrorObject[]> => {
  // const validationResult = form
  //   .validate(json, { abortEarly: false, strict: true })
  //   .then(() => {
  //     return '';
  //   })
  //   .catch((errors) => {
  //     console.log(errors);
  //     return '';
  //   });
  // validationResult.then((e) => {
  //   console.log(e);
  // }); // gives "basicDetails.emailId"
  // return validationResult;

  const validate = ajv.compile(schemaForm);
  validate(json);
  return validate.errors;
};
