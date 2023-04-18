import { IFormGroup, IFormItem, ITabPage, ITabPageController } from '../interfaces/form-config';
import { IFormControl } from '../interfaces/form-control';
import { IFormElement } from '../interfaces/form-element';

/** Type Guards. */

/** Является ли элемент контроллером табов. */
export const isTabPageController = (item: IFormElement): item is ITabPageController =>
  (item as ITabPageController).pages !== undefined;

/** Является ли элемент группой. */
export const isFormGroup = (item: IFormElement): item is IFormGroup => (item as IFormGroup).direction !== undefined;

/** Является ли элемент страницей. */
export const isFormPage = (item: IFormElement): item is ITabPage => {
  return !item.hasOwnProperty('direction') && (item as ITabPage).items !== undefined;
};

/** Является ли элемент полем ввода. */
export const isFormControl = (item: IFormElement): item is IFormControl =>
  (item as IFormControl).dataSource !== undefined;

/** Является ли элемент IFormItem. */
export const isFormItem = (item: IFormElement): item is IFormItem => {
  return isTabPageController(item) || isFormGroup(item) || isFormControl(item);
};
