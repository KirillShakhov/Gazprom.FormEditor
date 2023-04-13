import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPageController } from '../../../../interfaces/form-config';
import { TreeViewPage } from './TreeViewPage';
import PagesRoundedIcon from '@mui/icons-material/PagesRounded';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { StyledTreeItemRoot } from './StyledTreeItem';
import { IFormElement } from '../../../../interfaces/form-element';

type TreeViewPageGroupProps = TreeItemProps & {
  group: ITabPageController;
  onSelectItem: (value: IFormElement) => void;
  update: () => void;
};

export function TreeViewPageGroup(props: TreeViewPageGroupProps) {
  const { group, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    if (group.pages == undefined) group.pages = [];
    const page = { ...payload };
    if (removedIndex != null) {
      group.pages?.splice(removedIndex, 1);
    }
    if (addedIndex != null) {
      group.pages?.splice(addedIndex, 0, page);
    }
    update();
  };

  const onClick = () => {
    onSelectItem(group);
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={PagesRoundedIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {group.name}
          </Typography>
        </Box>
      }
      onClick={onClick}
      {...other}
    >
      <Container groupName={'tree-pages'} getChildPayload={(i) => (group.pages ? group.pages[i] : [])} onDrop={onDrop}>
        {group.pages?.map((page, index) => {
          return (
            <Draggable key={index}>
              <TreeViewPage
                key={index}
                nodeId={`page_${page.code}_${page.name}`}
                page={page}
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
