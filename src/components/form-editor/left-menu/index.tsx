import React from 'react';
import './style.css';
import { Box, Tab, Tabs } from '@mui/material';
import { ParametersTab } from './parameters-tab';
import { TreeViewForm } from './tree-view-form';
import { ComponentsTab } from './components-tab';
import { IParameter } from '../../../interfaces/parameter';
import { IForm } from '../../../interfaces/form-config';
import { IFormControl } from '../../../interfaces/form-control';

interface LeftMenuProps {
  form: IForm;
  properties: IParameter[];
  onSelectItem: (value: IFormControl) => void;
  update: () => void;
}

export const LeftMenu: React.FC<LeftMenuProps> = (props) => {
  const { form, properties, onSelectItem, update } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyle = {
    fontSize: 12,
    minHeight: 30,
    minWidth: 20,
    padding: 10,
    height: 30,
  };

  return (
    <div className="left-menu">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          style={{
            minHeight: 0,
          }}
        >
          <Tab label="Параметры" style={tabStyle} />
          <Tab label="Форма" style={tabStyle} />
          <Tab label="Компоненты" style={tabStyle} />
        </Tabs>
      </Box>

      <div hidden={value !== 0}>
        <ParametersTab properties={properties} />
      </div>
      <div hidden={value !== 1}>
        <TreeViewForm form={form} onSelectItem={onSelectItem} />
      </div>
      <div hidden={value !== 2}>
        <ComponentsTab form={form} update={update} />
      </div>
    </div>
  );
};
