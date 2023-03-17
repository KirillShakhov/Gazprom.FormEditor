import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@mui/lab';
import { Page } from '../page';

interface PageGroupProps {
  children?: React.ReactNode;
  // pages: React.ReactNode[];
  // index: number;
  // value: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const PageGroup: React.FC<PageGroupProps> = (props) => {
  // const { children, value, index, ...other } = props;
  const { children, ...other } = props;
  const [value, setValue] = React.useState(0);

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
          height: '98%',
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
    minWidth: 20,
    minHeight: 30,
    height: 30,
    padding: 10,
    fontSize: 14,
  };

  return (
    // <div
    //   role="tabpanel"
    //   hidden={value !== index}
    //   id={`simple-tabpanel-${index}`}
    //   aria-labelledby={`simple-tab-${index}`}
    //   style={{
    //     height: '100%',
    //   }}
    //   {...other}
    // >
    //   {children}
    // </div>

    <div>
      <span style={{ fontSize: 18, margin: 0 }}>Заголовок операции</span>
      <div style={{ marginTop: 20, height: '90%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            style={{
              minHeight: 0,
            }}
          >
            <Tab label="Шаг 1" {...a11yProps(0)} style={tabStyle} />
            <Tab label="Шаг 2" {...a11yProps(1)} style={tabStyle} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Page title={'Заголовок 1'}></Page>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Page title={'Заголовок 2'}></Page>
        </TabPanel>
      </div>
    </div>
  );
};
