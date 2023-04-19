import { IForm, IFormGroup, IFormItem, ITabPage, ITabPageController } from '../interfaces/form-config';
import { isFormControl, isFormGroup, isTabPageController } from './form-config';
import { IFormElement } from '../interfaces/form-element';

export const generateCode = (form: IForm, prefix: string): string => {
  let id = 0;
  while (containsCodeInForm(form, `${prefix} ${id}`)) id++;
  return `${prefix} ${id}`;
};

const containsCodeInForm = (form: IForm, code: string) => {
  if (form.code == code) return true;
  if (form.items == undefined) return false;
  for (const item of form.items) {
    if (containsCodeInFormItem(item, code)) return true;
  }
  return false;
};

const containsCodeInPageGroup = (pageGroup: ITabPageController, code: string): boolean => {
  if (pageGroup.code == code) return true;
  if (pageGroup.pages === undefined) return false;
  for (const page of pageGroup.pages) {
    if (containsCodeInPage(page, code)) return true;
  }
  return false;
};

const containsCodeInPage = (pageGroup: ITabPage, code: string): boolean => {
  if (pageGroup.code == code) return true;
  if (pageGroup.items === undefined) return false;
  for (const item of pageGroup.items) {
    if (containsCodeInFormItem(item, code)) return true;
  }
  return false;
};

const containsCodeInGroup = (pageGroup: IFormGroup, code: string): boolean => {
  if (pageGroup.code == code) return true;
  if (pageGroup.items === undefined) return false;
  for (const item of pageGroup.items) {
    if (containsCodeInFormItem(item, code)) return true;
  }
  return false;
};

const containsCodeInControl = (element: IFormElement, code: string): boolean => {
  return element.code == code;
};

const containsCodeInFormItem = (item: IFormItem, code: string): boolean => {
  if (isTabPageController(item)) {
    return containsCodeInPageGroup(item, code);
  } else if (isFormGroup(item)) {
    return containsCodeInGroup(item, code);
  } else if (isFormControl(item)) {
    return containsCodeInControl(item, code);
  }
  return false;
};
