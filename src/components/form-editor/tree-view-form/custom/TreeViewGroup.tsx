import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import { IFormControl } from '../../../../interfaces/form-control';
import { TreeViewElement } from './TreeViewElement';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import {StyledTreeItemRoot} from "./StyledTreeItem";


type TreeViewGroupProps = TreeItemProps & {
  group: ITabPage;
  onSelectItem: (value: IFormControl) => void;
};

export function TreeViewGroup(props: TreeViewGroupProps) {
  const { group, onSelectItem, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={AppsRoundedIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {group.name}
          </Typography>
        </Box>
      }
      {...other}
    >
      {group.items?.map((element, index) => {
        return (
          <TreeViewElement
            key={index}
            nodeId={`element_${index}_${element.code}`}
            element={element as ITabPage & IFormControl}
            onSelectItem={onSelectItem}
          />
        );
      })}
    </StyledTreeItemRoot>
  );
}
