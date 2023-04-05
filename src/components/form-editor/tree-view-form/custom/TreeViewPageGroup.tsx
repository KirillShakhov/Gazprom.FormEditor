import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPageController } from '../../../../interfaces/form-config';
import { TreeViewPage } from './TreeViewPage';
import { IFormControl } from '../../../../interfaces/form-control';
import PagesRoundedIcon from '@mui/icons-material/PagesRounded';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { StyledTreeItemRoot } from './StyledTreeItem';

type TreeViewPageGroupProps = TreeItemProps & {
  group: ITabPageController;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
};

export function TreeViewPageGroup(props: TreeViewPageGroupProps) {
  const { group, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, element, payload } = dropResult;
    if (removedIndex == null && addedIndex == null) return;
    if (dropResult.payload == null) {
      if (group.pages === undefined) return;
      if (removedIndex != null) {
        const page = { ...group.pages[removedIndex] };
        group.pages?.splice(removedIndex, 1);
        if (addedIndex != null) {
          group.pages?.splice(addedIndex, 0, page);
        }
      }
    }
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
      {...other}
    >
      <Container groupName={'tree-pages'} onDrop={onDrop}>
        {group.pages?.map((page, index) => {
          return (
            <Draggable key={index}>
              <TreeViewPage
                key={index}
                nodeId={`page_${index}_${page.code}`}
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