import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { TreeViewGroup } from './TreeViewGroup';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { StyledTreeItemRoot } from './StyledTreeItem';
import { isFormGroup } from '../../../../utils/form-config';

type TreeViewPageProps = TreeItemProps & {
  page: ITabPage;
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
};

export function TreeViewPage(props: TreeViewPageProps) {
  const { page, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    if (page.items == undefined) page.items = [];
    const group = { ...payload };
    if (isFormGroup(group)) {
      if (removedIndex != null) {
        page.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        page.items?.splice(addedIndex, 0, group);
      }
    }
    update();
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={FeedRoundedIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {page.name}
          </Typography>
        </Box>
      }
      {...other}
    >
      {page.items && (
        <Container
          groupName={'tree-groups'}
          onDrop={onDrop}
          getChildPayload={(i) => (page.items ? page.items[i] : [])}
          dropPlaceholder={{
            className: 'treeShadowPlaceholder',
            animationDuration: 250,
            showOnTop: true,
          }}
        >
          {page.items.map((group, index) => {
            return (
              <Draggable key={index}>
                <TreeViewGroup
                  key={index}
                  nodeId={`group_${group.code}`}
                  group={group}
                  onSelectItem={onSelectItem}
                  update={update}
                />
              </Draggable>
            );
          })}
        </Container>
      )}
    </StyledTreeItemRoot>
  );
}
