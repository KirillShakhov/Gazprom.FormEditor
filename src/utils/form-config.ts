import { IFormGroup, IFormItem, ITabPageController } from '../interfaces/form-config';
import { IFormControl } from '../interfaces/form-control';

/** Type Guards. */

/** Является ли элемент контроллером табов. */
export const isTabPageController = (item: IFormItem): item is ITabPageController =>
  (item as ITabPageController).pages !== undefined;

/** Явяляется ли элемент группой. */
export const isFormGroup = (item: IFormItem): item is IFormGroup => (item as IFormGroup).direction !== undefined;

/** Является ли элемент полем ввода. */
export const isFormControl = (item: IFormItem): item is IFormControl => (item as IFormControl).dataSource !== undefined;
