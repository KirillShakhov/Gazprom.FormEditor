import React from 'react';
import { IFormItem } from '../../../../interfaces/form-config';
import { TreeViewElement } from './TreeViewElement';
import { IFormElement } from '../../../../interfaces/form-element';
import { isFormControl, isFormGroup, isTabPageController } from '../../../../utils/form-config';
import { TreeViewGroup } from './TreeViewGroup';
import { TreeViewPageGroup } from './TreeViewPageGroup';

type TreeViewGroupProps = {
  formItem: IFormItem;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
};

export function TreeViewFormItem(props: TreeViewGroupProps) {
  const { formItem, onSelectItem, update } = props;

  return (
    <div>
      {isTabPageController(formItem) && (
        <TreeViewPageGroup
          nodeId={`page_group_${formItem.code}`}
          group={formItem}
          onSelectItem={onSelectItem}
          update={update}
        />
      )}
      {isFormGroup(formItem) && (
        <TreeViewGroup nodeId={`group_${formItem.code}`} group={formItem} onSelectItem={onSelectItem} update={update} />
      )}
      {isFormControl(formItem) && (
        <TreeViewElement
          nodeId={`element_${formItem.code}`}
          element={formItem}
          onSelectItem={onSelectItem}
          update={update}
        />
      )}
    </div>
  );
}
