import { IParameter } from '../interfaces/parameter';
import { IFormControl } from '../interfaces/form-control';

export const checkImplementFormControl = (p: any): p is IFormControl => {
  return p.hasOwnProperty('dataSource') && p.hasOwnProperty('type');
};

export const checkImplementParameter = (p: any): p is IParameter => {
  return p.hasOwnProperty('code') && p.hasOwnProperty('name') && p.hasOwnProperty('type');
};
