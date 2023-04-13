import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IForm, ITabPageController } from '../../../interfaces/form-config';
import { TreeViewPageGroup } from './custom/TreeViewPageGroup';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IFormElement } from '../../../interfaces/form-element';

interface TreeViewFormProps {
  form: IForm;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
}

export const TreeViewForm: React.FC<TreeViewFormProps> = (props) => {
  const { form, onSelectItem, update } = props;
  // const [expanded, setExpanded] = React.useState<string[]>([]);
  // const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //   setExpanded(nodeIds);
  // };

  return (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      <TreeView
        // expanded={expanded}
        // onNodeToggle={handleToggle}
        defaultCollapseIcon={<ArrowDropDownIcon style={{ marginLeft: 15 }} />}
        defaultExpandIcon={<ArrowRightIcon style={{ marginLeft: 15 }} />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}
      >
        <Container groupName={'tree-pages-groups'}>
          {form.items?.map((group, index) => {
            return (
              <Draggable key={index}>
                <TreeViewPageGroup
                  key={index}
                  nodeId={`page_group_${index}__${group.code}`}
                  group={group as ITabPageController}
                  onSelectItem={onSelectItem}
                  update={update}
                />
              </Draggable>
            );
          })}
        </Container>
      </TreeView>
    </div>
  );
};
