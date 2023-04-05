import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { TreeViewGroup } from './TreeViewGroup';
import { IFormControl } from '../../../../interfaces/form-control';
import { Container, Draggable } from 'react-smooth-dnd';
import {StyledTreeItemRoot} from "./StyledTreeItem";


type TreeViewPageProps = TreeItemProps & {
  page: ITabPage;
  onSelectItem: (value: IFormControl) => void;
};

export function TreeViewPage(props: TreeViewPageProps) {
  const { page, onSelectItem, ...other } = props;

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
      <Container groupName={'tree-groups'}>
        {page.items?.map((group, index) => {
          return (
            <Draggable key={index}>
              <TreeViewGroup
                key={index}
                nodeId={`group_${index}_${group.code}`}
                group={group}
                onSelectItem={onSelectItem}
              />
            </Draggable>
          );
        })}
      </Container>
    </StyledTreeItemRoot>
  );
}
