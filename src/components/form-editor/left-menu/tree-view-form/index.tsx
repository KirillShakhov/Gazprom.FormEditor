import React from 'react';
import './style.css';
// import { Container, Draggable, DropResult } from 'react-smooth-dnd';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { IForm } from '../../../../interfaces/form-config';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  labelIcon: React.ElementType<SvgIconProps>;
  labelText: string;
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

function StyledTreeItem(props: StyledTreeItemProps) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

interface TreeViewFormProps {
  form: IForm;
}

export const TreeViewForm: React.FC<TreeViewFormProps> = (props) => {
  const { form } = props;

  return (
    <div className="tab-item">
      <TreeView
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}
      >
        {form.items?.forEach((i) => {
          return <StyledTreeItem nodeId="1" labelText={i.name} labelIcon={Label}></StyledTreeItem>;
        })}
        {/*<StyledTreeItem nodeId="1" labelText="Группа страниц" labelIcon={Label}>
          <StyledTreeItem nodeId="2" labelText="Страница 1" labelIcon={Label}>
            <StyledTreeItem nodeId="3" labelText="Группа 1" labelIcon={Label}>
              <StyledTreeItem nodeId="4" labelText="RadioGroup" labelIcon={SupervisorAccountIcon} />
              <StyledTreeItem nodeId="5" labelText="TextInput / Название поля" labelIcon={InfoIcon} />
              <StyledTreeItem nodeId="6" labelText="CheckBox / Название параметров" labelIcon={ForumIcon} />
              <StyledTreeItem nodeId="7" labelText="Promotions" labelIcon={LocalOfferIcon} />
            </StyledTreeItem>
            <StyledTreeItem nodeId="3-3" labelText="Группа 2" labelIcon={Label}>
              <StyledTreeItem nodeId="4-3" labelText="RadioGroup" labelIcon={SupervisorAccountIcon} />
              <StyledTreeItem nodeId="5-3" labelText="TextInput / Название поля" labelIcon={InfoIcon} />
              <StyledTreeItem nodeId="6-3" labelText="CheckBox / Название параметров" labelIcon={ForumIcon} />
              <StyledTreeItem nodeId="7-3" labelText="Promotions" labelIcon={LocalOfferIcon} />
            </StyledTreeItem>
          </StyledTreeItem>
          <StyledTreeItem nodeId="2-2" labelText="Страница 2" labelIcon={Label}>
            <StyledTreeItem nodeId="2-3" labelText="Группа 1" labelIcon={Label}>
              <StyledTreeItem nodeId="2-4" labelText="RadioGroup" labelIcon={SupervisorAccountIcon} />
              <StyledTreeItem nodeId="2-5" labelText="TextInput / Название поля" labelIcon={InfoIcon} />
              <StyledTreeItem nodeId="2-6" labelText="CheckBox / Название параметров" labelIcon={ForumIcon} />
              <StyledTreeItem nodeId="2-7" labelText="Promotions" labelIcon={LocalOfferIcon} />
            </StyledTreeItem>
          </StyledTreeItem>
        </StyledTreeItem>*/}
      </TreeView>
    </div>
  );
};
