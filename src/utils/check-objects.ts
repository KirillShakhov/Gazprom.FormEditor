import { IParameter } from '../interfaces/parameter';
import { IFormControl } from '../interfaces/form-control';
import {IForm, IFormGroup, ITabPageController} from '../interfaces/form-config';

export const checkImplementFormControl = (p: any): p is IFormControl => {
  return p.hasOwnProperty('dataSource') && p.hasOwnProperty('type');
};

export const checkImplementParameter = (p: any): p is IParameter => {
  return p.hasOwnProperty('code') && p.hasOwnProperty('name') && p.hasOwnProperty('type');
};

export const checkImplementParameters = (p: unknown): p is IParameter[] => {
  if (!Array.isArray(p)) {
    return false;
  }
  p.forEach((p) => {
    if (!checkImplementParameter(p)) {
      return false;
    }
  });
  return true;
};

export const checkImplementForm = (p: any): p is IForm => {
  return p.hasOwnProperty('code') && p.hasOwnProperty('name') && p.hasOwnProperty('items');
};

export const checkImplementFormElement = (p: any): p is IForm => {
  return p.hasOwnProperty('code') && p.hasOwnProperty('name');
};
