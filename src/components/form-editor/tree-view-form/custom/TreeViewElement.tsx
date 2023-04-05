import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITabPage } from '../../../../interfaces/form-config';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { CONTROL_TYPE, IFormControl } from '../../../../interfaces/form-control';
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
import { StyledTreeItemRoot } from './StyledTreeItem';

type TreeViewElementProps = TreeItemProps & {
  element: ITabPage & IFormControl;
  onSelectItem: (value: IFormControl) => void;
};

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
