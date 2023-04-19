import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { StyledTreeItemRoot } from './StyledTreeItem';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { IFormElement } from '../../../../interfaces/form-element';
import { TreeViewFormItem } from './TreeViewFormItem';
import { isFormItem } from '../../../../utils/form-config';

type TreeViewGroupProps = TreeItemProps & {
  group: ITabPage;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
};

export function TreeViewGroup(props: TreeViewGroupProps) {
  const { group, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    if (group.items == undefined) group.items = [];
    const element = { ...payload };
    if (isFormItem(element)) {
      if (removedIndex != null) {
        group.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        group.items?.splice(addedIndex, 0, element);
      }
    }
    update();
  };

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    if (group == payload) return false;
    return isFormItem(payload);
  };

  const onClick = () => {
    onSelectItem(group);
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={AppsRoundedIcon} color="inherit" sx={{ mr: 0 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {group.name}
          </Typography>
        </Box>
      }
      onClick={onClick}
      {...other}
    >
      <Container
        groupName={'tree-elements'}
        onDrop={onDrop}
        getChildPayload={(i) => (group.items ? group.items[i] : [])}
        dropPlaceholder={{
          className: 'treeShadowPlaceholder',
          animationDuration: 250,
          showOnTop: true,
        }}
        shouldAcceptDrop={shouldAcceptDrop}
        getGhostParent={() => document.body}
      >
        {group.items?.map((item, index) => {
          return (
            <Draggable key={index}>
              <TreeViewFormItem key={index} formItem={item} onSelectItem={onSelectItem} update={update} />
            </Draggable>
          );
        })}
      </Container>
    </StyledTreeItemRoot>
  );
}
