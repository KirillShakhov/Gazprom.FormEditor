import { IFormElement } from './form-element';

/** Тип элемента управления. */
export enum CONTROL_TYPE {
  /** Чекбокс. */
  CHECKBOX = 'CHECKBOX',
  /** Переключатель. */
  SWITCH = 'SWITCH',
  /** Поле выбора даты. */
  DATEPICKER = 'DATEPICKER',
  /** Поле выбора даты-времени. */
  DATETIMEPICKER = 'DATETIMEPICKER',
  /** Число. */
  NUMBER = 'NUMBER',
  /** Ссылка. */
  LINK = 'LINK',
  /** Поле выбора файла. */
  FILE = 'FILE',
  /** Текстовое поле. */
  TEXT = 'TEXT',
  /** Многострочное текстовое поле. */
  TEXTAREA = 'TEXTAREA',
  /** Радио-группа. */
  RADIOGROUP = 'RADIOGROUP',
  /** Выпадающий список. */
  COMBOBOX = 'COMBOBOX',
  /** Выпадающий список с текстовым поиском и возможностью множественного выбора. */
  SELECT = 'SELECT',
}

/** Типы элементов управления. */
export type ControlTypes = keyof typeof CONTROL_TYPE;

/** Элемент управления формы. */
export interface IFormControl extends IFormElement {
  /** Код параметра операции. */
  dataSource: string;
  /** Тип элемента управления. */
  type: CONTROL_TYPE;
}
