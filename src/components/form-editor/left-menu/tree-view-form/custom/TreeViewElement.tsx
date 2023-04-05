import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { CONTROL_TYPE, IFormControl } from '../../../../../interfaces/form-control';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type TreeViewElementProps = TreeItemProps & {
  element: ITabPage & IFormControl;
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
      paddingLeft: theme.spacing(6),
    },
  },
}));

export function TreeViewElement(props: TreeViewElementProps) {
  const { element, onSelectItem, ...other } = props;

  const onClick = () => {
    onSelectItem(element);
  };

  const icon = useCallback(() => {
    switch (element.type) {
      case CONTROL_TYPE.CHECKBOX:
        return <CheckBoxRoundedIcon />;
      case CONTROL_TYPE.SWITCH:
        return <ToggleOnRoundedIcon />;
      case CONTROL_TYPE.DATEPICKER:
        return <DateRangeRoundedIcon />;
      case CONTROL_TYPE.DATETIMEPICKER:
        return <EventNoteRoundedIcon />;
      case CONTROL_TYPE.NUMBER:
        return <NumbersRoundedIcon />;
      case CONTROL_TYPE.LINK:
        return <InsertLinkRoundedIcon />;
      case CONTROL_TYPE.FILE:
        return <FeedRoundedIcon />;
      case CONTROL_TYPE.TEXT:
        return <TextFieldsRoundedIcon />;
      case CONTROL_TYPE.TEXTAREA:
        return <TextFieldsRoundedIcon />;
      case CONTROL_TYPE.RADIOGROUP:
        return <RadioButtonCheckedRoundedIcon />;
      case CONTROL_TYPE.COMBOBOX:
        return <ViewStreamRoundedIcon />;
      case CONTROL_TYPE.SELECT:
        return <ReorderRoundedIcon />;
    }
  }, [element]);

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={icon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {element.name}
          </Typography>
        </Box>
      }
      onClick={onClick}
      {...other}
    />
  );
}
