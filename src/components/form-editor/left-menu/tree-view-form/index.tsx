import React from 'react';
import './style.css';
// import { Container, Draggable, DropResult } from 'react-smooth-dnd';

import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IForm, ITabPageController } from '../../../../interfaces/form-config';
import { TreeViewPageGroup } from './custom/TreeViewPageGroup';
import { IFormControl } from '../../../../interfaces/form-control';

interface TreeViewFormProps {
  form: IForm;
  onSelectItem: (value: IFormControl) => void;
}

export const TreeViewForm: React.FC<TreeViewFormProps> = (props) => {
  const { form, onSelectItem } = props;

  return (
    <div>
      <div className="tab-item">
        <TreeView
          defaultExpanded={['3']}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}

        >
          {form.items?.map((group, index) => {
            return (
              <TreeViewPageGroup
                key={index}
                nodeId={`page_group_${index}__${group.code}`}
                group={group as ITabPageController}
                onSelectItem={onSelectItem}
              />
            );
          })}
        </TreeView>
      </div>
    </div>
  );
};
