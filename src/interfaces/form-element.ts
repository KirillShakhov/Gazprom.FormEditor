/** Тип значения свойства. */
type PropertyValue = string | number | boolean | null;

/** Свойства элемента формы. */
type Properties = Record<string, PropertyValue>;

/** Базовый интерфейс элемента формы. */
export interface IFormElement {
  /** Код. */
  code: string;
  /** Наименование. */
  name: string;
  /** Свойства. */
  properties?: Properties;
}
