import { IForm } from '../interfaces/form-config';
import { isFormGroup, isTabPageController } from './form-config';

export const generateCode = (form: IForm, prefix: string): string => {
  let id = 0;
  while (containsCodeInForm(form, `${prefix} ${id}`)) id++;
  return `${prefix} ${id}`;
};

const containsCodeInForm = (form: IForm, code: string) => {
  console.log('containsCodeInForm ' + code);
  if (form.items == undefined) return false;
  for (const pageGroup of form.items) {
    if (pageGroup.code === code) return true;
    if (isTabPageController(pageGroup)) {
      if (pageGroup.pages === undefined) continue;
      for (const page of pageGroup.pages) {
        if (page.code === code) return true;
        if (page.items === undefined) continue;
        for (const group of page.items) {
          if (group.code === code) return true;
          if (isFormGroup(group)) {
            if (group.items === undefined) continue;
            for (const element of group.items) {
              if (element.code === code) return true;
            }
          }
        }
      }
    }
  }
  return false;
};
