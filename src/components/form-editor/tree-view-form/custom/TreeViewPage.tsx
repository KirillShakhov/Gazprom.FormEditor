import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { StyledTreeItemRoot } from './StyledTreeItem';
import { isFormItem } from '../../../../utils/form-config';
import { IFormElement } from '../../../../interfaces/form-element';
import { TreeViewFormItem } from './TreeViewFormItem';

type TreeViewPageProps = TreeItemProps & {
  page: ITabPage;
  onSelectItem: (value: IFormElement | undefined) => void;
  update: () => void;
};

export function TreeViewPage(props: TreeViewPageProps) {
  const { page, onSelectItem, update, ...other } = props;

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (payload == null) return;
    onSelectItem(undefined);
    if (page.items == undefined) page.items = [];
    const group = payload;
    if (isFormItem(group)) {
      if (removedIndex != null) {
        page.items?.splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        page.items?.splice(addedIndex, 0, group);
      }
    }
    update();
  };

  const shouldAcceptDrop = (sourceContainerOptions: any, payload: any) => {
    if (page == payload) return false;
    return isFormItem(payload);
  };

  const onClick = () => {
    onSelectItem(page);
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
      onClick={onClick}
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
          shouldAcceptDrop={shouldAcceptDrop}
          getGhostParent={() => document.body}
        >
          {page.items.map((formItem, index) => {
            return (
              <Draggable key={formItem.code + formItem.name + index}>
                <TreeViewFormItem
                  key={formItem.code + formItem.name + index}
                  formItem={formItem}
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
