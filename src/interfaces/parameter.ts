/** Тип параметра операции. */
export enum PARAMETER_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATETIME = 'dateTime',
  REF = 'ref',
  FILE = 'file',
}

/** Типы параметров операции. */
export type ParameterTypes = keyof typeof PARAMETER_TYPE;

/** Базовый интерфейс параметра операции. */
interface IBaseParameter {
  /** Код. */
  code: string;
  /** Наименование. */
  name: string;
  /** Тип. */
  type: PARAMETER_TYPE;
  /** Признак обязательности. */
  required?: boolean;
  /** Признак необходимости валидации. */
  validate?: boolean;
}

/** Параметр типа файл. */
interface IFileParameter extends IBaseParameter {
  /** Признак множественного выбора. */
  multiselect?: boolean;
}

/** Параметр операции. */
export type IParameter = IBaseParameter | IFileParameter;
