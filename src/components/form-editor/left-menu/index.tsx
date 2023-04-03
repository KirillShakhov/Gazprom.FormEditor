import React from 'react';
import './style.css';
import { Box, Tab, Tabs } from '@mui/material';
import { ParametersTab } from './parameters-tab';
import { TreeViewForm } from './tree-view-form';
import { ComponentsTab } from './components-tab';
import { IParameter } from '../../../interfaces/parameter';
import { IForm } from '../../../interfaces/form-config';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface LeftMenuProps {
  form: IForm;
  properties: IParameter[];
  update: () => void;
}

export const LeftMenu: React.FC<LeftMenuProps> = (props) => {
  const { form, properties, update } = props;
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          height: '100%',
        }}
        {...other}
      >
        {children}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
          <Tab label="Параметры" {...a11yProps(0)} style={tabStyle} />
          <Tab label="Форма" {...a11yProps(1)} style={tabStyle} />
          <Tab label="Компоненты" {...a11yProps(2)} style={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ParametersTab properties={properties} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TreeViewForm form={form} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ComponentsTab form={form} update={update} />
      </TabPanel>
    </div>
  );
};
