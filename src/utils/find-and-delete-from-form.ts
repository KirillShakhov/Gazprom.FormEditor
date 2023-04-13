import { IForm } from '../interfaces/form-config';
import { IFormElement } from '../interfaces/form-element';
import { isFormGroup, isTabPageController } from './form-config';

export const findAndDeleteFromForm = (form: IForm, value: IFormElement) => {
  if (form.items == undefined) return;
  for (let i = 0; i < form.items.length; i++) {
    const pageGroup = form.items[i];
    if (pageGroup == value) {
      form.items.splice(i, 1);
      return;
    }
    if (!isTabPageController(pageGroup)) continue;
    if (pageGroup.pages === undefined) continue;
    for (let j = 0; j < pageGroup.pages.length; j++) {
      const page = pageGroup.pages[j];
      if (page == value) {
        pageGroup.pages.splice(j, 1);
        return;
      }
      if (page.items === undefined) continue;
      for (let k = 0; k < page.items.length; k++) {
        const group = page.items[k];
        if (group == value) {
          page.items.splice(k, 1);
          return;
        }
        if (!isFormGroup(group)) continue;
        if (group.items === undefined) continue;
        for (let l = 0; l < group.items.length; l++) {
          const element = group.items[l];
          if (element == value) {
            group.items.splice(l, 1);
            return;
          }
        }
      }
    }
  }
};
