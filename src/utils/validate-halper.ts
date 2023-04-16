import { object, setLocale, string, array } from 'yup';
import { FORM_GROUP_DIRECTION, IFormGroup, IFormItem, ITabPage, ITabPageController } from '../interfaces/form-config';
import { IFormElement } from '../interfaces/form-element';
import { CONTROL_TYPE, IFormControl } from '../interfaces/form-control';
import { ErrorObject, Schema } from 'ajv/lib/types';

setLocale({
  // mixed: {
  //   default: 'Não é válido',
  // },
  // number: {
  //   min: 'Deve ser maior que ${min}',
  // },
});

const formElement = object<IFormElement>().shape({
  code: string().required(),
  name: string().required(),
  properties: object().optional(),
});

const formControl = object<IFormControl>()
  .shape({
    dataSource: string().required(),
    type: string().oneOf(Object.values(CONTROL_TYPE)).required(),
  })
  .test((value) => {
    return new Promise((res, rej) => {
      formElement
        .validate(value)
        .then(() => res(true))
        .catch((e) => {
          rej(e);
        });
    });
  });

const formItem = object<IFormItem>().test((value) => {
  return new Promise((res, rej) => {
    formElement
      .validate(value)
      .then(() => {
        tabPageController
          .validate(value)
          .then(() => res(true))
          .catch((e1) => {
            formControl
              .validate(value)
              .then(() => res(true))
              .catch((e2) => {
                formGroup
                  .validate(value)
                  .then(() => res(true))
                  .catch((e3) => {
                    let errors = '';
                    errors += `tabPageController ${e1}\n`;
                    errors += `formControl ${e2}\n`;
                    errors += `formGroup ${e3}\n`;
                    rej(`IFormItem ${errors}`);
                  });
              });
          });
      })
      .catch((e) => {
        rej(e);
      });
  });
});

const formGroup = object<IFormGroup>()
  .shape({
    direction: string().oneOf(Object.values(FORM_GROUP_DIRECTION)).required(),
    items: array(formItem).optional(),
  })
  .test((value) => {
    return new Promise((res, rej) => {
      formElement
        .validate(value)
        .then(() => res(true))
        .catch((e) => {
          rej(e);
        });
    });
  });

const tabPage = object<ITabPage>()
  .shape({
    items: array(formItem).required(),
  })
  .test((value) => {
    return new Promise((res, rej) => {
      formElement
        .validate(value)
        .then(() => res(true))
        .catch((e) => {
          rej(e);
        });
    });
  });

const tabPageController = object<ITabPageController>()
  .shape({
    pages: array(tabPage).required(),
  })
  .test((value) => {
    return new Promise((res, rej) => {
      formElement
        .validate(value)
        .then(() => res(true))
        .catch((e) => {
          rej(e);
        });
    });
  });

const schemaFormElement: Schema = {
  $id: 'formElement',
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' },
    properties: { type: 'object' },
  },
  required: ['code', 'name'],
  additionalProperties: true,
};

const schemaFormItem: Schema = {
  $id: 'formItem',
  type: 'object',
  properties: {},
  required: [],
  additionalProperties: true,
  $ref: 'formElement',
};

const schemaForm: Schema = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    items: {
      type: 'array',
      items: schemaFormElement,
    },
  },
  required: ['description'],
  additionalProperties: true,
  $ref: 'formElement',
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
