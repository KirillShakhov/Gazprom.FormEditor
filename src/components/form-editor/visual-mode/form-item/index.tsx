import React from 'react';
import { IForm, IFormGroup, IFormItem, ITabPageController } from '../../../../interfaces/form-config';
import { Element } from '../element';
import { IFormControl } from '../../../../interfaces/form-control';
import { IFormElement } from '../../../../interfaces/form-element';
import { isFormControl, isFormGroup, isTabPageController } from '../../../../utils/form-config';
import { PageGroup } from '../page-group';
import { Group } from '../group';

interface GroupProps {
  zoom: number;
  readOnly: boolean;
  form: IForm;
  formItem: IFormItem;
  selectedItem: IFormElement | undefined;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const FormItem: React.FC<GroupProps> = (props) => {
  const { zoom, readOnly, form, formItem, selectedItem, onSelectItem, update } = props;

  return (
    <div>
      {isTabPageController(formItem) && (
        <PageGroup
          zoom={zoom}
          readOnly={readOnly}
          form={form}
          value={formItem as ITabPageController}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          update={update}
        />
      )}
      {isFormGroup(formItem) && (
        <Group
          zoom={zoom}
          readOnly={readOnly}
          form={form}
          formGroup={formItem as IFormGroup}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          update={update}
        />
      )}
      {isFormControl(formItem) && (
        <Element
          zoom={zoom}
          readOnly={readOnly}
          value={formItem as IFormControl}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
        />
      )}
    </div>
  );
};
