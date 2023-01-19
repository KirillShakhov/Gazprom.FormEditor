/**
 * Модуль содержит модели типов описания метаданных свойств элементов формы.
 */

import { ControlTypes } from './form-control';
import { ParameterTypes } from './parameter';

/** Тип значения свойства. */
export enum PROPERTY_VALUE_TYPE {
  /** Строка. */
  STRING = 'string',
  /** Целое число. */
  INTEGER = 'integer',
  /** Булево. */
  BOOLEAN = 'boolean',
  /** Дата. */
  DATE = 'date',
  /** Список выбора. */
  LIST = 'list',
}

/** Конфигурация свойства. */
export interface IPropertyConfig {
  /** Код свойства. */
  code: string;
  /** Наименование свойства. */
  name: string;
  /** Тип свойства. */
  type: PROPERTY_VALUE_TYPE;
  /** Опции (для варианта отображения). */
  options?: string[];
}

/** Тип элемента формы. */
enum ELEMENT_TYPE {
  /** Обобщенный элемент. */
  ELEMENT = 'ELEMENT',
  /** Форма. */
  FORM = 'FORM',
  /** Страницы. */
  PAGES = 'PAGES',
  /** Страница. */
  PAGE = 'PAGE',
  /** Группа. */
  GROUP = 'GROUP',
  /** Поле ввода. */
  CONTROL = 'CONTROL',
}

type ElementTypes = keyof typeof ELEMENT_TYPE;

type KeyType = number | string | symbol;

type ParameterConfigMap<T extends KeyType> = { [key in T]?: IPropertyConfig[] };

/** Метаданные свойств. */
export interface IPropertyMetadata {
  /** Свойства по типу элемента формы. */
  byElementType: ParameterConfigMap<ElementTypes>;
  /** Свойства по типу параметра операции. */
  byParameterType: ParameterConfigMap<ParameterTypes>;
  /** Свойства по типу поля ввода. */
  byControlType: ParameterConfigMap<ControlTypes>;
}

/** Пример объекта. */
export const metadata: IPropertyMetadata = {
  byElementType: {
    // Общие свойства для всех элементов.
    ELEMENT: [{ code: 'title', name: 'Наименование', type: PROPERTY_VALUE_TYPE.STRING }],
    PAGES: [],
    PAGE: [],
    GROUP: [
      {
        code: 'direction',
        name: 'Ориентация',
        type: PROPERTY_VALUE_TYPE.LIST,
        options: ['FORCE_HORIZONTAL', 'HORIZONTAL', 'VERTICAL'],
      },
      { code: 'showTitle', name: 'Отображать заголовок', type: PROPERTY_VALUE_TYPE.BOOLEAN },
    ],
    // Общие свойства для всех полей ввода
    CONTROL: [
      { code: 'readonly', name: 'Только чтение', type: PROPERTY_VALUE_TYPE.BOOLEAN },
      { code: 'hidden', name: 'Скрытый', type: PROPERTY_VALUE_TYPE.BOOLEAN },
      { code: 'info', name: 'Информационное поле', type: PROPERTY_VALUE_TYPE.BOOLEAN },
      { code: 'hint', name: 'Подсказка', type: PROPERTY_VALUE_TYPE.STRING },
    ],
  },
  byParameterType: {
    STRING: [
      { code: 'multiline', name: 'Многострочный', type: PROPERTY_VALUE_TYPE.BOOLEAN },
      { code: 'length', name: 'Длина', type: PROPERTY_VALUE_TYPE.INTEGER },
      { code: 'counter', name: 'Счетчик символов', type: PROPERTY_VALUE_TYPE.BOOLEAN },
    ],
    INTEGER: [
      { code: 'minValue', name: 'Минимальное значение', type: PROPERTY_VALUE_TYPE.INTEGER },
      { code: 'maxValue', name: 'Максимальное значение', type: PROPERTY_VALUE_TYPE.INTEGER },
    ],
    NUMBER: [
      { code: 'minValue', name: 'Минимальное значение', type: PROPERTY_VALUE_TYPE.INTEGER },
      { code: 'maxValue', name: 'Максимальное значение', type: PROPERTY_VALUE_TYPE.INTEGER },
      { code: 'scale', name: 'Точность', type: PROPERTY_VALUE_TYPE.INTEGER },
    ],
    BOOLEAN: [
      { code: 'view', name: 'Вариант отображения', type: PROPERTY_VALUE_TYPE.LIST, options: ['CHECKBOX', 'SWITCH'] },
    ],
    DATE: [
      { code: 'minValue', name: 'Минимальное значение', type: PROPERTY_VALUE_TYPE.DATE },
      { code: 'maxValue', name: 'Максимальное значение', type: PROPERTY_VALUE_TYPE.DATE },
    ],
    DATETIME: [
      { code: 'minValue', name: 'Минимальное значение', type: PROPERTY_VALUE_TYPE.DATE },
      { code: 'maxValue', name: 'Максимальное значение', type: PROPERTY_VALUE_TYPE.DATE },
    ],
    FILE: [{ code: 'multiple', name: 'Выбирать несколько', type: PROPERTY_VALUE_TYPE.BOOLEAN }],
    REF: [
      {
        code: 'view',
        name: 'Вариант отображения',
        type: PROPERTY_VALUE_TYPE.LIST,
        options: ['COMBOBOX', 'RADIOGROUP'],
      },
    ],
  },
  byControlType: {
    CHECKBOX: [],
    SWITCH: [],
    DATEPICKER: [],
    DATETIMEPICKER: [],
    FILE: [],
    TEXT: [{ code: 'mask', name: 'Маска ввода', type: PROPERTY_VALUE_TYPE.STRING }],
    TEXTAREA: [{ code: 'lineCount', name: 'Количество строк', type: PROPERTY_VALUE_TYPE.INTEGER }],
    COMBOBOX: [],
    NUMBER: [],
    LINK: [],
    RADIOGROUP: [],
    SELECT: [],
  },
};
