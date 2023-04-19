import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IForm } from '../../../interfaces/form-config';
import './style.css';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormElement } from '../../../interfaces/form-element';
import { TreeViewFormItem } from './custom/TreeViewFormItem';
import { isFormItem } from '../../../utils/form-config';

interface TreeViewFormProps {
  form: IForm;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
}

export const TreeViewForm: React.FC<TreeViewFormProps> = (props) => {
  const { form, onSelectItem, update } = props;
  // const [expanded, setExpanded] = React.useState<string[]>([]);
  // const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //   setExpanded(nodeIds);
  // };

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    if (form.items == undefined) form.items = [];
    const item = payload;
    if (isFormItem(item)) {
      if (removedIndex != null) {
        form.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        form.items?.splice(addedIndex, 0, item);
      }
    }
    update();
  };

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    return isFormItem(payload);
  };

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
        <Container
          groupName={'tree-pages-groups'}
          onDrop={onDrop}
          getChildPayload={(i) => (form.items ? form.items[i] : [])}
          dropPlaceholder={{
            className: 'treeShadowPlaceholder',
            animationDuration: 250,
            showOnTop: true,
          }}
          style={{ height: '100%' }}
          shouldAcceptDrop={shouldAcceptDrop}
          getGhostParent={() => document.body}
        >
          {form.items?.map((formItem) => {
            return (
              <Draggable key={formItem.code}>
                <TreeViewFormItem key={formItem.code} formItem={formItem} onSelectItem={onSelectItem} update={update} />
              </Draggable>
            );
          })}
        </Container>
      </TreeView>
    </div>
  );
};
