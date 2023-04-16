import { IForm } from '../interfaces/form-config';
import { isFormGroup, isTabPageController } from './form-config';

export const checkUniqueCode = (form: IForm): string => {
  const list: string[] = [];
  list.push(form.code);
  if (form.items == undefined) return '';
  console.log('start');
  for (const pageGroup of form.items) {
    if (list.includes(pageGroup.code)) return pageGroup.code;
    list.push(pageGroup.code);
    if (isTabPageController(pageGroup)) {
      if (pageGroup.pages === undefined) continue;
      for (const page of pageGroup.pages) {
        if (list.includes(page.code)) return page.code;
        list.push(page.code);
        if (page.items === undefined) continue;
        for (const group of page.items) {
          if (list.includes(group.code)) return group.code;
          list.push(group.code);
          if (isFormGroup(group)) {
            if (group.items === undefined) continue;
            for (const element of group.items) {
              if (list.includes(element.code)) return element.code;
              list.push(element.code);
            }
          }
        }
      }
    }
  }
  return '';
};
