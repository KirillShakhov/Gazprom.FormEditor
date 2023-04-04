import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPageController } from '../../../../../interfaces/form-config';
import { TreeViewPage } from './TreeViewPage';
import { IFormControl } from '../../../../../interfaces/form-control';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type TreeViewPageGroupProps = TreeItemProps & {
  group: ITabPageController;
  onSelectItem: (value: IFormControl) => void;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-form-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

export function TreeViewPageGroup(props: TreeViewPageGroupProps) {
  const { group, onSelectItem, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={FeedRoundedIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {group.name}
          </Typography>
        </Box>
      }
      {...other}
    >
      {group.pages?.map((page, index) => {
        return (
          <TreeViewPage key={index} nodeId={`page_${index}_${page.code}`} page={page} onSelectItem={onSelectItem} />
        );
      })}
    </StyledTreeItemRoot>
  );
}
