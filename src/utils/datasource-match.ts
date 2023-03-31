import { IParameter, PARAMETER_TYPE } from '../interfaces/parameter';
import { CONTROL_TYPE } from '../interfaces/form-control';

const parametersMatch = {
  [PARAMETER_TYPE.STRING]: [CONTROL_TYPE.TEXT, CONTROL_TYPE.TEXTAREA],
  [PARAMETER_TYPE.INTEGER]: [CONTROL_TYPE.NUMBER],
  [PARAMETER_TYPE.NUMBER]: [CONTROL_TYPE.NUMBER],
  [PARAMETER_TYPE.BOOLEAN]: [CONTROL_TYPE.CHECKBOX, CONTROL_TYPE.SWITCH],
  [PARAMETER_TYPE.DATE]: [CONTROL_TYPE.DATEPICKER],
  [PARAMETER_TYPE.DATETIME]: [CONTROL_TYPE.DATETIMEPICKER],
  [PARAMETER_TYPE.REF]: [CONTROL_TYPE.LINK, CONTROL_TYPE.COMBOBOX, CONTROL_TYPE.SELECT, CONTROL_TYPE.RADIOGROUP],
  [PARAMETER_TYPE.FILE]: [CONTROL_TYPE.FILE],
};

export const datasourceMatch = (parameterType: PARAMETER_TYPE, controlType: CONTROL_TYPE): boolean => {
  console.log('PARAMETER_TYPE: ' + parameterType);
  console.log('CONTROL_TYPE: ' + controlType);
  return parametersMatch[parameterType].includes(controlType);
};
