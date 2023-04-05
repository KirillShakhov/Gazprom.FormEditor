import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IForm, IFormItem, ITabPage } from '../../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import {IFormControl} from "../../../../../interfaces/form-control";
import {TreeViewElement} from "./TreeViewElement";
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type TreeViewGroupProps = TreeItemProps & {
  group: ITabPage;
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
      paddingLeft: theme.spacing(5),
    },
  },
}));

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
            element={element}
            onSelectItem={onSelectItem}
          />
        );
      })}
    </StyledTreeItemRoot>
  );
}
