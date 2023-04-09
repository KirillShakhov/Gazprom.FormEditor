import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import { IFormControl } from '../../../../interfaces/form-control';
import { TreeViewElement } from './TreeViewElement';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { StyledTreeItemRoot } from './StyledTreeItem';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { checkImplementFormControl } from '../../../../utils/check-objects';

type TreeViewGroupProps = TreeItemProps & {
  group: ITabPage;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
};

export function TreeViewGroup(props: TreeViewGroupProps) {
  const { group, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    if (group.items == undefined) group.items = [];
    const element = { ...payload };
    if (checkImplementFormControl(element)) {
      if (removedIndex != null) {
        group.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        group.items?.splice(addedIndex, 0, element);
      }
    }
    update();
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
      >
        {group.items?.map((element, index) => {
          return (
            <Draggable key={index}>
              <TreeViewElement
                key={index}
                nodeId={`element_${element.code}`}
                element={element as ITabPage & IFormControl}
                onSelectItem={onSelectItem}
                update={update}
              />
            </Draggable>
          );
        })}
      </Container>
    </StyledTreeItemRoot>
  );
}
