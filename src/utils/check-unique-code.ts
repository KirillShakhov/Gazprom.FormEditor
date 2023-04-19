import { IForm, IFormGroup, IFormItem, ITabPage, ITabPageController } from '../interfaces/form-config';
import { isFormControl, isFormGroup, isTabPageController } from './form-config';
import { IFormElement } from '../interfaces/form-element';

export const checkUniqueCode = (form: IForm): string => {
  const list: string[] = [];
  const itemRes = checkElement(form, list);
  if (itemRes != '') return itemRes;
  if (form.items == undefined) return '';
  for (const item of form.items) {
    const elementRes = checkFormItem(item, list);
    if (elementRes != '') return elementRes;
  }
  return '';
};

const checkPageGroup = (item: ITabPageController, list: string[]): string => {
  const itemRes = checkElement(item, list);
  if (itemRes != '') return itemRes;
  if (item.pages === undefined) return '';
  for (const page of item.pages) {
    const itemRes = checkPage(page, list);
    if (itemRes != '') return itemRes;
  }
  return '';
};

const checkPage = (item: ITabPage, list: string[]): string => {
  const itemRes = checkElement(item, list);
  if (itemRes != '') return itemRes;
  if (item.items === undefined) return '';
  for (const i of item.items) {
    const itemRes = checkFormItem(i, list);
    if (itemRes != '') return itemRes;
  }
  return '';
};

const checkFormItem = (item: IFormItem, list: string[]): string => {
  if (isTabPageController(item)) {
    const elementRes = checkPageGroup(item, list);
    if (elementRes != '') return elementRes;
  } else if (isFormGroup(item)) {
    const elementRes = checkGroup(item, list);
    if (elementRes != '') return elementRes;
  } else if (isFormControl(item)) {
    const elementRes = checkElement(item, list);
    if (elementRes != '') return elementRes;
  }
  return '';
};

const checkGroup = (item: IFormGroup, list: string[]): string => {
  const itemRes = checkElement(item, list);
  if (itemRes != '') return itemRes;
  if (item.items === undefined) return '';
  for (const element of item.items) {
    const elementRes = checkFormItem(element, list);
    if (elementRes != '') return elementRes;
  }
  return '';
};

const checkElement = (item: IFormElement, list: string[]): string => {
  if (list.includes(item.code)) return item.code;
  list.push(item.code);
  return '';
};
