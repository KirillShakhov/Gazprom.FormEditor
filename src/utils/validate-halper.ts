import { object, setLocale, string, array, mixed } from 'yup';
import { IForm, IFormGroup, IFormItem, ITabPage, ITabPageController } from '../interfaces/form-config';
import { IFormElement } from '../interfaces/form-element';
import { CONTROL_TYPE, IFormControl } from '../interfaces/form-control';

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
  properties: array(object()).optional(),
});

const formControl = object<IFormControl>()
  .shape({
    dataSource: string().required(),
    type: mixed<CONTROL_TYPE>().oneOf(Object.values(CONTROL_TYPE)).required(),
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

const formGroup = object<IFormGroup>()
  .shape({
    dataSource: string().required(),
    type: mixed<CONTROL_TYPE>().oneOf(Object.values(CONTROL_TYPE)).required(),
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
          .catch(() => {
            formControl
              .validate(value)
              .then(() => res(true))
              .catch(() => {
                // formGroup
                //   .validate(value)
                //   .then(() => res(true))
                //   .catch(() => {
                //     rej('not IFormItem');
                //   });
              });
          });
      })
      .catch((e) => {
        rej(e);
      });
  });
});

const tabPage = object<ITabPage>().shape({
  items: array(formItem).required(),
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

const form = object<IForm>()
  .shape({
    name: string().optional(),
    description: string().optional(),
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

export const validate = async (json: unknown): Promise<string> =>
  await form
    .validate(json)
    .then(() => {
      return '';
    })
    .catch((e) => {
      return e;
    });
