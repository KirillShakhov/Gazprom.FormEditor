import { IForm, IFormGroup, IFormItem, ITabPageController } from '../interfaces/form-config';
import { IFormElement } from '../interfaces/form-element';
import { isFormGroup, isTabPageController } from './form-config';

export const findAndDeleteFromForm = (form: IForm, value: IFormElement) => {
  if (form.items == undefined) return;
  for (let i = 0; i < form.items.length; i++) {
    const item = form.items[i];
    if (item == value) {
      form.items.splice(i, 1);
      return;
    }
    findAndDeleteFromItem(form, item, value);
  }
};

export const findAndDeleteFromItem = (form: IForm, item: IFormItem, value: IFormElement) => {
  if (isTabPageController(item)) {
    findAndDeleteTabPage(form, item, value);
  } else if (isFormGroup(item)) {
    findAndDeleteGroup(form, item, value);
  }
};

export const findAndDeleteTabPage = (form: IForm, controller: ITabPageController, value: IFormElement) => {
  if (controller.pages === undefined) return;
  for (let i = 0; i < controller.pages.length; i++) {
    const page = controller.pages[i];
    if (page == value) {
      controller.pages.splice(i, 1);
      return;
    }
    if (page.items === undefined) return;
    for (let i = 0; i < page.items.length; i++) {
      const item = page.items[i];
      if (item == value) {
        page.items.splice(i, 1);
        return;
      }
      findAndDeleteFromItem(form, item, value);
    }
  }
};

export const findAndDeleteGroup = (form: IForm, group: IFormGroup, value: IFormElement) => {
  if (group.items === undefined) return;
  for (let i = 0; i < group.items.length; i++) {
    const item = group.items[i];
    if (item == value) {
      group.items.splice(i, 1);
      return;
    }
    findAndDeleteFromItem(form, item, value);
  }
};
