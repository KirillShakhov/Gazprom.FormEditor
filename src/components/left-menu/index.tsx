import React, { useState } from 'react';
import './style.css';
import { Box, Tab, Tabs } from '@mui/material';
import { ParametersTab } from './parameters-tab';
import { FormTab } from './form-tab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabStyle = {
  minWidth: 20,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: 'white',
};

export const LeftMenu: React.FC = () => {
  const [value, setValue] = React.useState(1);
  const [lists, setLists] = useState(['banana', 'hogehoge', 'tomato']);

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

  return (
    <div className="left-menu">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Параметры" {...a11yProps(0)} style={tabStyle} />
          <Tab label="Форма" {...a11yProps(1)} style={tabStyle} />
          <Tab label="Компоненты" {...a11yProps(2)} style={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ParametersTab lists={lists} setLists={setLists}></ParametersTab>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormTab></FormTab>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="red">Item Three</div>
      </TabPanel>
    </div>
  );
};
