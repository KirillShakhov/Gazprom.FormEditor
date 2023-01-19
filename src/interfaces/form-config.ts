import { IFormControl } from './form-control';
import { IFormElement } from './form-element';

/** Направление группировки. */
export enum FORM_GROUP_DIRECTION {
  /** Строго горизонтально. */
  FORCE_HORIZONTAL = 'FORCE_HORIZONTAL',
  /** Горизонтально (возможен перенос на след. Строку (flex)). */
  HORIZONTAL = 'HORIZONTAL',
  /** Вертикально. */
  VERTICAL = 'VERTICAL',
}

/** Группа формы. */
export interface IFormGroup extends IFormElement {
  /** Направление. */
  direction: FORM_GROUP_DIRECTION;
  /** Элементы. */
  items?: IFormItem[];
}

/** Элемент формы. */
export type IFormItem = IFormControl | IFormGroup | ITabPageController;

/** Страница. */
export interface ITabPage extends IFormElement {
  /** Элементы страницы. */
  items?: IFormItem[];
}

/** Контроллер табов. */
export interface ITabPageController extends IFormElement {
  /** Страницы. */
  pages: ITabPage[];
}

/** Конфигурация формы. */
export interface IForm extends IFormElement {
  /** Описание. */
  description?: string;
  /** Элементы формы. */
  items?: IFormItem[];
}
